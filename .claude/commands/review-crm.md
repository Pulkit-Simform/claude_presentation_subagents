---
description: Full codebase review for quality, security, and best practices
---

Review the full codebase. Check each of these areas:

## Error handling
- Do all async route handlers have try/catch with next(err)?
- Does errorHandler middleware handle all cases?
- What happens if a record isn't found?

## Input validation
- Are form inputs validated on the server?
- Are required fields enforced?
- Is data sanitized before storage?

## Security
- Is there any XSS risk in EJS templates? (check use of <%- vs <%=)
- Are CSRF protections needed?
- Are there any exposed secrets or debug info?

## Route consistency
- Are all CRUD routes implemented for each entity?
- Do PUT routes handle partial updates correctly?
- Do DELETE routes handle cascade constraints?

## Code quality
- Are there any code smells, duplication, or anti-patterns?
- Are Prisma queries efficient? (N+1 patterns?)
- Is error messaging user-friendly?

## Output format
```
### Critical
- [file:line] description

### Major
- [file:line] description

### Minor / Suggestions
- [file:line] description
```
