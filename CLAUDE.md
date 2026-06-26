# CRM Demo — Teaching Claude Code Agents

## Stack
- **Backend:** Node.js + Express 4
- **Frontend:** EJS templates
- **Database:** SQLite via Prisma ORM
- **Template engine:** EJS (server-rendered)
- **Node:** 18+

## Project structure
```
src/
  app.js          Express app entry
  db.js           Prisma client singleton
  routes/         customers, contacts, deals
  middleware/     error handler
views/
  partials/       header, nav, footer
  customers/      index, create, edit, show
  contacts/       index, create, edit, show
  deals/          index, create, edit, show
prisma/
  schema.prisma   3 models (Customer, Contact, Deal)
  seed.js         Sample data
public/css/       style.css
.claude/          Agents, commands, skill definitions
```

## Commands
- **Dev server:** `npm run dev` (uses node --watch)
- **Production:** `npm start`
- **Setup DB:** `npm run setup` (migrate + seed)
- **Seed only:** `npm run prisma:seed`
- **Prisma studio:** `npx prisma studio`

## Conventions
- Routes: RESTful with method-override for PUT/DELETE
- Views: snake_case filenames, `<%- include() %>` for partials
- DB: Prisma client accessed via `src/db.js` singleton
- Error handling: centralized middleware at `src/middleware/errorHandler.js`
- Forms: `method-override` with `_method` query param for PUT/DELETE
- No client-side JS frameworks — pure server-rendered EJS

## Architecture notes
- 3 entities: Customer (company), Contact (person), Deal (opportunity)
- Contact belongs to Customer (FK customerId)
- Deal belongs to Customer, optionally to Contact
- Cascade delete: removing a Customer removes its Contacts and Deals
- Dashboard at `/` shows aggregate counts and top active deals

## Teaching objectives
This project demonstrates:
1. **Agents** — specialized subagents with different permissions and models (data-agent, ui-agent, qa-agent)
2. **Commands** — slash commands for recurring workflows (/seed-db, /add-customer, /review-crm)
3. **Skills** — reusable two-phase loaded instruction bundles (crm-crud)
4. **`.claude/` directory** — organizing agents, commands, and skills per Claude Code conventions
5. **opencode.json** — project-level configuration with inline agents and commands
6. **CLAUDE.md** — project context file that guides agent behavior
