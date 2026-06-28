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

### 5. Personal Coding & Design Guidelines
- **Strict Theme Respect:** Do not override active theme attributes (colors, text weights, hover behaviors) with custom Tailwind utility overrides. Let the active theme resolve color and contrast natively.
- **Themed Geometry:** Use native themed border-radius tokens (`rounded-box`, `rounded-(--rounded-btn)`) instead of hardcoded utility classes (`rounded-2xl`, `rounded-3xl`) to prevent visual mismatches when toggling themes.
- **Layout & HTML Minimalism:** Consolidate styles and eliminate redundant wrapper divs. If an element's only child is the content wrapper, apply layout and padding directly to the parent tag to keep the DOM hierarchy flat.
- **Semantic Tagging:** Prioritize semantic HTML5 elements over generic `div` containers:
  - `<aside>` for floating overlay alerts, modal prompts, and toast notifications.
  - `<output>` for dynamic form responses and status messages.
  - `<search>` for input elements that filter or select items.
  - `<main>` and `<section>` for layout landmarks, pages, and cards.
  - `<ul>` and `<li>` for lists, options menus, and badge grids.
  - `<strong>` instead of styled spans for bold typographic emphasis.
  - `<button type="button">` with an `aria-label` for interactive overlay backdrops that dismiss menus.
- **Zero Inline SVGs:** Individual Svelte components must never contain inline SVG elements. Register all SVG paths in [Icon.svelte](file:///Users/malolan/Projects/notion-expenses-form/src/lib/components/Icon.svelte) and reference them using `<Icon name="..." />`.
- **Accessibility (a11y):** Visually hide necessary structural labels using `sr-only` rather than omitting them entirely, ensuring complete screen-reader compatibility without affecting the visual design.

### 6. Incremental Coding & Breakdown Philosophy
- **Write Less Code (Incremental Delivery):** Minimize HTML tags, CSS classes, and JS logic written. Build features incrementally using progressive enhancement:
  1. Implement the absolute minimum code to get the basic functionality working.
  2. Once working, evaluate if anything more needs to be added.
  3. Re-iterate step 2. At each iteration, further increase the level of scrutiny and justification required before adding any new code.
- **Svelte File Line Limit (120 LOC):** Individual `.svelte` components must **never exceed 120 lines of code**. If a component is approaching or exceeds 120 LOC, break it down into smaller sub-components. (This is the *only* exception to writing less total code; a minor increase in overhead due to imports/setup is acceptable).

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


