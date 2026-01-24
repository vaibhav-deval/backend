const express = require("express");
const app = express();
app.use(express.json());
let NOTES = [];

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/notes", (req, res) => {
  if (NOTES == "") res.send("Nothing to show");
  else {
    res.send(NOTES);
    console.log("All Notes");
  }
});

app.get("/notes/:index", (req, res) => {
  if (!NOTES[req.params.index]) res.send("Nothing at this index");
  else {
    res.send(NOTES[req.params.index]);

    console.log(`note at index ${req.params.index}`);
  }
});

app.post("/notes", (req, res) => {
  NOTES.push(req.body);
  res.send(req.body);
});

app.delete("/notes/:index", (req, res) => {
  if (!NOTES[req.params.index]) res.send("Note not found at this index");
  else {
    delete NOTES[req.params.index];
    res.send(`note deleted at index ${req.params.index}`);
  }
});

app.patch("/notes/:index", (req, res) => {
  if (!NOTES[req.params.index]) res.send("Note not found at this index");
  else {
    NOTES[req.params.index].description = req.body.description;
    console.log(NOTES[req.params.index]);
    res.send("note updated");
  }
});

module.exports = app;
