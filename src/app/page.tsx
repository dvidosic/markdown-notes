import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight">
        Markdown Notes
      </h1>
      <p className="text-sm text-slate-600">
        A simple, clean markdown notes app powered by Next.js, Supabase, and Tailwind
        CSS. Create, edit, and preview your notes in real time.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
}
