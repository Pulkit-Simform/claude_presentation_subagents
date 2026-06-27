---
name: handoff
description: Protocol for handing off work between pipeline agents (code-writer → code-reviewer → test-writer). Provides a structured format for passing context and auto-invoking the next agent.
---

## What this skill does

Provides the standard protocol for one pipeline agent to transfer control and context to the next agent. Used by code-writer when chaining to code-reviewer, and by code-reviewer when chaining to test-writer.

## Handoff context format

When handing off, always pass this structured context in the Agent invocation prompt:

```
You are receiving a handoff from <current-agent> to begin your role in the pipeline.

## Handoff Context

plan_path: <absolute path to the plan file>
implemented_files:
  t01: [<file1>, <file2>]
  t02: [<file3>]
  t03: [<file4>, <file5>]
review_path: <path to review file — omit if handing off to code-reviewer>
critical_issues: <list of critical issues, or "none">
issues_from_workers: <any deviations workers reported — omit if handing off to test-writer>

## Your job

<Next agent's role — copy the "What you do" section from the next agent's instructions>
```

## How to invoke the next agent

Use the Agent tool with:
- `subagent_type` = the name of the next agent (`code-reviewer` or `test-writer`)
- Prompt = the handoff context block above, fully filled in

Example for code-writer → code-reviewer:
```
Agent({
  subagent_type: "code-reviewer",
  prompt: "You are receiving a handoff from code-writer...\n\nplan_path: /abs/path/plan/plan-20260627-143022.md\nimplemented_files:\n  t01: [src/routes/tags.js]\n  t02: [views/tags/index.ejs, views/tags/create.ejs]\n  t03: [prisma/schema.prisma]\nissues_from_workers: none"
})
```

## Rules

- Always use absolute paths — relative paths break when agents run from different working directories
- Never summarize or paraphrase the file list — pass it verbatim
- If there are critical issues, list them explicitly — "none" is a valid value but must be stated
- The receiving agent should treat the handoff context as its primary source of truth for what was done
