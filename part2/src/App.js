import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

// const Note = (props) => {
//   // console.log(props.key);  //unable to visit
//   const { note } = props;
//   return <li>{note.content}</li>;
// };

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });
    console.log("importance of " + id + " needs to be toggled");
    console.log(`importance of ${id} needs to be toggled`);
  };
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);

  console.log("render", notes.length, "notes");
  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target); //即form
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      setNotes(notes.concat(noteObject));
      setNewNote("");
      console.log(response);
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  //必须为Note组件定义key属性而不是li
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          ></Note>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
