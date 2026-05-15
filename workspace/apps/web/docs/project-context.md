# Project Context for AI Agents — `@sollapay/web`

_Critical rules and patterns AI agents must follow when implementing code in this React SPA. Focuses on unobvious details that agents might otherwise miss._

_Generated: 2026-03-02_

---

> **⚠️ MANDATORY FOR AI AGENTS:** You MUST read this entire file fully before implementing any code in this app. Do not skim or skip sections. Every rule here is load-bearing.

---

## Critical Implementation Rules

- 🚨 **YOU MUST** read `docs/project-context.md` (repo root) before implementing any code in this package — monorepo-wide rules defined there apply here and take precedence over package-specific rules.

### TypeScript Rules

- `tsconfig.json` extends `@sollapay/tsconfig/react.json` — all monorepo-wide TS rules apply (see root context)

### Config & Environment Variables

- **`src/config.ts` is the sole entry point for `import.meta.env`** — never access `import.meta.env.VITE_*` anywhere else in the codebase
- Available config fields: `config.apiUrl`, `config.auth0.domain`, `config.auth0.clientId`, `config.auth0.audience`, `config.auth0.claimsNamespace`
- Env files live at `env/apps/web/.env` (and per-stage variants) — check `env/apps/web/.env.example` before adding new env vars

### Provider Composition Rules

- **`src/components/Providers.tsx` is the only place to add providers** — never add providers to `src/main.tsx`
- The provider nesting order is load-bearing and must be preserved:
  ```
  I18nProvider           ← must be outermost (i18n needed by auth/query layers)
    I18n                 ← RTL side-effect component (sets document.dir)
    Auth0Provider        ← depends on i18n being initialized
      QueryClientProvider ← innermost
  ```
- `I18n` is a renderless side-effect component — it must be a sibling of `Auth0Provider` inside `I18nProvider`, not a wrapper

### API & Auth Rules

- **Always use `useApiClient()`** from `src/api` to make API calls — it automatically injects the Auth0 token via `getAccessTokenSilently`
- Never call `getAccessTokenSilently()` directly to make API requests; `HttpClient` handles it
- The API base URL is `${config.apiUrl}/v1/api` — do not construct URLs that bypass this prefix
- Auth0 is configured with `useRefreshTokens: true` and `cacheLocation: "localstorage"` — do not re-configure these in the provider

### TanStack Query & API Layer Rules

Every feature that calls the API must follow this layered pattern:

```
Component → useQuery/useMutation hook → api module → HttpClient
```

#### API Modules (`features/<name>/api/`)

- Every feature has an `api/` directory with pure API functions — no React, no hooks
- API functions are grouped in a named `const <domain>Api = { ... }` object per domain entity
- API functions receive `HttpClient` as the first argument — never call `useApiClient()` inside the API module
- API functions return `ApiResponse<T>` (the full envelope) — never unwrap `.data` in the API layer
- API modules import only types from `@sollapay/types` and `@sollapay/enums` — no React imports
- Reference: copy API functions from `workspace/apps/playground/src/api/` and adapt

```ts
// features/trust-accounts/api/trust-accounts.ts
import type {HttpClient} from '@sollapay/http-client';
import type {ApiResponse, TrustAccountListItemDTO} from '@sollapay/types';
import type {TrustStatus} from '@sollapay/enums';

export const trustAccountsApi = {
  fetchTrustAccounts: async (
    client: HttpClient,
    params?: {status?: TrustStatus}
  ): Promise<ApiResponse<TrustAccountListItemDTO[]>> => {
    return client.get<ApiResponse<TrustAccountListItemDTO[]>>('/trust_accounts', {params});
  }
};
```

#### Query Key Factories

- Every feature defines a `<domain>Keys` factory object in a dedicated `api/<domain>-query-keys.ts` file
- Keys are hierarchical using the spread pattern: `[entity] → [entity, scope] → [entity, scope, id]`
- Child entities nest under parent keys: `['trust-accounts', parentId, 'buyers', 'list']`
- **Never use inline string arrays** for query keys — always reference the factory
- Key factories live in `api/` and are exported from the feature's `api/index.ts` barrel — import directly from there when cross-feature invalidation is needed

