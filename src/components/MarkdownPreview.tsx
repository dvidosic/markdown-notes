"use client";

import ReactMarkdown from "react-markdown";

type MarkdownPreviewProps = {
  content: string;
};

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="h-full overflow-y-auto rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm leading-relaxed">
      {content.trim().length === 0 ? (
        <p className="text-slate-400">
          Start typing markdown in the editor to see a live preview here.
        </p>
      ) : (
        <div className="prose max-w-none prose-headings:scroll-m-20 prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-50">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
      )}
    </div>
  );
}

