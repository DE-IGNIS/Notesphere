import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useNotes from "../hooks/useNotes.js";

function NotePage() {
  const { id } = useParams();
  const { fetchNotesById, loading, error } = useNotes();

  const [note, setNote] = useState(null);

  useEffect(() => {
    async function loadNote() {
      const data = await fetchNotesById(id);
      setNote(data);
    }
    loadNote();
  }, [id, fetchNotesById]);

  if (loading) {
    return <p>Loading note...</p>;
  }

  if (error || !note) {
    return (
      <div>
        <p>{error || "Note not found"}</p>
        <Link to="/">← Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}

export default NotePage;
