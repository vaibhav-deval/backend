const express = require("express");
const app = express();
app.use(express.json());
let NOTES = [];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/notes", (req, res) => {
  NOTES.push(req.body);
  res.send(req.body);
});

app.get("/notes/:index", (req, res) => {
  res.send(NOTES[req.params.index]);
});

app.delete("/notes/:index", (req, res) => {
  delete NOTES[req.params.index];
  res.send(`note deleted at index ${req.params.index}`);
});

app.patch("/notes/:index", (req, res) => {
  NOTES[req.params.index].description = req.body.description;
  console.log(NOTES[req.params.index]);
  res.send("note updated");
});

module.exports = app;
