---
description: Review local PR changes before committing
allowed-tools: Read, Bash(gh:*, git:*), Grep
argument-hint: [pr-number]
---

You are helping review a pull request. Follow this workflow:

### Step 1: Get PR Information

If PR number provided:
Get PR details: !`gh pr view $1 --json title,body,author,files`
Get the diff: !`gh pr diff $1`

If no PR number provided:
Show recent PRs: !`gh pr list --search "is:open author:@me" --limit 5 --json number,title`
Ask user to specify which PR to review by number.

### Step 2: Analyze the Changes

Examine the diff and provide:

**High-Level Summary**
- What is the overall purpose of this PR?
- New APIs introduced (endpoints, functions, methods)
- New or modified data structures (types, interfaces, schemas)
- New dependencies or libraries added
- Architectural or design pattern changes
- Configuration changes
- Any breaking changes

**Dependency Check**
- For any new dependencies: check if they are actively maintained
- Flag archived, deprecated, or unmaintained libraries
- Look for existing libraries in the codebase that could be used instead

**Impact Assessment**
- How does this affect existing code?
- What areas of the codebase will need to be aware of these changes?
- Are there documentation implications?

### Step 3: Review Focus Areas

Provide a numbered list of files or directories to review, in logical order (foundational changes first, then core logic, then usages, then tests). For each item, briefly note what to focus on:

- API or DB schema design considerations, if any
- Complex logic that needs careful examination
- Potential edge cases or error handling gaps
- Performance considerations
- Security implications
- Test coverage gaps
- Code style or consistency issues

### Step 4: Suggested Comments

Prepare a list of suggested review comments. For each comment:

- Keep it short and to the point
- Use a friendly, suggestion-based tone (e.g., "Consider...", "Might be worth...", "Nit: ...")
- Only be strongly opinionated if there's an obvious bug or issue
- Include the file path and line number
- **Verify line numbers** by examining the actual file content

Format each suggestion as:

```
File: <path>
Line: <number>
Comment: <your suggestion>
```

### Step 5: Present Findings

Show your findings in sections, organized as:

1. **PR Summary** - High-level overview
2. **Files to Review** - Organized list
3. **Suggested Comments** - Specific feedback
4. **Next Steps** - What to do with feedback

Then wait for user feedback. They will:
- Ask you to modify suggestions
- Tell you which comments to keep/remove
- Request changes to the review approach

Do NOT submit any reviews or comments until user explicitly approves the plan.