```ts
// features/trust-accounts/api/trust-accounts-query-keys.ts
import type {TrustStatus} from '@sollapay/enums';

export const trustAccountQueryKeys = {
  all: ['trust-accounts'] as const,
  lists: () => [...trustAccountQueryKeys.all, 'list'] as const,
  list: (filters: {status?: TrustStatus}) => [...trustAccountQueryKeys.lists(), filters] as const,
  details: () => [...trustAccountQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...trustAccountQueryKeys.details(), id] as const
};

// Child entity keys nest under parent
export const buyerKeys = {
  all: (trustAccountId: string) => ['trust-accounts', trustAccountId, 'buyers'] as const,
  lists: (trustAccountId: string) => [...buyerKeys.all(trustAccountId), 'list'] as const,
  detail: (trustAccountId: string, buyerId: string) =>
    [...buyerKeys.all(trustAccountId), 'detail', buyerId] as const
};
```

#### Query Hooks (`features/<name>/hooks/`)

- One hook per query or mutation — named `use<Entity>Query` for queries, `use<Action><Entity>Mutation` for mutations
- Hooks live in `features/<name>/hooks/` with a barrel `index.ts`
- Queries unwrap `response.data` in `queryFn` — components receive `T`, not `ApiResponse<T>`
- Use `enabled: !!id` for hooks that depend on a dynamic ID
- Don't override global query defaults (`staleTime`, `retry`, `refetchOnWindowFocus`) without a documented reason
- Use `export function` syntax (not `export const ... = () =>`) for all hooks

```ts
import type {TrustStatus} from '@sollapay/enums';

export function useTrustAccountsQuery(status?: TrustStatus) {
  const client = useApiClient();
  return useQuery({
    queryKey: trustAccountQueryKeys.list({status}),
    queryFn: () => trustAccountsApi.fetchTrustAccounts(client, {status}).then(res => res.data)
  });
}
```

#### Mutation Hooks

- Mutations invalidate related queries in `onSuccess` using key factories — never hardcoded strings
- Invalidate at the list level (`keys.lists()`) after create/delete; invalidate both list + detail after update
- Accept `onSuccess`/`onError` callbacks via an options parameter for component-specific side effects (toast, navigation)

```ts
export function useCreateTrustAccountMutation() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TrustAccountCreatePayload) =>
      trustAccountsApi.createTrustAccount(client, payload).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: trustAccountQueryKeys.lists()});
    }
  });
}
```

#### React Query Global Defaults

- The `QueryClient` singleton is created once in `src/infra/react-query/providers/QueryClientProvider.tsx` — **never instantiate a new `QueryClient` elsewhere**
- Default query options: `refetchOnWindowFocus: false`, `retry: 1`, `staleTime: 5 minutes`

#### Feature Constants (`features/<name>/constants/`)

- Display config maps (status → color, icon, translationKey) live in `features/<name>/constants/`
- Status groupings (`ACTIVE_STATUSES`, `INACTIVE_STATUSES`) are derived from enum values from `@sollapay/enums` — never hardcoded strings
- Icons use Iconify string IDs (from `@sollapay/ui`), not `react-icons`

### Routing Rules

- Routes are defined in `src/infra/react-router/providers/index.tsx` using `createBrowserRouter` — add all new routes there
- The root `Layout` component renders `<AppHeader />` + `<Outlet />` — all authenticated routes share this layout
- A catch-all route (`path: '*'`) redirects to `/` — handle unknown routes at the router level, not in components

### i18n & RTL Rules

