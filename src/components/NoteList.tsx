import type { Note } from "../types/note";
import { NoteItem } from "./NoteItem";

type NoteListProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelect: (noteId: string) => void;
};

export function NoteList({ notes, selectedNoteId, onSelect }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        You don&apos;t have any notes yet. Create a new note to get started.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isActive={note.id === selectedNoteId}
          onSelect={() => onSelect(note.id)}
        />
      ))}
    </div>
  );
}

