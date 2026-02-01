const express = require("express");
const app = express();
const notesModel = require("./model/notes.model");
app.use(express.json());

// Create Notes API
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Notes Created Successfully",
    note,
  });
});

//fetch notes api
app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "Notes Fetched Successfully",
    notes,
  });
});

//delete a note by ID
app.delete("/api/note/:id", async (req, res) => {
  const id = req.params.id;
  await notesModel.findByIdAndDelete(id);
  res.status(204).json({
    message: "Note Deleted Successfully",
  });
});

//update a note's description by ID
app.patch("/api/note/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await notesModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

module.exports = app;
