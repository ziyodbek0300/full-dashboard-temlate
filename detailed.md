# Frontend Frameworks — Detailed Specification

## Overview

This is about building two internal frontend frameworks:

- Application Framework (Dashboard SaaS Core)
- Marketing Framework (Landing System)

They must be:

- Production-grade
- Enterprise-ready
- Scalable to large teams
- Strictly typed
- Extensible without refactoring core

---

## Overall Architectural Philosophy

These templates are not starter demos.

They are:

- Opinionated
- Modular
- Domain-driven
- Infrastructure-aware
- Easy to reason about
- Replaceable at boundaries

We optimize for:

- Maintainability
- Replaceability
- Scalability
- Onboarding clarity
- Separation of concerns

---

## Technology Baseline (Both Projects)

### Core Stack

- React 18+
- TypeScript (strict true)
- Vite
- TailwindCSS
- shadcn/ui
- react-router-dom v6+
- @tanstack/react-query
- react-hook-form
- Zod
- Axios (with abstraction layer)

### Supporting Tools

- ESLint (strict config)
- Prettier
- Husky + lint-staged
- Absolute path alias: @/\*
- Environment separation

### Optional but recommended

- Zustand (only for UI/global ephemeral state)
- class-variance-authority
- clsx
- lucide-react
- React Query Devtools (dev only)

---

## Project 1 — Dashboard Application Framework

### 1. Architectural Goals

This is a Frontend Application Framework designed for:

- SaaS products
- Admin panels
- B2B systems
- Multi-role systems

It must support:

- Authentication
- Role-based access
- Data fetching architecture
- Scalable module system
- Replaceable backend

This project is structured using:

- Feature-First + Layered Architecture

### 1.1 High-Level Architecture Layers

```
UI Layer
↓
Application Layer (Hooks, Routing, Guards)
↓
Domain Layer (Modules)
↓
Infrastructure Layer (API, QueryClient, Axios)
```

No cross-layer violations allowed.

### 1.2 Folder Structure (Non-Negotiable)

```
src/
├── app/                → Application bootstrap layer
│   ├── router.tsx
│   ├── providers.tsx
│   └── app.tsx
│
├── modules/            → Domain modules (feature isolated)
│   ├── auth/
│   ├── users/
│   ├── settings/
│
├── shared/             → Cross-domain reusable logic
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── constants/
│
├── styles/
└── main.tsx
```

**Strict Rule:**

Modules CANNOT import from other modules directly.

Cross-module communication must go through:

- shared/
- or public contracts

### 1.3 Authentication Architecture

**Goals:**

- Token-based
- Refresh token ready
- Auto-recovery
- Safe storage

**Auth State Design:**

- Access token: in memory
- Refresh token: httpOnly cookie (simulated)
- Current user stored in react-query cache

**Must Implement:**

- AuthProvider
- useAuth()
- login()
- logout()
- refreshToken()
- getCurrentUser()

**Axios Layer:**

Axios must:

- Attach access token
- Handle 401 globally
- Trigger refresh logic
- Retry original request once
- Force logout if refresh fails

No auth logic inside UI components.

### 1.4 Routing System

Use route-based layout separation.

**Route Categories:**

- Public: /login, /register
- Protected: /app/\*

**Structure:**

```
<AppLayout>
  <Sidebar />
  <Topbar />
  <Outlet />
</AppLayout>
```

**Must include:**

- AuthGuard
- PublicGuard
- RoleGuard
- Lazy route loading
- Route-level error boundaries

### 1.5 Module Architecture Pattern

Each module must follow this internal structure:

```
modules/users/
├── api.ts
├── hooks.ts
├── types.ts
├── components/
├── pages/
└── index.ts
```

- **api.ts** — Pure HTTP calls.
- **hooks.ts** — React Query integration.
- **types.ts** — DTO + Domain types.
- **pages/** — Page-level compositions.
- **components/** — Feature-specific UI.

### 1.6 Data Fetching Philosophy

- All server state → Managed by React Query
- All client UI state → Local state or Zustand

**Rules:**

- No manual loading booleans
- No manual error flags
- No fetch inside useEffect
- Query keys must be centralized.

### 1.7 Example CRUD Module (Users)

**Must demonstrate:**

- List (paginated)
- Search
- Create
- Edit
- Delete (optimistic update)
- Detail view
- Skeleton loading
- Error fallback
- Confirmation dialog

**Forms must use:**

- react-hook-form
- zodResolver
- Reusable FormField component

### 1.8 Layout System

**Must include:**

- Collapsible sidebar
- Active route highlighting
- Dark/light theme toggle
- Breadcrumb system
- Responsive behavior
- Reusable PageLayout component

### 1.9 Error Handling Strategy

**Implement:**

- Global API error interceptor
- ErrorBoundary component
- Toast notification system
- Centralized error mapping

No silent failures.

### 1.10 RBAC (Role-Based Access Control)

**Must demonstrate:**

- role type
- permission enum
- permission-based route visibility
- conditional UI rendering

This is critical for SaaS extensibility.

### 1.11 Code Quality Standards

- Strict TypeScript
- No any
- No barrel export abuse
- Explicit return types
- No magic strings
- Naming convention: feature-first
- All async properly typed

---

## Project 2 — Landing Page Framework

This is not just "static marketing".

It is a Marketing Engine Framework.

### 2.1 Architectural Goals

- Conversion-focused
- SEO-ready
- High performance
- Modular sections
- Reusable for multiple products

### 2.2 Structure

```
src/
├── app/
├── sections/
├── components/
├── shared/
├── pages/
└── main.tsx
```

### 2.3 Section-Based Architecture

Each section must:

- Be isolated
- Have its own props interface
- Be independently reusable
- No direct coupling to page

Example:

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
}
```

### 2.4 Required Sections

- Hero
- Features
- Social Proof
- Testimonials
- Pricing
- FAQ
- CTA
- Footer

Each must:

- Be responsive
- Be design-system compliant
- Use CVA variants
- Have spacing consistency

### 2.5 Forms

Contact + Lead Capture:

- react-hook-form
- zod
- API abstraction
- Loading state
- Success state
- Error state

### 2.6 Performance Strategy

- Lazy load non-critical sections
- Code splitting
- Optimized assets structure
- Proper meta tags
- OG tags
- robots.txt placeholder
- sitemap.xml placeholder

### 2.7 Analytics Architecture

Must include placeholders for:

- Analytics provider
- Pixel integration
- Event tracking abstraction

Tracking must not pollute components.

---

## 3. Engineering Maturity Requirements

The AI must ensure:

- Clear README
- Architecture explanation comments
- Example environment files
- No console.logs
- Clean git state
- Dev/prod environment separation
- Query devtools only in development
- Production build optimized

---

## 4. What Makes This Principal-Level

We are not building UI.

We are building:

- Extensible system
- Replaceable boundaries
- Clear ownership zones
- Predictable scaling model
- Stable architecture contracts

This must feel like:

- A small internal framework
- Not a tutorial project
- Not a boilerplate clone

---

## Final Directive to AI Agent

You are generating:

- A Frontend Application Framework
- A Marketing Framework

They must:

- Be production realistic
- Be clean
- Be documented
- Be extensible
- Demonstrate architectural maturity
- Avoid premature abstraction
- Avoid unnecessary dependencies
- Favor clarity over cleverness