- **All user-visible strings in JSX must use `useTranslation()`** — no hardcoded English or Hebrew strings in components
- When adding a translation key, **always update both `en.json` and `he.json`** simultaneously
- The default and fallback language is **Hebrew (`he`)** — the app renders in Hebrew by default
- Language choice is persisted in `localStorage` under key `i18nextLng`
- `I18n.tsx` sets `document.documentElement.dir` and `document.documentElement.lang` reactively — do not set these manually
- Use `useDirection()` from `src/infra/i18n/hooks` to read the current direction (`'ltr' | 'rtl'`) inside components
- **RTL is active** — use logical CSS only: `ms-`/`me-` (not `ml-`/`mr-`), `ps-`/`pe-` (not `pl-`/`pr-`)

### Design System Rules

- **All UI components must come from `@sollapay/ui`** — never hand-roll Tailwind for components that already exist there (buttons, inputs, dialogs, etc.)
- `src/index.css` imports `@sollapay/ui` which brings in all design tokens and Tailwind theme — do not import tokens from the package path directly
- Design tokens (`--brand-primary`, `--fg`, `--border`, `--background-*`, etc.) are available as Tailwind utilities (e.g., `bg-brand-primary`, `text-fg`, `border-border`)
- Do not use deprecated shadcn token names (`--color-primary`, `--color-foreground`, `--color-muted-foreground`) — they do not exist in this system

### Error Handling Rules

- API errors are instances of `HttpClientError` from `@sollapay/http-client`
- Use utility functions from `src/utils/error-handling.ts` — do not inspect raw error properties:
  - `getErrorMessage(error, fallback)` — safe string extraction from any error type
  - `isHttpClientError(error)` — type guard
  - `getErrorStatusCode(error)` — returns HTTP status or `undefined`
  - `getErrorCode(error)` — returns the typed `code` string from the API error
- ⚠️ `HttpClientError` extends `Error` — always check `instanceof HttpClientError` **before** checking `instanceof Error`, or use the `isHttpClientError()` guard

### Logger Rules

- Use `logger` from `src/utils/logger.ts` — do **not** use `console.log`, `console.info`, `console.warn`, or `console.error` directly in production code
- Create namespaced child loggers for modules: `const log = logger.createLogger('MyFeature')`
- Logger is always enabled but uses `debug` level in dev and `info` level in production

### Testing & Storybook Rules

- **Stories are the tests** — `@storybook/addon-vitest` runs stories as Vitest tests in Playwright Chromium headless; no separate test files needed
- **Story coverage rule**: Every new visual component MUST have a Storybook story — even if the user did not explicitly request it. Never ship a component without story coverage. Story location: `__stories__/<Name>.stories.tsx` next to the component. Required stories: Default state + relevant variants (loading, empty, error, edge cases). Exception: components requiring full infrastructure mocking (Auth0, React Query mutations) may be skipped, but their presentational children must have stories.
- Run tests: `pnpm vitest` (headless) or `pnpm storybook` (interactive dev server on port 6007)
- Storybook does NOT pick up `vite.config.ts` automatically — Tailwind must be injected via `viteFinal` in `.storybook/main.ts` and `src/index.css` imported in `.storybook/preview.ts`

### File & Folder Structure Rules

