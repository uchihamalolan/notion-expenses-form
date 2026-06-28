# Notion Expenses Tracker

A personal expense logger built on top of Notion. Log expenses directly into a Notion database from a clean mobile-friendly web app — with quick-fill templates, theme switching, and GitHub OAuth for single-user access control.

---

## Features

- **Log expenses** into a Notion database via the Notion API
- **Quick-fill templates** — save reusable expense presets, pin favourites to the home screen
- **Templates CRUD** — create, edit, pin/unpin, and delete templates from a dedicated page
- **SWR-style schema caching** — Notion database options (categories, payees, payment modes) are cached server-side and revalidated in the background
- **GitHub OAuth** — single-user access gate via GitHub login
- **Theme switching** — multiple daisyUI themes with a toggle
- **Responsive layout** — mobile-first design with collapsing nav

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) (Runes) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI v5](https://daisyui.com/) |
| Runtime / Package Manager | [Bun](https://bun.sh/) |
| Linter / Formatter | [Biome](https://biomejs.dev/) |
| Validation | [Zod](https://zod.dev/) |
| Auth | GitHub OAuth (custom cookie sessions, no DB) |
| Data | [Notion API](https://developers.notion.com/) |
| Language | TypeScript |

---

## Prerequisites

- [Bun](https://bun.sh/) ≥ 1.0
- A [Notion integration](https://www.notion.so/my-integrations) with access to your expenses database
- A [GitHub OAuth App](https://github.com/settings/developers) for authentication

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Notion API
NOTION_TOKEN=               # Your Notion integration secret (ntn_...)
NOTION_DATABASE_ID=         # ID of your Notion expenses database

# GitHub OAuth
GITHUB_CLIENT_ID=           # OAuth App client ID
GITHUB_CLIENT_SECRET=       # OAuth App client secret
ALLOWED_GITHUB_USER=        # Your GitHub username — only this user can log in

# Session
SESSION_SECRET=             # Random 64-char hex string for signing session cookies
```

### Generating a session secret

```bash
openssl rand -hex 32
```

---

## Notion Database Schema

Your Notion database must have the following properties:

| Property | Type |
|---|---|
| Name | Title |
| Amount | Number |
| Category | Multi-select |
| Date | Date |
| Payee | Select |
| Payment Mode | Select |
| Notes | Rich text |

The app reads available options for Category, Payee, and Payment Mode directly from the database schema at runtime.

---

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) and sign in with your GitHub account.

---

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run fix` | Auto-format and lint with Biome |
| `bun run check:all` | Biome + TypeScript + Svelte type check |

---

## Deployment

The recommended host is **Cloudflare Pages** (no DB, no cold starts, generous free tier).

1. Push to GitHub
2. Connect the repo to Cloudflare Pages
3. Set build command: `bun run build`
4. Set output directory: `.svelte-kit/cloudflare`
5. Add all environment variables in the Cloudflare dashboard

> **Note**: Switch `@sveltejs/adapter-auto` to `@sveltejs/adapter-cloudflare` before deploying to Cloudflare.

---

## Project Structure

```
src/
├── hooks.server.ts          # Auth middleware (session validation)
├── lib/
│   ├── components/          # Svelte UI components
│   ├── server/              # Server-only modules (Notion API, schema cache)
│   ├── store/               # Client-side reactive stores (templates)
│   ├── schemas.ts           # Zod schemas + shared TypeScript types
│   └── icons.ts             # SVG path registry
└── routes/
    ├── +page.svelte         # Expense logging home
    ├── templates/           # Templates CRUD page
    └── auth/                # GitHub OAuth callback
```
