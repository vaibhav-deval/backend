const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");
async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const songBuffer = req.file.buffer;
    const { mood, title: bodyTitle } = req.body;
    const tags = id3.read(songBuffer);

    const title = tags.title || bodyTitle || "Untitled Song"; // fallback

    const [songFile, posterFile] = await Promise.all([
      storageService.uploadFile({
        buffer: songBuffer,
        filename: title + ".mp3",
        folder: "/cohort2/moodify/songs",
      }),
      tags.image
        ? storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: title + ".jpeg",
            folder: "/cohort2/moodify/posters",
          })
        : Promise.resolve({ url: "default-poster.jpeg" }),
    ]);

    const song = await songModel.create({
      title,
      url: songFile.url,
      posterUrl: posterFile.url,
      mood,
    });

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading song", error });
  }
}

async function getSong(req, res) {
  const { mood } = req.query;
  const song = await songModel.findOne({
    mood,
  });

  res.status(200).json({
    message: "song fetched successfully",
    song,
  });
}

module.exports = { uploadSong, getSong };
