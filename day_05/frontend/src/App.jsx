import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () =>
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes ? res.data.notes : null);
    });

  const addNote = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => fetchNotes());
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3000/api/note/${id}`)
      .then(() => fetchNotes());
  };
  return (
    <div className="app" onSubmit={addNote}>
      <form className="note-form">
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => (
          <div className="note" key={idx}>
            <p>S. No. {idx + 1}</p>
            <h1 className="title">{note.title}</h1>
            <p>{note.description}</p>
            <button
              onClick={() => {
                deleteNote(note._id);
              }}
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
