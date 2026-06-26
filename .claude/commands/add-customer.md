---
description: Guided wizard to create a new customer with contacts
---

Walk through creating a new customer interactively:

1. Ask for: company name, industry, website, phone, address, notes
2. Ask if they want to add contacts now (first name, last name, email, phone, position)
3. Ask if they want to add an initial deal (title, value, stage)
4. Insert into the database using Prisma
5. Show the result with a link to the customer page

Use `prisma.customer.create()` with nested `contacts.create` and `deals.create`.
