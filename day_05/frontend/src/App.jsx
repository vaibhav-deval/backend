import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () =>    
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes ? res.data.notes : null);
    });

  return (
    <div className="app">
      <div className="notes">
        {notes.map((note,idx) => (
          <div className="note" key={idx }>
            <h1 className="title">{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
