# Agent Guidelines for ShockTank Arena

## Project Overview

**ShockTank Arena** is a Next.js 16 application using:
- **Next.js App Router** (React 19)
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Beads** for AI-native issue tracking

All issues are tracked in the `.beads/` directory and synced with git.
Use always bd to track and create issues

## Quick Commands for Agents

### Creating Issues
```bash
bd create "Task description"
bd create "Task description" -p 0 -t feature  # High priority feature
bd create "Task description" -d "Detailed description" --assignee agent-name
```

### Finding Work
```bash
bd ready        # Show issues ready to work on (no blockers)
bd list         # List all issues
bd list --status open  # Filter by status
bd show <issue-id>     # View issue details
```

### Managing Issues
```bash
bd update <issue-id> --status in_progress   # Claim work
bd update <issue-id> --status done          # Mark complete
bd close <issue-id>                         # Close issue
```

### Dependencies
```bash
bd dep add <blocker-id> <blocked-id>  # Add blocking dependency
bd dep tree <issue-id>                # View dependency tree
bd dep cycles                         # Detect circular dependencies
```

## Beads workflow for coding agents

This repository uses **Beads** (`bd`) as the primary task tracker and long-term memory for AI coding agents (Copilot, Claude, Codex, Cursor, etc.).  
You MUST use Beads for planning and tracking work instead of ad-hoc markdown plans or scattered TODO comments.

### Planning and microtasks

- For any non-trivial feature, bugfix, or refactor:
  - Prefer a short **planning pass** before coding.
  - Create **one parent issue** for the feature with `bd new`.
  - Create **3–7 small child issues** (microtasks) with `bd new --parent <parent-id>`.
    - Each child should be ~10–30 minutes of work.
    - Use `--blocks` to express ordering (“do A before B”).
    - Use `--discovered-from` for follow-up work or tech debt you discover.
- Do NOT produce large “plans” in markdown; the plan should live in Beads issues.

### Executing work (one microtask at a time)

- Before coding:
  - Run `bd ready` (or `bd ready --json`) and choose ONE relevant ready issue.
  - Show which issue you picked (e.g. `bd show <id>`).
- Implement **only that one** issue:
  - Apply code changes.
  - Add/update tests as appropriate.
  - Run the project’s test/build/linters from the other sections of AGENTS.md.
- When the microtask is complete and checks pass:
  - Close it with `bd close <id> --body "What changed and how it was verified."`
- If checks fail and you cannot fully fix them:
  - Leave the issue open or file a new Beads issue describing the failing state.
- **Important:** After finishing a microtask, STOP.  
  Do **not** automatically start another Beads issue. Report back so the user can review and manually test before continuing.

### “Let’s land the plane”

When the user says **“let’s land the plane”** or **“land the plane”**, treat this as a special, mandatory wrap-up flow:

1. **File remaining work**
   - Create Beads issues for any follow-ups, bugs, or tech debt discovered but not completed.
2. **Run quality gates**
   - Run the relevant tests, linters, and builds described elsewhere in AGENTS.md.
   - If something is broken and cannot be fully fixed now, file high-priority Beads issues describing the problem.
3. **Update Beads**
   - Close all finished issues with clear summaries.
   - Update status/priority for any partially completed work.
4. **Suggest next steps**
   - Choose one good Beads issue for the next session.
   - Provide the user with:
     - A brief summary of what was completed
     - Any follow-up issues created
     - Confirmation that everything has been pushed
     - A recommended prompt to continue work next time

Landing the plane is **only complete** when tests or lint have been run, Beads is up to date, and all changes are pushed to the remote with a clean git state.


## Project Structure
```
shocktank-arena/
├── .beads/           # Beads database and configuration
├── app/              # Next.js App Router directory
│   ├── layout.tsx    # Root layout (metadata, fonts)
│   ├── page.tsx      # Home page (Server Component by default)
│   └── globals.css   # Global Tailwind styles
├── public/           # Static assets (images, fonts)
├── package.json      # Dependencies (Next.js 16, React 19, Tailwind 4)
└── AGENTS.md         # This file
```

## Next.js App Router Guidelines

### File-based Routing
- `app/page.tsx` → `/` (root route)
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug` (dynamic route)
- `app/api/route.ts` → API endpoint

### Component Types
- **Server Components** (default): Fetch data, no interactivity, smaller bundle
- **Client Components**: Use `'use client'` directive for interactivity, hooks, browser APIs

### Key Conventions
- `layout.tsx`: Shared UI wrapper (preserves state, doesn't re-render)
- `page.tsx`: Unique route content
- `loading.tsx`: Suspense fallback UI
- `error.tsx`: Error boundary for route segment
- `not-found.tsx`: 404 page

### Data Fetching
```tsx
// Server Component (recommended)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // or 'no-store', 'revalidate'
  })
  return <div>{data.title}</div>
}
```

### Styling with Tailwind CSS 4
- Use utility classes directly in JSX
- Dark mode: `dark:` prefix (e.g., `dark:bg-black`)
- Responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes
- Custom fonts via `next/font` (Geist Sans & Mono already configured)

## Vercel AI SDK

The project uses Vercel AI SDK for AI features. Install with: `pnpm add ai @ai-sdk/react zod`

### Basic Patterns

**Chat Interface (Client)**
```tsx
'use client';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, sendMessage } = useChat();
  
  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.parts.map((part, i) => {
            if (part.type === 'text') return <div key={i}>{part.text}</div>;
            if (part.type === 'tool-weather') return <pre key={i}>{JSON.stringify(part)}</pre>;
          })}
        </div>
      ))}
      <button onClick={() => sendMessage({ text: 'Hello' })}>Send</button>
    </div>
  );
}
```

**API Route (Server)**
```tsx
// app/api/chat/route.ts
import { streamText, convertToModelMessages, tool, stepCountIs } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: 'anthropic/claude-sonnet-4.5', // or use gateway('openai/gpt-5.1')
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // Allow multi-step tool use
    tools: {
      weather: tool({
        description: 'Get weather in a location',
        inputSchema: z.object({
          location: z.string().describe('Location to check'),
        }),
        execute: async ({ location }) => {
          // Your logic here
          return { location, temperature: 72 };
        },
      }),
    },
  });
  
  return result.toUIMessageStreamResponse();
}
```

### Key Concepts
- **Message Parts**: `UIMessage` contains `parts[]` array (text, tool calls, etc.)
- **Tools**: Define with `tool()`, model auto-invokes when needed
- **Multi-step**: Set `stopWhen: stepCountIs(N)` for tool chains
- **Providers**: Use Vercel AI Gateway or install specific providers (`@ai-sdk/openai`, etc.)
- **Environment**: Set `AI_GATEWAY_API_KEY` in `.env.local`

## Getting Started
```bash
# Initialize database (already done)
bd init

# Create your first issue
bd create "Set up project infrastructure"

# Check what's ready to work on
bd ready

# Start working
bd update <issue-id> --status in_progress
```

## Tips for AI Agents
- Always check `bd ready` before starting new work
- Create issues when you discover related tasks
- Use dependencies to prevent duplicate work
- Add detailed descriptions to help other agents
- Use `--json` flag for programmatic parsing
- **UI Components**: ALWAYS check `components/ui` first. Use existing shadcn/ui components (Button, Card, etc.) before creating custom implementations. Do not reinvent the wheel or add custom CSS/Tailwind classes if a standard component variant exists.


- Commit and code always in english