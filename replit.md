# T Gamess

## Overview
A Next.js game website hosting Unity WebGL games (currently featuring "Slope"). Built with React 19, Next.js 16, Tailwind CSS 4, and TypeScript.

## Project Architecture
- **Framework**: Next.js 16 (App Router) with Turbopack
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4 via PostCSS
- **Language**: TypeScript

### Directory Structure
- `app/` - Next.js App Router pages and components
  - `components/` - Shared components (header, nav, footer)
  - `slope/` - Slope game page
- `public/` - Static assets including Unity WebGL build files
  - `Build/` - Unity game build artifacts
  - `TemplateData/` - Unity loader scripts and assets

## Running
- Dev: `pnpm dev -p 5000 -H 0.0.0.0`
- Build: `pnpm build`
- Start: `pnpm start -p 5000 -H 0.0.0.0`

## Recent Changes
- 2026-02-06: Initial Replit setup, configured `allowedDevOrigins` in next.config.ts for proxy compatibility.
