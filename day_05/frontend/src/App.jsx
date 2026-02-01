import { useState } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "note title 1",
      description: "note description 1",
    },
    {
      title: "note title 1",
      description: "note description 1",
    },
    {
      title: "note title 1",
      description: "note description 1",
    },
    {
      title: "note title 1",
      description: "note description 1",
    },
  ]);

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setNotes(res.data.notes);
  });

  return (
    <div className="app">
      <div className="notes">
        {notes.map((note) => (
          <div className="note">
            <h1 className="title">{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
