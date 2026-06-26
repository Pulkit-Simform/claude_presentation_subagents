---
description: Add sample CRM data to the database
---

Run the database seed script:

```bash
npm run prisma:seed
```

This populates the database with:
- Acme Corp (Technology) and Globex Inc (Manufacturing)
- Contacts: John Doe (CTO), Jane Smith (VP Eng), Bob Johnson (CEO)
- Deals: Platform Migration ($150K), Consulting Retainer ($60K), IoT Implementation ($250K)

After seeding, start the dev server with `npm run dev` and open the dashboard at http://localhost:3000
