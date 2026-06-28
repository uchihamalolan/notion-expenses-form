---
name: project-review
description: |
  Review code changes or existing code in this Notion Expense Tracker workspace.
  Enforces local design guidelines, Biome linting, Svelte 5 runes, and web quality audits.
---

# Codebase & Changes Review Skill

This is the central orchestrator for code reviews in this workspace. It verifies that code complies with Svelte 5, daisyUI 5, global web standards, and local design philosophies.

Use this skill whenever asked to review a branch, PR, file, or overall code quality.

---

## Overarching Philosophy (Applies Across All Axes)

- **`incremental-coding`**: Write as little code as possible (fewer HTML tags, CSS classes, JS logic). Follow these incremental steps during development/refactoring:
  1. Implement the minimal necessary code to make the basic feature work.
  2. Once working, evaluate if additional features are truly needed.
  3. Re-iterate step 2. At each iteration, further increase the level of scrutiny and justification required before adding any new code.
- **`svelte-loc-limit`**: Svelte components (`.svelte`) must never exceed **120 lines of code**. If a file approaches or exceeds this limit, it must be split into smaller components. This is the only exception to writing less total code; a minor overhead for imports/setup is acceptable.

---

## 1. Automated Verification (Pre-requisites)

Before conducting the manual review, run the automated checks in the workspace. The review cannot be considered complete unless all checks pass:

- **Biome formatting & linting**: Run `bun run fix` to auto-format (using tabs) and auto-fix linting issues.
- **Project compilation & Svelte checks**: Run `bun run check:all` to verify TypeScript (`tsc --noEmit`), Svelte syntax (`svelte-check`), and Bun runtime checks.
- **Svelte Autofixer**: Analyze Svelte components using `npx @sveltejs/mcp svelte-autofixer "<filepath>"` to detect common reactivity issues.

---

## 2. Multi-Axis Review Checklist

Analyze the code changes or target files along three distinct axes. Avoid duplicating global rule content; instead, refer directly to the linked reference documents.

### Axis A: Svelte 5 & Reactivity Correctness
- **Legacy Syntax Ban**: Check that Svelte 4 legacy patterns (`export let`, `$:`, event dispatchers) are not present.
- **Rune Correctness**: Ensure correct usage of `$state`, `$derived`, `$props`, and `$effect`.
- **References**:
  - Follow the rules in [svelte-core-bestpractices](file:///Users/malolan/.gemini/config/skills/svelte-core-bestpractices/SKILL.md) for reactivity details, effects, and events.
  - Follow the workflow in [svelte-code-writer](file:///Users/malolan/.gemini/config/skills/svelte-code-writer/SKILL.md) to query documentation or trace reactivity.

### Axis B: Local Design & A11y Guidelines (Strict)
These local guidelines from [AGENTS.md](file:///Users/malolan/Projects/notion-expenses-form/.agents/AGENTS.md) must be strictly enforced:

- **`theme-respect`**: Do NOT override active theme attributes (colors, text weights, hover behaviors) with custom Tailwind utility overrides. Let the active theme resolve color and contrast natively.
- **`themed-geometry`**: Use native themed border-radius tokens (`rounded-box`, `rounded-(--rounded-btn)`) instead of hardcoded utility classes (`rounded-2xl`, `rounded-3xl`).
- **`html-minimalism`**: Consolidate styles and eliminate redundant wrapper divs. If an element's only child is the content wrapper, apply layout and padding directly to the parent tag to keep the DOM flat.
- **`semantic-tagging`**: Prioritize semantic HTML5 elements over generic `div` containers:
  - `<aside>` for floating overlay alerts, modal prompts, and toast notifications.
  - `<output>` for dynamic form responses and status messages.
  - `<search>` for input elements that filter or select items.
  - `<main>` and `<section>` for layout landmarks, pages, and cards.
  - `<ul>` and `<li>` for lists, options menus, and badge grids.
  - `<strong>` instead of styled spans for bold typographic emphasis.
  - `<button type="button">` with `aria-label` for interactive overlay backdrops that dismiss menus.
- **`zero-inline-svg`**: Svelte components must never contain inline SVG elements. Register all SVG paths in [Icon.svelte](file:///Users/malolan/Projects/notion-expenses-form/src/lib/components/Icon.svelte) and reference them using `<Icon name="..." />`.
- **`accessibility`**: Visually hide structural labels using `sr-only` rather than omitting them entirely, ensuring complete screen-reader compatibility without affecting the visual design.

### Axis C: Web Quality & Component Architecture
- **Component Selection Protocol**: Ensure component selections are made by evaluating at least 3 candidates from [daisyui](file:///Users/malolan/.gemini/config/skills/daisyui/SKILL.md) and comparing semantic intent.
- **Security & Compatibility**: Follow input sanitization, HSTS, secure cookies, and dynamic script loading best practices from [best-practices](file:///Users/malolan/.gemini/config/skills/best-practices/SKILL.md).
- **Core Web Vitals & Loading**: Ensure Core Web Vitals targets (LCP < 2.5s, INP < 200ms, CLS < 0.1) are respected. Review loading priorities, aspect ratios, and passive event listeners using [web-quality-audit](file:///Users/malolan/.gemini/config/skills/web-quality-audit/SKILL.md) and [performance](file:///Users/malolan/.gemini/config/skills/performance/SKILL.md).
- **Modern Web APIs**: Utilize up-to-date APIs and fallback strategies as guided by [modern-web-guidance](file:///Users/malolan/.gemini/config/plugins/modern-web-guidance-plugin/skills/modern-web-guidance/SKILL.md).

---

## 3. Review Report Format

Format findings as a structured Markdown response to the user:

```markdown
## Code Review Results

### 1. Automated Verification Status
- Biome formatting: [Passed / Fixed]
- Type Checks & Svelte-check: [Passed / Issues Found]

### 2. Manual Analysis

#### Axis A: Svelte 5 Correctness
- **[Severity]** [File Path]:[Line] - Issue description.
  - **Fix**: Proposed code correction.

#### Axis B: Local Guidelines & Design (Strict)
- **[Severity]** [File Path]:[Line] - Violation of local guideline (e.g. `zero-inline-svg` or `themed-geometry`).
  - **Fix**: Proposed code correction.

#### Axis C: Web Quality & Component Architecture
- **[Severity]** [File Path]:[Line] - Performance, a11y, or daisyUI component selection issue.
  - **Fix**: Proposed code correction.

### 3. Summary & Action Items
- Svelte 5 / Biome: X issues
- Local Guidelines: Y issues
- Web Quality: Z issues
```
