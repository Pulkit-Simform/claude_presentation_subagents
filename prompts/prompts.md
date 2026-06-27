### Prompt 01:
```markdown
Explore the codebase and give me the summary of the current codebase
```


### Prompt 02:
```markdown
Spawn three subagents which complete the following task:
- sub_agent_01: give me the summary of view directory
- sub_agent_02: give me the summary of src.routes directory
- sub_agent_03: give me the summary of the db relation
```

### Prompt 03:
```markdown
Now do the below steps again without taking the context
Without spawning subagents, complete the below tasks,
- give me the summary of view directory
- give me the summary of src.routes directory
- give me the summary of the db relation
```

---

## Multi-Agent Pipeline Demo

### Prompt 04 — Trigger Planner
```markdown
Read the latest requirements file from the project root and generate a structured implementation plan with tasks t01, t02, t03.
```

### Prompt 05 — Trigger Code-Writer
```markdown
Read the latest plan from the plan/ folder, spawn parallel subagents to implement t01, t02, and t03, then hand off to code-reviewer.
```

> Note: Prompts 04 and 05 are triggered manually one after the other.
> After Prompt 05, the pipeline auto-chains: code-writer → code-reviewer → test-writer.