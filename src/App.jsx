import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [saved_notes, setSavedNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const { data: notes } = await supabase.from("notes").select();

      if (notes) {
        setSavedNotes(notes);
      }
    }

    getNotes();
  }, []);
  return (
    <>
      <div>
        <h1>Welcome to Notesphere</h1>
        <h2>Created By Matrix mind</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
          <br />
          <label>Content:</label>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the content"
            cols={50}
            rows={20}
          ></textarea>
        </form>
      </div>

      <div>
        <ul>
          {saved_notes.map((note) => (
            <ul>
              <li key={note.id}>{note.title}</li>
              <li key={note.id}>{note.content}</li>
            </ul>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
