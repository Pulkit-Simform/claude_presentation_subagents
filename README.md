# CRM Demo — Teaching Claude Code Agents

A CRM web app built to demonstrate Claude Code's **Agents**, **Commands**, and **Skills** features. The app itself is a working product — the real teaching artifact is the `.claude/` directory that wires up a full multi-agent development pipeline.

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 18+ + Express 4 |
| Frontend | EJS (server-rendered templates) |
| Database | SQLite via Prisma ORM |
| CSS | Plain CSS, no framework |

## Quick Start

```bash
npm install
npm run setup      # migrate DB + seed sample data
npm run dev        # start dev server with --watch
```

App runs at `http://localhost:3000`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with hot reload (`node --watch`) |
| `npm start` | Production server |
| `npm run setup` | Run migrations + seed sample data |
| `npm run prisma:seed` | Seed only |
| `npx prisma studio` | Visual DB browser |

## Data Model

```
Customer (company)
  ├── Contact[] (people, cascade delete)
  └── Deal[]    (opportunities, cascade delete)

Deal
  └── Contact?  (optional link)
```

Three Prisma models in `prisma/schema.prisma`. Each entity has full CRUD routes under `/customers`, `/contacts`, and `/deals`.

## Project Structure

```
src/
  app.js                Express entry + dashboard route
  db.js                 Prisma client singleton
  routes/               customers.js  contacts.js  deals.js
  middleware/           errorHandler.js
views/
  partials/             header  nav  footer  formErrors
  customers/            index  create  edit  show
  contacts/             index  create  edit  show
  deals/                index  create  edit  show
prisma/
  schema.prisma
  seed.js
public/css/style.css
.claude/                ← Claude Code teaching artifacts
```

## Claude Code Features Demonstrated

### Agents (`.claude/agents/`)

Specialized subagents that form a 4-stage development pipeline:

| Agent | Model | Role |
|-------|-------|------|
| `planner` | Sonnet 4.6 | Reads `requirements-*.md`, writes a 3-task plan to `plan/` |
| `code-writer` | Sonnet 4.6 | Spawns 3 parallel worker subagents (one per task), hands off to reviewer |
| `code-reviewer` | Opus 4.8 (high effort) | Reviews implementation against the plan, writes a report to `reviews/` |
| `test-writer` | Haiku 4.5 (low effort) | Generates and runs tests, prints pipeline summary |

**Pipeline flow:**

```
requirements-*.md
  → /planner        (plan/plan-*.md)
  → /code-writer    (3 parallel workers)
  → /code-reviewer  (reviews/review-*.md)
  → /test-writer    (tests/, pipeline summary)
```

### Commands (`.claude/commands/`)

Slash commands for recurring workflows:

| Command | Description |
|---------|-------------|
| `/add-customer` | Guided wizard — prompts for all fields, creates customer + contacts + deal in one step |
| `/seed-db` | Populate the DB with sample CRM data |
| `/review-crm` | Full codebase audit — error handling, validation, security, query efficiency |

### Skills (`.claude/skills/`)

Reusable two-phase instruction bundles:

| Skill | Description |
|-------|-------------|
| `crm-crud` | Generates a complete CRUD module (Prisma model + routes + 4 EJS views + nav link) for any new entity |
| `handoff` | Structured inter-agent handoff protocol used by code-writer → code-reviewer → test-writer |

## Conventions

- Routes: RESTful — `method-override` with `?_method=PUT` / `?_method=DELETE` for forms
- Views: `snake_case` filenames, `<%- include('../partials/header') %>` pattern
- DB: always import Prisma via `src/db.js` singleton
- Error handling: all async handlers use `try/catch` → `next(err)` → central `errorHandler`
- No client-side JS — all interactions are full page loads
