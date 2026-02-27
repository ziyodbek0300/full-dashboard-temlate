# Dashboard Application Framework

Production-grade SaaS dashboard framework built with React 18, TypeScript (strict), Vite, TailwindCSS, and shadcn/ui. Features authentication, RBAC, modular architecture, a full CRUD Users module, and a GitHub repository browser with syntax highlighting.

**Live Preview:** https://full-dashboard-temlate.vercel.app

**Source Code Browser:** https://full-dashboard-temlate.vercel.app/app/repositories

## Tech Stack

| Category     | Technology                                          |
| ------------ | --------------------------------------------------- |
| Framework    | React 18, TypeScript (strict)                       |
| Build        | Vite                                                |
| Styling      | TailwindCSS, shadcn/ui, CVA, clsx, tailwind-merge   |
| Routing      | react-router-dom v6 (lazy loading, guards)          |
| Server State | @tanstack/react-query                               |
| Forms        | react-hook-form, Zod                                |
| HTTP         | Axios (interceptors, token refresh, error mapping)  |
| Client State | Zustand (theme, sidebar, saved repos)               |
| Syntax HL    | react-syntax-highlighter (PrismLight)               |
| Markdown     | react-markdown, remark-gfm, @tailwindcss/typography |
| Icons        | lucide-react                                        |
| Toasts       | Sonner                                              |
| Code Quality | Prettier, Husky, lint-staged                        |

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
```

### Mock Credentials

The app ships with a mock API layer — no backend needed.

| Email             | Password | Role    |
| ----------------- | -------- | ------- |
| alice@example.com | password | Admin   |
| bob@example.com   | password | Manager |
| carol@example.com | password | Viewer  |

All 8 seed users use the password `password`. New accounts can be registered (default role: Viewer). Data persists in localStorage.

## Scripts

```bash
npm run dev           # Start dev server
npm run build         # TypeScript check + Vite production build
npm run preview       # Preview production build
npm run lint          # TypeScript type check (no emit)
npm run format        # Format all source files with Prettier
npm run format:check  # Check formatting without writing
```

## Pre-commit Hook

Husky runs on every commit:

1. **Prettier** — auto-formats staged files (`.ts`, `.tsx`, `.json`, `.css`, `.md`)
2. **TypeScript** — `tsc --noEmit` on staged `.ts`/`.tsx` files
3. **Build** — full `tsc -b && vite build`

Commit is blocked if any step fails.

## Architecture

Feature-first + layered architecture. No cross-layer violations.

```
UI Layer
  ↓
Application Layer (Hooks, Routing, Guards)
  ↓
Domain Layer (Modules)
  ↓
