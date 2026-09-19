# Repo Radar

A dashboard for searching GitHub repositories, tracking your favorites, and keeping an eye on their stats (stars, open issues, last commit).

## Stack

- React 19 + TypeScript, Vite
- Redux Toolkit + RTK Query for data fetching/caching
- MUI for components, MUI X Charts for the stars chart
- Nx monorepo (npm workspaces)
- GitHub REST API, unauthenticated

## Getting started

```bash
npm install
npx nx serve web
```

App runs at `http://localhost:4200`.

```bash
npx nx run-many -t typecheck lint test   # checks
npx nx build web                          # production build
```

Requires npm 12+ (older npm versions have a resolver bug that crashes on vitest's optional peer dependencies during a first install).

## Structure

```
apps/
  web/            the app: routing-free single page, Redux store, feature components
packages/
  ui/             shared presentational components (search bar, list items, badges, loading/error states)
  charts/         the stars-per-repo bar chart + its data mapping
```

`apps/web/src/store` holds the data layer: `githubApi` (RTK Query, one endpoint for search, one that merges repo details + latest commit into a single request per tracked repo) and `trackedReposSlice` (tracked repo ids + their stats). Only the list of tracked ids is persisted to localStorage — stats are always fetched fresh so they don't go stale.

`ui` and `charts` are separate packages because they're genuinely reusable: they only take props, they don't know about Redux or the GitHub API, so they could be dropped into another app as-is.

## Deployment

Configured for Vercel via `vercel.json` (builds `web`, outputs `apps/web/dist`).
