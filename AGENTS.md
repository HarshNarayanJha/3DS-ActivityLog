# AGENTS.md - Development Guidelines for 3DS-ActivityLog

## Project Overview

This is a SvelteKit 5 + TypeScript + TailwindCSS v4 application that displays Nintendo 3DS activity log data. The frontend renders play history, statistics, and title information from data extracted from 3DS save files.

## Build & Development Commands

All commands run from the `web/` directory:

```bash
# Development
bun run dev              # Start Vite dev server
bun run build            # Build for production (output: web/build/)
bun run preview          # Preview production build

# Type Checking
bun run check            # Run svelte-check (types + Svelte)
bun run check:watch      # Watch mode for type checking

# Formatting & Linting
bun run format           # Format all files with Prettier
bun run lint             # Check formatting with Prettier (read-only)
```

**Note:** This project does not currently have a test suite configured. Do not add tests unless explicitly requested.

## Code Style Guidelines

### Formatting (Prettier)

- **Indent:** 2 spaces (no tabs)
- **Quotes:** Double quotes
- **Semicolons:** No trailing semicolons
- **Trailing commas:** None
- **Print width:** 100 characters
- **TailwindCSS:** Uses `prettier-plugin-tailwindcss` with stylesheet at `./src/app.css`

### TypeScript

- **Strict mode:** Enabled in `tsconfig.json`
- **Module resolution:** `bundler`
- **Check JS:** Enabled (`checkJs: true`)
- Always use explicit type annotations for function parameters and return types
- Use `type` over `interface` for simple type definitions unless interface extension is needed

### Svelte 5

- This project uses Svelte 5 with runes (`$state`, `$derived`, `$effect`)
- Use `.svelte` file extension
- Use `$props()` for component props
- Use `$state()` for reactive state
- Use `$derived()` for computed values

### Imports

- Use path aliases when available:
  - `$components` -> `./src/components`
  - `$lib` -> `./src/` (built-in SvelteKit alias)
- Order imports: external first, then internal
- Example:
  ```typescript
  import { base } from "$app/paths";
  import type { TitleData } from "$lib/types";
  import { getPlayStats } from "$lib/stats";
  ```

### Naming Conventions

- **Components:** PascalCase (e.g., `ActivityLogViewer.svelte`)
- **Files/functions:** camelCase (e.g., `stats.ts`, `getPlayStats()`)
- **Types:** PascalCase with `type` prefix (e.g., `type TitleStats`)
- **Interfaces:** PascalCase (e.g., `interface TitleData`)
- **Constants:** SCREAMING_SNAKE_CASE for compile-time constants (e.g., `HOME_MENU_TID`)

### Error Handling

- Use `console.error()` for logging parsing errors or unexpected states
- Return sensible default values instead of throwing in utility functions
- Example pattern from `stats.ts`:
  ```typescript
  if (!history) {
    return { titles: new Map(), totalPlayTime: 0, totalTitles: 0 };
  }
  ```

### TailwindCSS

- Use v4 syntax with `@import "tailwindcss"` and `@theme`
- Custom colors and shadows are defined in `src/app.css`
- Use `@apply` sparingly in base layers; prefer utility classes in components
- Dark mode is supported via CSS custom properties and `mode-watcher` package

### Components Structure

- Place components in `src/components/` organized by feature:
  - `src/components/activitylog/` - Activity log specific components
  - `src/components/titlelibrary/` - Title library components
  - `src/components/landing/` - Landing page components
  - `src/components/ui/` - Reusable UI primitives
- Use `<script lang="ts">` for TypeScript
- Keep components small and focused
- Use Svelte's slot system for composition

### Data Files

- Title databases are stored as JSON in `data/generated` (generated from scripts in `scripts/`)
- Do not manually edit generated JSON files; regenerate using Python scripts in `scripts/`

## Architecture Notes

- Static site generation with `@sveltejs/adapter-static`
- Fallback page: `404.html`
- Uses `luxon` for date/time handling
- Uses `bits-ui` for UI component primitives
- File upload handled via `svelte-file-dropzone`