Infrastructure Layer (API, QueryClient, Axios)
```

### Folder Structure

```
src/
├── app/                          # Application bootstrap
│   ├── app.tsx                   # Root component
│   ├── providers.tsx             # QueryClient, Auth, Tooltip, Toaster
│   └── router.tsx                # Route definitions, lazy loading, guards
│
├── modules/                      # Domain modules (feature-isolated)
│   ├── auth/
│   │   ├── api.ts                # login, register, logout, refresh, me
│   │   ├── hooks.ts              # useLogin, useRegister, useLogout, useCurrentUser
│   │   ├── context.tsx           # AuthProvider, useAuth (user, hasRole, hasPermission)
│   │   ├── types.ts              # AuthUser, LoginRequest, RegisterRequest, AuthTokens
│   │   ├── components/
│   │   │   ├── login-form.tsx    # react-hook-form + Zod validation
│   │   │   └── register-form.tsx
│   │   ├── pages/
│   │   │   ├── login-page.tsx
│   │   │   └── register-page.tsx
│   │   └── index.ts              # Public API
│   │
│   ├── users/
│   │   ├── api.ts                # getUsers, getUser, createUser, updateUser, deleteUser
│   │   ├── hooks.ts              # useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser
│   │   ├── types.ts              # User, CreateUserDto, UpdateUserDto, UserFilters
│   │   ├── components/
│   │   │   ├── user-table.tsx    # Paginated table with role-based actions
│   │   │   ├── user-form.tsx     # Create/edit form (Zod validated)
│   │   │   └── user-filters.tsx  # Search + role filter
│   │   ├── pages/
│   │   │   ├── users-list-page.tsx
│   │   │   ├── user-detail-page.tsx
│   │   │   ├── user-create-page.tsx
│   │   │   └── user-edit-page.tsx
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── types.ts
│   │   ├── pages/
│   │   │   └── settings-page.tsx # Profile settings form
│   │   └── index.ts
│   │
│   └── repositories/
│       ├── api.ts                # Separate axios instance for api.github.com
│       ├── hooks.ts              # useRepository, useContents, useFileContent, useReadme, useRateLimit
│       ├── store.ts              # Zustand persisted store for saved repos
│       ├── types.ts              # GitHub API types, SavedRepository
│       ├── components/
│       │   ├── file-icon.tsx     # Extension-based icon mapping
│       │   ├── repo-breadcrumbs.tsx
│       │   ├── directory-listing.tsx
│       │   ├── file-viewer.tsx   # PrismLight syntax highlighting (12 languages)
│       │   ├── readme-preview.tsx
│       │   ├── add-repo-dialog.tsx
│       │   ├── repo-card.tsx
│       │   └── rate-limit-banner.tsx
│       ├── pages/
│       │   ├── repositories-list-page.tsx
│       │   ├── repository-browser-page.tsx
│       │   └── repository-file-page.tsx
│       └── index.ts
│
├── shared/                       # Cross-domain reusable code
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives (button, input, dialog, etc.)
│   │   ├── guards/
│   │   │   ├── auth-guard.tsx    # Redirect to /login if unauthenticated
│   │   │   ├── public-guard.tsx  # Redirect to /app if authenticated
│   │   │   └── role-guard.tsx    # Check role/permission
│   │   ├── layout/
│   │   │   ├── app-layout.tsx    # Sidebar + Topbar + Outlet
│   │   │   ├── sidebar.tsx       # Collapsible, nav items, active highlighting
│   │   │   ├── topbar.tsx        # Breadcrumbs, theme toggle, user menu
│   │   │   ├── page-layout.tsx   # Title + content wrapper
│   │   │   └── breadcrumbs.tsx   # Route-aware breadcrumbs
│   │   ├── confirm-dialog.tsx    # Reusable confirmation modal
│   │   ├── data-table.tsx        # Generic table with pagination
│   │   ├── empty-state.tsx       # Empty state placeholder
│   │   ├── error-boundary.tsx    # React error boundary
│   │   ├── loading-skeleton.tsx  # Table/form/card skeleton layouts
│   │   └── page-header.tsx       # Title + description + actions
│   │
│   ├── hooks/
│   │   ├── use-theme.ts          # Dark/light toggle (Zustand, persisted)
│   │   ├── use-sidebar.ts        # Collapsed state (Zustand, persisted)
│   │   └── use-breadcrumbs.ts    # Route-aware breadcrumb generation
│   │
│   ├── lib/
│   │   ├── axios.ts              # Axios instance, token attach, 401 refresh queue
│   │   ├── query-client.ts       # React Query client config
│   │   ├── api-error.ts          # ApiError class + error mapping
│   │   ├── utils.ts              # cn() helper (clsx + tailwind-merge)
│   │   └── mock/
│   │       ├── data.ts           # Seed users, localStorage-backed store
│   │       └── handlers.ts       # Mock API interceptor (auth + CRUD)
│   │
│   ├── types/
│   │   ├── api.ts                # ApiResponse<T>, PaginatedResponse<T>
│   │   └── index.ts              # Role, Permission enums, ROLE_PERMISSIONS map
│   │
│   └── constants/
│       ├── routes.ts             # Route path constants (no magic strings)
│       ├── query-keys.ts         # Centralized query key factory
│       └── navigation.ts         # Sidebar nav config (with permission gates)
│
├── styles/
│   └── globals.css               # Tailwind directives + shadcn/ui CSS variables
│
├── main.tsx                      # React DOM entry
└── vite-env.d.ts                 # Vite type declarations
```

### Module Boundary Rule

Modules **cannot** import from other modules directly. Cross-module communication goes through `shared/` or public contracts (`index.ts` exports).

## Authentication

Token-based auth with automatic refresh.

**Flow:** Login → store tokens in localStorage → attach to requests via Axios interceptor → on 401, queue requests, refresh token, retry → on refresh failure, clear tokens, redirect to `/login`.

**Auth endpoints excluded from refresh loop:** `/auth/login`, `/auth/register`, `/auth/refresh`, `/auth/me`.

**Context:** `useAuth()` provides `user`, `isLoading`, `isAuthenticated`, `hasRole(role)`, `hasPermission(permission)`.

## RBAC

Three roles with hierarchical permissions:

| Role    | Permissions                              |
| ------- | ---------------------------------------- |
| Admin   | Full access (all CRUD + settings)        |
| Manager | Users read/create/update + settings read |
| Viewer  | Users read + settings read               |

Permissions are checked via `hasPermission()` from `useAuth()`. UI elements (buttons, menu items, routes) conditionally render based on the current user's role.

## Routing

| Path                                    | Guard       | Description                          |
| --------------------------------------- | ----------- | ------------------------------------ |
| `/login`                                | PublicGuard | Login page                           |
| `/register`                             | PublicGuard | Register page                        |
| `/app`                                  | AuthGuard   | Redirects to `/app/users`            |
| `/app/users`                            | AuthGuard   | Users list (paginated, searchable)   |
| `/app/users/new`                        | AuthGuard   | Create user form                     |
| `/app/users/:id`                        | AuthGuard   | User detail view                     |
| `/app/users/:id/edit`                   | AuthGuard   | Edit user form                       |
| `/app/settings`                         | AuthGuard   | Profile settings                     |
| `/app/repositories`                     | AuthGuard   | Saved repos grid + add/remove/search |
| `/app/repositories/:owner/:repo`        | AuthGuard   | Root directory listing + README      |
| `/app/repositories/:owner/:repo/tree/*` | AuthGuard   | Subdirectory listing                 |
| `/app/repositories/:owner/:repo/blob/*` | AuthGuard   | Syntax-highlighted file view         |

All route components are lazy-loaded. Route-level error boundaries catch rendering failures.

## Data Fetching

All server state is managed by React Query. No manual loading booleans, error flags, or `useEffect` fetches.

- **Query keys** are centralized in `shared/constants/query-keys.ts`
- **Stale time:** 5 minutes
- **Retry:** 1 for queries, 0 for mutations
- **Cache invalidation:** mutations invalidate related query keys on success

## Layout System

- **Sidebar:** Collapsible with persisted state, nav items from config, active route highlighting, tooltips when collapsed
- **Topbar:** Breadcrumbs (auto-generated from route), dark/light theme toggle (persisted), user dropdown menu with logout
- **PageLayout:** Reusable wrapper with title, description, and action slot

## Mock API

The mock layer intercepts all Axios requests at the interceptor level — no network calls are made. Data is stored in localStorage and persists across refreshes.

To connect a real backend, remove the `setupMockInterceptor(api)` call in `src/shared/lib/axios.ts` and set `VITE_API_BASE_URL` in `.env`.

## Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GITHUB_TOKEN=ghp_...   # Optional: increases GitHub API rate limit from 60 to 5,000 req/hr
```

Copy `.env.example` to `.env` and configure as needed.

## Building for Production

```bash
npm run build    # Output in dist/
npm run preview  # Serve the production build locally
```
