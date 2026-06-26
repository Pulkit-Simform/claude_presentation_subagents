---
name: crm-crud
description: Generate CRUD routes, views, and Prisma model for a new CRM entity
---

## What this skill does

Generates a complete CRUD module for a new CRM entity. Given an entity name and its fields, this skill will:

1. Add a Prisma model to `prisma/schema.prisma`
2. Create a route file in `src/routes/`
3. Create EJS views (index, create, edit, show) in `views/<entity>/`
4. Register the routes in `src/app.js`
5. Add navigation link in `views/partials/nav.ejs`

## How to use

Tell me the entity name (singular, snake_case) and its fields. Example:

> "Add a Task entity with: title (string, required), description (text), status (string, default: 'pending'), dueDate (datetime, optional), assignedTo (relation to Contact, optional)"

I'll create the complete CRUD module and show you the generated files.

## Conventions I follow

- Routes use the same RESTful pattern as existing entities
- Views use the same layout, partials, and CSS classes
- Forms use method-override for PUT/DELETE
- All async handlers have try/catch with next(err)
- Prisma model uses @id @default(autoincrement()), createdAt, updatedAt
- Foreign keys use onDelete: Cascade where appropriate
