"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../../lib/supabaseClient";
import type { Note } from "../../types/note";
import { Sidebar } from "../../components/Sidebar";
import { NoteEditor } from "../../components/NoteEditor";
import { MarkdownPreview } from "../../components/MarkdownPreview";

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Fetch current session and notes on mount
  useEffect(() => {
    const fetchNotesForUser = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notes", error);
      } else if (data) {
        setNotes(data as Note[]);
        if (data.length > 0) {
          setSelectedNoteId(data[0].id);
        }
      }

      setAuthChecked(true);
      setLoading(false);
    };

    void fetchNotesForUser();
  }, [router]);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? null,
    [notes, selectedNoteId]
  );

  const handleCreateNote = async () => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const { data, error } = await supabaseClient
      .from("notes")
      .insert({
        title: "Untitled",
        content: "",
        user_id: session.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating note", error);
      return;
    }

    setNotes((prev) => [data as Note, ...prev]);
    setSelectedNoteId((data as Note).id);
  };

  const handleUpdateNote = async (changes: { title?: string; content?: string }) => {
    if (!selectedNote) return;

    const updatedNote: Note = {
      ...selectedNote,
      ...changes,
    };

    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );

    setSaving(true);
    const { error } = await supabaseClient
      .from("notes")
      .update({
        title: updatedNote.title,
        content: updatedNote.content,
      })
      .eq("id", updatedNote.id);

    if (error) {
      console.error("Error updating note", error);
    }
    setSaving(false);
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    const noteIdToDelete = selectedNote.id;
    setNotes((prev) => prev.filter((note) => note.id !== noteIdToDelete));

    const { error } = await supabaseClient
      .from("notes")
      .delete()
      .eq("id", noteIdToDelete);

    if (error) {
      console.error("Error deleting note", error);
    }

    if (notes.length > 1) {
      const remaining = notes.filter((note) => note.id !== noteIdToDelete);
      setSelectedNoteId(remaining[0]?.id ?? null);
    } else {
      setSelectedNoteId(null);
    }
  };

  if (!authChecked && loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-96px)] gap-4 rounded-2xl bg-gray-100 p-3">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onCreateNote={handleCreateNote}
      />

      <div className="flex min-w-0 flex-1 gap-3">
        <NoteEditor
          note={selectedNote}
          isSaving={saving}
          onChange={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
        <div className="hidden min-w-[260px] flex-1 md:block">
          <MarkdownPreview content={selectedNote?.content ?? ""} />
        </div>
      </div>
    </div>
  );
}

