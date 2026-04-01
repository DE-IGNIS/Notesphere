import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import useNotes from "../hooks/useNotes.js";

function Dashboard() {
  const { notes, fetchNotes, addNotes } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !content) return;

    await addNotes(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className={`app-shell`}>
      <header className="app-header">
        <h1 className="app-title">Notesphere</h1>
        <span className="app-byline">by Matrix Mind</span>
      </header>

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

      <section className="notes-pane">
        <span className="pane-label">Saved Notes</span>
        <NoteCard savedNotes={notes} />
      </section>
    </div>
  );
}

export default Dashboard;
