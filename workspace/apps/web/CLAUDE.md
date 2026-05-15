# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **MUST**: At the beginning of every session, you MUST read [`workspace/apps/web/docs/project-context.md`](workspace/apps/web/docs/project-context.md) fully before doing any work.

> See root-level `CLAUDE.md` for monorepo-wide commands, architecture, and shared package details.

## Commands (run from this directory)

```bash
pnpm dev              # Start dev server at http://localhost:5174
pnpm build            # tsc + vite build
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm type-check       # tsc --noEmit
pnpm storybook        # Start Storybook at http://localhost:6007
pnpm test             # Run Storybook/Vitest browser tests (headless Chromium)
```

## Architecture

React 19 SPA with Auth0, React Query, React Router v7, i18next, Tailwind v4.

### Entry Point Flow

`main.tsx` → `<Providers>` wraps the app in `I18nProvider` → `Auth0Provider` → `QueryClientProvider`.

`App.tsx` handles the Auth0 gate (loading / unauthenticated / authenticated). Once authenticated, renders `<RouterProvider>` which sets up React Router with a shared `<Layout>` (AppSidebar + Outlet).

### `src/` Structure

```
app/              App shell — App.tsx, Providers.tsx, config.ts, DebugModeHeader.tsx
routes/           Route definitions — createBrowserRouter + RouterProvider
layouts/          Page layouts (MainLayout) + layout-specific components
  components/
    AppSidebar/   Sidebar composition using design-system <Sidebar>
                  nav-items.tsx = route config; types.ts = NavItemConfig
    PageHeader/   Shared page header
lib/              Infrastructure providers (no business logic)
  auth/           Auth0Provider wrapper
  i18n/           i18next config, I18nProvider, useDirection hook
                  locales split by namespace: auth, common, nav, trust-accounts
  query/          QueryClientProvider

features/         Feature-scoped UI and logic
  dashboard/      Dashboard page
  authentication/ Auth-related components
  trust-accounts/ Trust account management

components/       Shared non-layout UI
  feedback/       ConfirmActionModal and other shared modals
  file-upload/    Reusable document upload widget
  ErrorAlertMessage/
  InlineError/

hooks/            App-wide custom hooks (useApiClient, useSidebarModePreference, …)
utils/            App-wide utilities (error-handling, logger)
```

### Routing

All routes live in `src/routes/index.tsx`. To add a route: add the path there and add a nav item to `src/layouts/components/AppSidebar/nav-items.tsx` with a `labelKey` for i18n.

### Navigation / Sidebar

`AppSidebar` reads `navItems` from `nav-items.tsx`, maps them to `SidebarNavGroup` using `react-router-dom`'s `useLocation` / `useNavigate`, and passes them to `<Sidebar>` from `@sollapay/ui`. Icons use Iconify string IDs (e.g. `"solar:widget-2-linear"`).

### i18n

Default language is Hebrew (`he`), with English (`en`) as fallback. Translation keys live in `src/infra/i18n/locales/{en,he}.json`. Always add keys to both files. Use `useTranslation()` hook; all user-visible strings must go through `t('key')`.

### Storybook

Stories live at `src/**/*.stories.tsx` (flat or nested). The `viteFinal` hook in `.storybook/main.ts` injects `@tailwindcss/vite`. If adding a story that needs Tailwind tokens, import `src/index.css` (or the globals) in `.storybook/preview.ts`.

- **MUST**: Every new visual component MUST have a Storybook story — even if not explicitly requested. Never ship a component without story coverage. Place stories in `__stories__/<Name>.stories.tsx` next to the component. Include Default state + relevant variants (loading, empty, error, edge cases).

### Key Conventions

- **MUST — Business logic reference**: Before implementing any business logic, always search `workspace/apps/playground/` for existing examples and patterns first. If reusable code exists there that covers the use case, that is the first choice — copy and adapt it rather than writing from scratch.
- Import UI from `@sollapay/ui`; never hand-roll Tailwind for components that already exist in the design system.
- Use `@/` alias for `src/` imports (configured in `vite.config.ts`).
- Icons: use the `<Icon icon="iconify-id" />` component from `@sollapay/ui`, not raw SVGs.
- All new pages/features belong under `src/features/<feature-name>/`.
- Config is at `src/app/config.ts` — import as `@/app/config`, never `import.meta.env` directly.
- Routes are defined in `src/routes/index.tsx` — add new routes there.
- Shared modals live in `src/components/feedback/`; layout components in `src/layouts/`.
