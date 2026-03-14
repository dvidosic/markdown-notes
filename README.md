## Markdown Notes

Markdown Notes is a simple, clean, and responsive markdown notebook built with Next.js, Supabase, and Tailwind CSS. Authenticated users can create, edit, preview (via `react-markdown`), and delete their own notes.

### Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend & Auth**: Supabase (PostgreSQL + Auth, Row Level Security)
- **Markdown Rendering**: `react-markdown`
- **Deployment**: Vercel

### Features

- **Authentication**
  - Email/password sign up and login using Supabase Auth
  - Sign out from the top navigation bar
  - Notes dashboard requires authentication
- **Notes Management (CRUD)**
  - Create new notes (default title `Untitled`)
  - Edit note title and markdown content
  - Delete notes
  - List all notes for the currently authenticated user
- **Markdown Editing & Live Preview**
  - Type in markdown and see a live `react-markdown` preview
  - Clean typography with a split editor/preview layout on desktop
- **Responsive UI**
  - Desktop: `Sidebar | Editor | Preview`
  - Mobile: sidebar and content stack vertically

### Folder Structure

- `app/`
  - `page.tsx` – landing page
  - `login/page.tsx` – login route
  - `signup/page.tsx` – signup route
  - `notes/page.tsx` – notes dashboard (protected via Supabase client checks)
- `components/`
  - `Navbar.tsx` – top navigation with auth actions
  - `AuthForm.tsx` – reusable auth form for login/signup
  - `Sidebar.tsx` – notes sidebar with list and new note button
  - `NoteList.tsx` – renders the list of notes
  - `NoteItem.tsx` – a single note list item
  - `NoteEditor.tsx` – title + markdown text editor
  - `MarkdownPreview.tsx` – live markdown preview using `react-markdown`
- `lib/`
  - `supabaseClient.ts` – Supabase browser client instance
- `types/`
  - `note.ts` – shared `Note` type

### Database Schema (Supabase)

Create a `notes` table in Supabase with:

```sql
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);
```

#### Row Level Security

Enable RLS on the `notes` table and add policies so that users can only see and modify their own notes:

```sql
alter table public.notes enable row level security;

create policy "Users can view their own notes"
on public.notes
for select
using (auth.uid() = user_id);

create policy "Users can insert their own notes"
on public.notes
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own notes"
on public.notes
for update
using (auth.uid() = user_id);

create policy "Users can delete their own notes"
on public.notes
for delete
using (auth.uid() = user_id);
```

### Environment Variables

Configure the following environment variables (locally in `.env.local` and in Vercel project settings for production):

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are used by `lib/supabaseClient.ts` to create the Supabase client.

### Getting Started (Local Development)

1. **Install dependencies**

```bash
npm install
```

2. **Set environment variables**

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. **Run the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

4. **Create an account and start using the app**

- Visit `/signup` to create a new account.
- After signup/login, you’ll be redirected to `/notes`.
- Use the sidebar to create and switch between notes.

### Deployment on Vercel

1. Push this project to a GitHub repository.
2. In Vercel:
   - Create a new project from your GitHub repo.
   - Set the environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. Vercel will build and host your Next.js app.

### Notes on Code Quality

- **TypeScript** used throughout for components, hooks, and Supabase data structures.
- **Modular components**: sidebar, list, item, editor, preview, navbar, and auth form are all separated for reuse.
- **Clean layout**: Tailwind utility classes keep styles concise and focused on layout/spacing.
- **Key logic documented**: Supabase client setup, database schema, and RLS policies are documented here to keep the implementation straightforward to understand and maintain.
