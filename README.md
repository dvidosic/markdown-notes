# Markdown Notes

A modern Markdown note-taking web application built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.
The application allows authenticated users to create, edit, preview, and delete their own notes.

## Project disclosure (important)

The project was created as an experiment to explore **AI-assisted development workflows using Cursor**, while also practicing modern web development tools, backend integration, and deployment.

## Live Application

- `https://markdown-notes-pi.vercel.app`

## Development Process & Skills Demonstrated

The application code was generated with the help of Cursor, while I focused on the surrounding development process, including:

- **Git & GitHub**: repo setup, commits, syncing/pull/push issues, publishing to GitHub
- **Deployment (Vercel)**: production deployment, reading build logs, fixing build blockers, redeploying
- **Supabase integration**:
  - Auth configuration (email/password + confirmation flow)
  - Postgres table setup for notes
  - **Row Level Security (RLS)** setup so users can only access their own notes
- **Environment configuration**: local + production environment variables (`.env.local` + Vercel env vars)

The goal of the project was to better understand how developers can use AI tools together with modern frameworks to build and deploy applications efficiently.

## Features (MVP)

- **Authentication** (Supabase Auth)
  - Email/password sign up
  - Email/password sign in
  - Sign out
- **Notes CRUD** (Supabase Postgres)
  - Create a new note (defaults to title `Untitled`)
  - Edit title and markdown content
  - Delete notes
  - List all notes belonging to the signed-in user
- **Markdown editing + live preview**
  - Rendered with `react-markdown`
- **Responsive layout**
  - Desktop: Sidebar | Editor | Preview
  - Mobile: stacked layout

## Tech stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth + PostgreSQL + RLS)
- **Markdown**: `react-markdown`
- **Deployment**: Vercel
- **Tooling**: Cursor, Git, GitHub, ESLint

## Setup (local development)

### 1) Clone the repository

```bash
git clone https://github.com/dvidosic/markdown-notes.git
cd markdown-notes
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Future improvements (not implemented)

- Search notes
- Tags / folders
- Dark mode
- Sorting
