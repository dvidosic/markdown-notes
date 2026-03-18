"use client";

import type { Note } from "../types/note";
import { ChangeEvent } from "react";

type NoteEditorProps = {
  note: Note | null;
  isSaving: boolean;
  onChange: (changes: { title?: string; content?: string }) => void;
  onDelete: () => void;
};

export function NoteEditor({
  note,
  isSaving,
  onChange,
  onDelete,
}: NoteEditorProps) {
  if (!note) {
    return (
      <div className="flex h-full flex-1 items-center justify-center rounded-lg bg-white border border-slate-200">
        <p className="text-sm text-slate-500">
          Select a note from the sidebar or create a new one.
        </p>
      </div>
    );
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ title: event.target.value });
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ content: event.target.value });
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg bg-white border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          placeholder="Note title"
          className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400"
        />
        <button
          type="button"
          onClick={onDelete}
          className="text-xs text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>

      <textarea
        value={note.content}
        onChange={handleContentChange}
        placeholder="Write your note in markdown..."
        className="h-full min-h-[280px] flex-1 resize-none rounded-md border border-slate-200 px-3 py-2 text-sm font-mono text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400"
      />
      <p className="text-right text-[11px] text-slate-400">
        {isSaving ? "Saving..." : "All changes saved"}
      </p>
    </div>
  );
}

