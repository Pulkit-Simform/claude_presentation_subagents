# Requirements: CRM Enhancement — Three New Modules

Date: 2026-06-27
Requested by: Pulkit Sharma

## Overview

Add three new modules to the existing CRM application to improve relationship tracking and deal management. Each module must support full CRUD operations (Create, Read, Update, Delete) and integrate with the existing Customer, Contact, and Deal entities.

---

## Module 1: Tags

Allow users to create reusable tags and attach them to Customers. Tags help categorize and filter accounts (e.g. "Enterprise", "High Priority", "Churned").

### Requirements

- **Tag entity:** `id`, `name` (unique, required), `color` (hex string, default `#6366f1`), `createdAt`, `updatedAt`
- **CustomerTag join table:** many-to-many between Tag and Customer
- **CRUD for Tags:**
  - `GET /tags` — list all tags with count of customers using each
  - `GET /tags/new` — form to create a tag
  - `POST /tags` — save new tag
  - `GET /tags/:id/edit` — edit form
  - `PUT /tags/:id` — update tag name/color
  - `DELETE /tags/:id` — delete tag (removes associations, not customers)
- Show attached tags as colored badges on the Customer show page (`views/customers/show.ejs`)
- Add "Tags" link to the nav

### Acceptance criteria

- Tag names are unique; duplicate name shows a validation error
- Deleting a tag does not delete any customers
- Tags appear as colored pill badges on the customer detail page
- Tag list shows the number of customers associated with each tag

---

## Module 2: Tasks

Allow users to create follow-up tasks linked to a Customer or Deal. Tasks have a due date and a completion status, enabling a simple activity tracker.

### Requirements

- **Task entity:** `id`, `title` (required), `description` (optional), `dueDate` (datetime, optional), `status` (enum: `pending`, `in_progress`, `done`, default `pending`), `customerId` (FK, optional), `dealId` (FK, optional), `createdAt`, `updatedAt`
- **CRUD for Tasks:**
  - `GET /tasks` — list all tasks, sortable by due date; show status badge
  - `GET /tasks/new` — form with dropdowns for Customer and Deal (both optional)
  - `POST /tasks` — save new task
  - `GET /tasks/:id/edit` — edit form
  - `PUT /tasks/:id` — update task (including status toggle)
  - `DELETE /tasks/:id` — delete task
- Show related tasks on the Customer show page and Deal show page

### Acceptance criteria

- A task can exist without a customer or deal (standalone task)
- Status can be updated from the task list without going to edit page (simple form button)
- Overdue tasks (dueDate in the past, status != done) are highlighted in red on the list
- Customer and Deal show pages display their linked tasks

---

## Module 3: Notes

Allow users to attach free-text notes to Customers or Contacts. Notes provide a running log of interactions, calls, or observations.

### Requirements

- **Note entity:** `id`, `body` (text, required), `customerId` (FK, optional), `contactId` (FK, optional), `createdAt`, `updatedAt`
- **CRUD for Notes:**
  - `GET /notes` — list all notes, newest first, showing linked customer/contact name
  - `GET /notes/new` — form with dropdowns for Customer and Contact (both optional)
  - `POST /notes` — save new note
  - `GET /notes/:id/edit` — edit form
  - `PUT /notes/:id` — update note body
  - `DELETE /notes/:id` — delete note
- Show related notes as a timeline on the Customer show page and Contact show page

### Acceptance criteria

- Note body is required; empty note shows a validation error
- Notes on the Customer and Contact show pages are sorted newest-first
- The notes list page shows a truncated preview (first 100 chars) of each note body
- Deleting a note does not affect the linked customer or contact

---

## General Conventions (from CLAUDE.md)

- Use Prisma ORM; add models to `prisma/schema.prisma` and run `npx prisma migrate dev`
- Routes: RESTful, use `method-override` with `?_method=PUT` / `?_method=DELETE`
- Views: EJS templates in `views/<module>/`, use existing partials (`header`, `nav`, `footer`)
- All async route handlers must have `try/catch` with `next(err)`
- Register new routes in `src/app.js`
- Add each module to the nav in `views/partials/nav.ejs`
