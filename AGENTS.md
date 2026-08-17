# AGENTS.md - Development Guidelines for 3DS-ActivityLog

## Project Overview

This application displays Nintendo 3DS activity log data. The frontend renders play history, statistics, and title information from data extracted from 3DS save files.

## Stack

- SvelteKit 5 + TypeScript + TailwindCSS v4
- Uses Svelte runes ($state, $derived, $effect)
- Static build with @sveltejs/adapter-static

## Build & Development Commands

Always use bun for running all npm related commands.

Run in web/:

- `bun run dev`
- `bun run build`

- `bun run check`
- `bun run format`
- `bun run lint`

## Style

Read web/.prettierrc.json

### TypeScript

- Use explicit types
- Prefer type over interface unless extending

### Imports

- for import order, read web/.prettierrc.json
- Use aliases:
	- $components
	- $lib

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

## Docs

- find docs in docs/

## Notes

- Uses `luxon` for date/time handling
- Uses `bits-ui` for UI component primitives
