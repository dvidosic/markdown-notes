import type { Note } from "../types/note";
import { NoteList } from "./NoteList";

type SidebarProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
};

export function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-white border-r border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-800">
          My Notes
        </h2>
        <button
          onClick={onCreateNote}
          className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-slate-900"
        >
          + New Note
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <NoteList
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelect={onSelectNote}
        />
      </div>
    </aside>
  );
}

