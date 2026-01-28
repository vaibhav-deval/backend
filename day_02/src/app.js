const express = require("express");

const app = express();

app.use(express.json());

let notes = [];

//POST/ NOTES

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "Note Created Successfully",
  });
});

// GET/NOTES
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes:notes
  })
});


app.delete("/notes/:index",(req,res)=>{
    let id=req.params.index;
    delete notes[id];
    res.status(204).json({
        message:"Note Deleted Successfully"
    })
})

app.patch("/notes/:index",(req,res)=>{
    let id=req.params.index;
    notes[id].description=req.body.description;
    res.status(200).json({
        message:"Note Updated Successfully"
    })

})

module.exports = app;