```
src/
  main.tsx                          ← entry point; do NOT add providers here
  index.css                         ← imports @sollapay/ui
  app/
    App.tsx                         ← auth gate + RouterProvider mount
    config.ts                       ← sole import.meta.env access point
    Providers.tsx                   ← all global providers go here
    DebugModeHeader.tsx             ← debug-only header (hidden unless VITE_DEBUG=true)
  routes/
    index.tsx                       ← createBrowserRouter + RouterProvider
  layouts/
    MainLayout.tsx                  ← AppSidebar + DebugModeHeader + Outlet
    components/
      AppSidebar/                   ← sidebar nav (nav-items.tsx = route config)
      PageHeader/                   ← shared page header component
  lib/
    auth/providers/                 ← Auth0Provider wrapper
    query/providers/                ← QueryClient singleton + QueryClientProvider
    i18n/
      config.ts                     ← i18next initialization
      components/I18n.tsx           ← RTL side-effect (renderless)
      components/LanguageSwitcher.tsx
      hooks/useDirection/           ← useDirection() hook
      locales/en/                   ← English translations split by namespace
      locales/he/                   ← Hebrew translations split by namespace
      providers/I18nProvider.tsx
  features/
    dashboard/
      DashboardPage.tsx             ← dashboard route component
    <name>/
      api/                          ← pure API functions (no React)
        <entity>.ts                 ← const <entity>Api = { ... }
        <entity>-query-keys.ts      ← query key factory object
        index.ts                    ← barrel
      hooks/                        ← TanStack Query wrappers
        use<Entity>Query.ts         ← query hooks
        index.ts                    ← barrel (exports hooks + keys)
      constants/                    ← display config maps (status → color/icon)
      components/                   ← feature-specific components
      <PageName>.tsx                ← page entry component
  components/
    feedback/                       ← ConfirmActionModal and other shared modals
    file-upload/                    ← reusable document upload widget
    ErrorAlertMessage/
    InlineError/
  hooks/
    useApiClient.ts                 ← authenticated HttpClient hook
    index.ts                        ← app-wide custom hooks barrel
  utils/
    error-handling.ts               ← HttpClientError helpers
    logger.ts                       ← browser logger
    index.ts                        ← utils barrel
```

- File naming for utilities: `camelCase.ts`; React components: `PascalCase.tsx` (see root for full naming conventions)
- Files inside purpose-named directories must use matching suffixes: `api/` → `.api.ts`, `utils/` → `.utils.ts`, `types/` → `.types.ts`, `constants/` → `.constants.ts`, `config/` → `.config.ts`
- Co-location rule: single-consumer files live inside the consumer's folder; multi-consumer files live at the nearest common ancestor under their purpose sub-folder
- Exports must be inline at the declaration — never via a separate `export { }` at the bottom of a file

### Critical Don't-Miss Rules

**Never do these:**

- ❌ **Don't access `import.meta.env` outside `src/app/config.ts`** — all env vars must go through the `config` object
- ❌ **Don't add providers to `main.tsx`** — always add to `src/app/Providers.tsx`
- ❌ **Don't instantiate `QueryClient` outside `src/lib/query/providers/QueryClientProvider.tsx`**
- ❌ **Don't call `getAccessTokenSilently` for API requests** — use `useApiClient()` which handles this
- ❌ **Don't hardcode user-visible strings in JSX** — always use `useTranslation()`
- ❌ **Don't update only one locale file** — both `en.json` and `he.json` must always be in sync
- ❌ **Don't hand-roll UI components** that exist in `@sollapay/ui`
- ❌ **Don't use `console.log/warn/error` directly** — use `logger` from `src/utils/logger.ts`
- ❌ **Don't check `instanceof Error` before `instanceof HttpClientError`** — `HttpClientError` extends `Error`, so check the more specific type first
- ❌ **Don't define routes outside `src/routes/index.tsx`**
- ❌ **Don't set `document.dir` or `document.lang` manually** — `I18n.tsx` manages these reactively
- ❌ **Don't put API calls directly in hooks** — API functions go in `features/<name>/api/`, hooks only wrap them with TanStack Query
- ❌ **Don't use inline string arrays as query keys** — always use the `<domain>Keys` factory object
- ❌ **Don't call `useApiClient()` inside API modules** — pass `HttpClient` as a parameter
- ❌ **Don't unwrap `response.data` in API modules** — unwrap in the `queryFn`/`mutationFn` inside hooks
- ❌ **Don't invalidate queries with hardcoded key strings** — always use the key factory (e.g. `trustAccountQueryKeys.lists()`)
- ❌ **Don't ship a new visual component without a Storybook story** — every component needs at least a Default story in `__stories__/<Name>.stories.tsx`
- ❌ **Don't override global query defaults** (`staleTime`, `retry`, `refetchOnWindowFocus`) per-query without a documented reason

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code in this app
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option

**For Humans:**

- Keep this file focused on web-app-specific rules only — monorepo-wide rules belong in the root `docs/project-context.md`
- Update when app-level conventions change

_Last Updated: 2026-03-10_
