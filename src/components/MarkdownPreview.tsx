"use client";

import ReactMarkdown from "react-markdown";

type MarkdownPreviewProps = {
  content: string;
};

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="h-full overflow-y-auto rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-900">
      {content.trim().length === 0 ? (
        <p className="text-slate-400">
          Start typing markdown in the editor to see a live preview here.
        </p>
      ) : (
        <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:scroll-m-20 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-code:text-slate-800 prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-a:text-slate-900 prose-li:text-slate-700">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
      )}
    </div>
  );
}

