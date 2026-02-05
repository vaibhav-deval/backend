import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editNotes, setEditNotes] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () =>
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes || []);
    });

  const addOrUpdateNote = (e) => {
    e.preventDefault();
    if (editNotes) {
      axios
        .patch(`http://localhost:3000/api/note/${editNotes._id}`, {
          description,
        })
        .then(() => {
          fetchNotes();
          setEditNotes(null);
          setTitle("");
          setDescription("");
        });
    } else {
      axios
        .post("http://localhost:3000/api/notes", { title, description })
        .then(() => {
          fetchNotes();
          setTitle("");
          setDescription("");
        });
    }
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3000/api/note/${id}`)
      .then(() => fetchNotes());
  };

  const startEditing = (note) => {
    setEditNotes(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  return (
    <div className="app">
      <form className="note-form" onSubmit={addOrUpdateNote}>
        <input
          required
          name="title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          name="description"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editNotes ? "Update Note" : "Add Note"}</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => (
          <div className="note" key={note._id}>
            <button className="edit-note" onClick={() => startEditing(note)}>
              Edit Desc
            </button>
            <p className="s-no">S. No. {idx + 1}</p>
            <h1 className="title">{note.title}</h1>
            <p>{note.description}</p>
            <button
              onClick={() => deleteNote(note._id)}
              className="delete-note"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
