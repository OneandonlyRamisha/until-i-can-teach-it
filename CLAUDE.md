# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint

node scripts/seed-admin.mjs      # Create/update the admin user in MongoDB
node scripts/hash-password.mjs   # Interactive: hash a password with bcrypt (prints result to stdout)
```

No test suite is configured.

## Environment Variables

Required in `.env.local`:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for signing JWT tokens

## Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout (font, footer)
│   ├── page.tsx                    # Home page
│   ├── about/page.tsx
│   ├── api/
│   │   ├── posts/
│   │   │   ├── route.ts            # GET /api/posts?category=  |  POST /api/posts (auth required)
│   │   │   └── [slug]/route.ts     # GET /api/posts/:slug  |  PUT /api/posts/:slug  |  DELETE /api/posts/:slug
│   │   └── auth/
│   │       ├── login/route.ts      # POST — validates credentials, sets admin_token cookie
│   │       └── logout/route.ts     # POST — clears admin_token cookie
│   ├── admin/
│   │   ├── page.tsx                # Redirects to /admin/posts
│   │   ├── login/page.tsx          # Login form
│   │   ├── new-post/page.tsx       # Authenticated post creation UI (textarea editor)
│   │   └── posts/
│   │       ├── page.tsx            # Posts list with edit/delete actions
│   │       └── [slug]/edit/page.tsx  # Edit existing post
│   └── blog/
│       ├── page.tsx                # Suspense wrapper
│       ├── blogClient.tsx          # Client component with category filter
│       └── [slug]/page.tsx         # Individual post page
├── lib/
│   ├── mongodb.ts                  # Mongoose connection (cached singleton)
│   ├── auth.ts                     # bcrypt helpers + JWT sign/verify (jose)
│   ├── models/Post.ts              # Mongoose Post model + IPost/Block types
│   └── posts.ts                    # Data-access helpers (getPosts, getPostBySlug, getCategoryCounts)
├── sections/                       # Home page sections (hero, latest posts, topics, etc.)
├── components/                     # Reusable UI (post cards, footer)
├── proxy.ts                        # Next.js middleware logic (guards /admin/* routes)
└── public/
```

## Architecture

This is a **Next.js 16 App Router** blog site using TypeScript and CSS Modules.

### Path alias
`@/*` maps to the project root (configured in `tsconfig.json`).

### Data layer
- `lib/mongodb.ts` — cached Mongoose connection via `MONGODB_URI`
- `lib/models/Post.ts` — `IPost` interface and Mongoose schema. The model is always recreated on module load (`delete mongoose.models.Post`) to prevent stale schema after hot-reload.
- `lib/posts.ts` — exports `getPosts(options?)`, `getPostBySlug(slug)`, `getCategoryCounts()`

Post shape (`IPost`): `category`, `slug`, `header`, `des`, `date`, `duration`, `content` (array of `Block`). Each `Block` is one of:
- `{ type: "paragraph"; parts: ParagraphPart[] }` — `ParagraphPart` is `string | { highlight: string }`
- `{ type: "header"; text: string }` — rendered as a section heading (`<h6>`)
- `{ type: "quote"; text: string }` — rendered italic with accent left-border
- `{ type: "bullets"; items: string[] }` — rendered as a `<ul>`

Content is stored as `[Schema.Types.Mixed]` in Mongoose. If you change the Post schema, restart the dev server — stale cached models will strip unknown fields from saved documents.

### Content editor syntax
Both `app/admin/new-post/page.tsx` and `app/admin/posts/[slug]/edit/page.tsx` use a plain-text textarea with a `parseContent()` function that converts each line to a `Block`:

| Input | Block type |
|---|---|
| `# My heading` | `header` |
| `"A quote"` or `"smart quotes"` | `quote` |
| `- Bullet item` | `bullets` (consecutive `-` lines merge into one block) |
| `*word*` inline | `highlight` part inside a `paragraph` |
| anything else | `paragraph` |

The edit page also has `serializeContent()` which converts stored blocks back to this syntax for pre-filling the textarea.

### Auth system
- `lib/auth.ts` — `hashPassword`/`verifyPassword` (bcrypt via `bcryptjs`), `createToken`/`verifyToken` (JWT via `jose`)
- `lib/models/User.ts` — Mongoose `User` model (`username`, `passwordHash`); admin accounts live in MongoDB
- Login looks up the user by username in the DB, verifies the bcrypt hash, then sets an `httpOnly` `admin_token` cookie (7-day expiry)
- `proxy.ts` contains the Next.js middleware: guards all `/admin/*` routes, redirecting unauthenticated requests to `/admin/login`. **Note:** this file is named `proxy.ts` instead of the conventional `middleware.ts`.
- `POST /api/posts` and `PUT`/`DELETE /api/posts/:slug` all verify the `admin_token` cookie
- To add/reset an admin user: run `node scripts/seed-admin.mjs` (edit the username/password in the script first)

### Admin UI
- `/admin/posts` — lists all posts; edit (pencil) and delete (trash) buttons per row
- `/admin/new-post` — textarea editor; auto-generates `slug` from `header`
- `/admin/posts/[slug]/edit` — same editor pre-filled via `serializeContent()`; slug is read-only; submits `PUT`
- The edit page imports its CSS from `app/admin/new-post/page.module.css`

### API routes
- `GET /api/posts?category=` — returns filtered posts array
- `GET /api/posts/:slug` — returns a single post or 404
- `POST /api/posts` — creates a post (auth required)
- `PUT /api/posts/:slug` — updates a post (auth required)
- `DELETE /api/posts/:slug` — deletes a post (auth required)
- `POST /api/auth/login` — authenticates and sets cookie
- `POST /api/auth/logout` — clears cookie

### Page structure
- `app/blog/page.tsx` — wraps `blogClient.tsx` in `<Suspense>` (required because `blogClient.tsx` uses `useSearchParams`)
- `app/blog/blogClient.tsx` — filters posts by category, reads `?category=` from URL on mount
- `app/blog/[slug]/page.tsx` — server component; renders each `Block` via a switch on `block.type`

### Component/section split
- `sections/` — full-width page sections used only on the home page
- `components/` — reusable UI pieces (post cards, footer) used across pages

Each component/section has a co-located `*.module.css` file for scoped styles.

### Font
Loaded in `app/layout.tsx`, exposed as CSS custom property `--noto-serif-georgian` on `<body>`. Reference it in CSS Modules as `var(--noto-serif-georgian)`.

### Icons
Use `react-icons/fa6` (Font Awesome 6) to stay consistent with existing imports (e.g. `FaArrowLeftLong`, `FaPencil`, `FaTrash`).
