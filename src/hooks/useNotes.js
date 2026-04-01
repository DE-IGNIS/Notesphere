import { useState } from "react";
import { supabase } from "../services/supabase.js";

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchNotes() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.from("notes").select();

    if (error) {
      setError(error.message);
      setNotes([]);
    } else {
      setNotes(data);
    }
    setLoading(false);
  }

  async function fetchNoteById(id) {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("id", id)
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }
    return data;
  }

  async function addNote(title, content) {
    if (!title || !content) return;

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content }])
      .select();

    if (error) {
      setError(error.message);
      return;
    }

    setNotes((prev) => [...prev, ...data]);
  }
  return {
    notes,
    loading,
    error,
    fetchNotes,
    fetchNoteById,
    addNote,
  };
}

export default useNotes;
