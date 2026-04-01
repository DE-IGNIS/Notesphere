import "./styling/NoteCard.css";

function NoteCard({ savedNotes }) {
  return (
    <ul className="note-list">
      {savedNotes.map((note) => (
        <li key={note.id} className="note-card">
          <strong className="note-title">{note.title}</strong>
          <p className="note-content">{note.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default NoteCard;
