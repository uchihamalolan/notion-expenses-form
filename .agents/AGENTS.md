# Project Guidelines & Agent Instructions

This workspace contains a Svelte 5 / SvelteKit project for a Notion Expense Tracker. Agents working on this project must adhere to the following tech stack specifications, coding standards, design practices, and verification steps.

---

## Tech Stack Overview
- **Runtime & Package Manager**: Bun
- **Framework**: Svelte 5 (using Runes) & SvelteKit
- **Styling**: Tailwind CSS v4 & daisyUI v5
- **Formatter & Linter**: Biome (indentation: tabs, max line width: 100)
- **Language**: TypeScript

---

## Coding Standards & Best Practices

### 1. Svelte 5 Runes & Modern APIs
- **Always use Svelte 5 Runes** (`$state`, `$derived`, `$props`, `$effect`, etc.). Legacy Svelte 4 syntax (such as `export let`, `$:`, and event dispatchers) is deprecated and MUST NOT be used.
- Leverage modern HTML5 semantic elements and web APIs.
- Utilize the Svelte MCP server for documentation and code analysis (see Svelte MCP tools below).

### 2. Styling and Layout
- Use Tailwind CSS v4 and daisyUI v5 for styling.
- Prioritize using daisyUI built-in components (e.g., buttons, forms, modals, alerts, cards) to maintain a cohesive, clean design.
- Apply high-quality UI design practices: clear typographic hierarchy, pleasant color palettes, smooth hover states, and responsive layouts.

### 3. Biome Linting and Formatting
- Biome is configured for code linting and formatting. You MUST run `bun run fix` to auto-format and auto-fix code changes.
- Ensure the code uses **tabs** for indentation and conforms to the configured Biome rules.
- Do not bypass linter warnings unless strictly necessary and documented.

### 4. Verification and Type Safety
- Always run static type checks and framework checks before considering a task complete.
- Execute `bun run check:all` to run Bun checks, TypeScript type check (`tsc --noEmit`), and Svelte checks (`svelte-check`). All checks must pass with zero errors.

---

## Available Svelte MCP Tools

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### 1. list-sections
Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation
Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer
Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link
Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

---

## Recommended Project Skills

The following Antigravity skills are highly relevant for the Notion Expense Tracker project. Agents should trigger/load these skills when working on the corresponding areas of the codebase:

### 1. `svelte-code-writer` & `svelte-core-bestpractices`
- **When to use**: Whenever creating, editing, or analyzing any Svelte component (`.svelte`) or module (`.svelte.ts`/`.svelte.js`).
- **Why**: They provide CLI tools for Svelte 5 documentation lookup, code analysis, and best practices.

### 2. `daisyui`
- **When to use**: Whenever generating any HTML, JSX, or Svelte styling.
- **Why**: Ensures styling aligns with daisyUI v5 built-in components and layout methodologies.

### 3. `modern-web-guidance`
- **When to use**: Mandatory first step for all HTML, CSS, and client-side JS tasks.
- **Why**: Ensures usage of up-to-date web APIs, modern layouts, and performance guidelines.

### 4. `webapp-testing`
- **When to use**: When testing client-side UI transitions, form submissions, or verifying local web applications.
- **Why**: Provides Playwright-based testing utilities and commands.

### 5. `design-taste-frontend` & `frontend-design`
- **When to use**: When redesigning pages, adding new UI panels, or establishing visual layout themes.
- **Why**: Helps craft highly aesthetic, responsive, polished editorial interfaces.

### 6. `diagnosing-bugs`
- **When to use**: When the user reports unexpected behavior, runtime errors, or build issues.
- **Why**: Helps execute a robust diagnosis loop to safely identify root causes.


