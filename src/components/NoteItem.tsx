import type { Note } from "../types/note";

type NoteItemProps = {
  note: Note;
  isActive: boolean;
  onSelect: () => void;
};

export function NoteItem({ note, isActive, onSelect }: NoteItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
        isActive
          ? "bg-slate-800 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <span className="truncate">{note.title || "Untitled"}</span>
      <span
        className={`ml-2 shrink-0 text-[11px] ${
          isActive ? "text-slate-300" : "text-slate-400"
        }`}
      >
        {new Date(note.created_at).toLocaleDateString()}
      </span>
    </button>
  );
}

