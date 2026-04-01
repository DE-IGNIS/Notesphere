import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import NoteCard from "./components/NoteCard";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const { data, error } = await supabase.from("notes").select();
      if (!error && data) setSavedNotes(data);
    }
    getNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !content) return;
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content }])
      .select();
    if (!error && data) {
      setSavedNotes((prev) => [...prev, ...data]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Notesphere</h1>
        <span className="app-byline">by Matrix Mind</span>
        <button className="submit-btn">Light Mode</button>
      </header>

      {/* Editor pane — future: swap form for <NoteEditor /> */}
      <section className="editor-pane">
        <span className="pane-label">New Note</span>
        <form className="note-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="note-title">
              Title
            </label>
            <input
              id="note-title"
              className="input-field"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a name…"
            />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="note-content">
              Content
            </label>
            <textarea
              id="note-content"
              className="textarea-field"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing…"
            />
          </div>
          <button className="submit-btn" type="submit">
            Save note
          </button>
        </form>
      </section>

      {/* Notes pane — future: swap for <NoteList /> or <KanbanBoard /> */}
      <section className="notes-pane">
        <span className="pane-label">Saved Notes</span>
        <NoteCard savedNotes={savedNotes} />
      </section>
    </div>
  );
}

export default App;
