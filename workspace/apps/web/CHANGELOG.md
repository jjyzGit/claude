# @sollapay/web

## 0.2.0

### Minor Changes

- 5ecba95: Add deterministic Avatar colors and BuyerAvatarStack component.
  - `Avatar` now accepts `seed` (entity ID) and `colorIndex` props for stable palette assignment across renders
  - New `BuyerAvatarStack` renders a stacked avatar group with overflow count and popover listing all buyers
  - New `BuyerGroupPopover` shared popover content used by both `BuyerAvatarStack` and `BuyerGroupBadge`
  - `BuyerTable` and `BuyerCard` updated to use the new components

- 8868b26: Buyers and Beneficiaries tabs now have an Export button that downloads the current list as CSV or Excel (.xlsx). The export respects active search, filter, and sort state for buyers.
- 85da071: Add reusable DS components: InfoRow, CodeBadge, AmountDisplay, IconBox
  - `InfoRow` — label/value pair with horizontal and vertical layout variants
  - `CodeBadge` — monospace reference code pill
  - `AmountDisplay` — credit/debit amount with sign, semantic color, and built-in `dir="ltr"` for RTL layouts
  - `IconBox` — icon-in-a-box container with size, variant, shadow, and color props
  - Refactored all web app call sites (BuyerCard, TrustAccountCard, PaymentSentModal, BuyerPaymentHistoryTable, ActivityAmountBadge, TransactionRow) to use these components

- 85da071: Spouse as first-class buyer party
  - Spouses are now full co-buyers: each gets their own party, person profile, roles, and balance
  - The create-buyer API now accepts `buyers: [...]` (1–2 entries) sharing one unit and purchase via a new junction table (`trust_buyer_purchase_parties`)
  - `buyerPartyId` added to payment instructions so the UI selects which co-buyer receives each payment request
  - The "Add Spouse" form now collects all buyer fields (name, ID, DOB, phone, email, address) for the co-buyer
  - `spouse_name` / `spouse_national_id` columns removed from `person_profiles`; `buyer_party_id` removed from `trust_buyer_purchases`

- 2273437: Replace free-text `unitIdentifier` on buyer purchases with a first-class unit entity. Buyer creation now requires structured `unit.buildingNumber` and `unit.unitNumber` fields instead of a single identifier string. Units receive a server-generated immutable `displayCode` (e.g. `B1-U101`) used consistently across the buyer table, activity feed, transactions tab, and payment flows. Units also support optional attachments (parking, storage, balcony, yard, other) each with a type and identifier.

### Patch Changes

- 0cda85b: Harmonize devDependency versions across all packages: bump `tsx` to `^4.21.0`, `@types/node` to `^25.2.3`, and `cross-env` to `^10.1.0` to resolve `manypkg` CI failures.
- b69cd2d: chore: remove the playground app (internal development sandbox no longer needed)
- d86cb02: Rename compliance "Supporting Documents" step to "Foundation Documents" and add concrete document examples (land registry, RMI rights approval, combination agreement, urban renewal agreement) to guide users during activation
- 6d6c794: Apply Heebo Variable font as `font-secondary` token to TrustAccountBadge subtitle text
- 67209b6: Add `ModalFlow`, `ModalFlowStep`, and `useModalFlow` to `@sollapay/ui` — a flicker-free multi-step modal system that keeps a single Dialog mounted across step transitions, eliminating backdrop flash and focus-trap re-entry between steps.
- 0772aa4: Add PageErrorState component with illustration and retry button, managed at PageLayout level via `error` and `refetch` props. Replaces bare error labels across TrustAccountListPage, TrustAccountViewPage, TrustAccountActivationPage, and BuyerDetailPage. Also adds the DrawHtml illustration and ErrorState design-system component to `@sollapay/ui`.
- 2af200d: Add "מקסימום" quick-fill button inside the payment amount input. When the field is empty (or below the allowed maximum), a secondary CTA button appears inside the input and fills the remaining allowed amount on click. Also widens `FieldInput.label` to accept `ReactNode` (previously `string` only) and fixes a Storybook circular-dependency crash caused by `DebugModeHeader` importing from the `@/app` barrel.
- 83a834b: Add polling intervals to backend-driven React Query hooks so users see webhook-triggered state changes (payment statuses, balances, trust account review status, activity feed) without navigating away. Introduces a shared `pollingInterval` helper (`medium` / `slow` / `verySlow`) and enables `refetchOnWindowFocus` for all affected queries.
- 957f348: Add real-time events infrastructure using Server-Sent Events (SSE) for payment status updates and notifications. Includes realtime event streaming service, EventsController, token-from-query authentication middleware, and PaymentReceivedToast component for in-app payment notifications.
- 6cf7f82: Show a persistent toast notification when a trust account transitions to active status, with a link to navigate directly to the trust account.
- 06f7179: Fix 4 high-severity Dependabot vulnerabilities via pnpm overrides: lodash (code injection via template), path-to-regexp 0.1.x and 8.x (ReDoS), and picomatch 4.x (ReDoS)
- 8ab222d: Remove "Continue" / "Cancel" footer CTAs from the document upload modal — the modal now closes via the X button only.

  Rename "Send Payment Request" action to "Request Payment" in the buyer actions menu.

- db2d7d0: fix(SOL): partial payment allocated amounts now show correctly in buyer table and metrics card

  Two bugs fixed:
  1. `PaymentInstructionDTO` was missing `allocatedAmountNis`; partial payments showed ₪0 in "סכום פיקדון ששולם" and "תשלומים שהושלמו" even after funds were received.
  2. A second partial payment to the same instruction was incorrectly flagged as a duplicate and blocked; now checked against `canReceiveMatch()` so top-up payments are allowed until the instruction is fully settled.

- 1312f38: fix: tab counts now refresh after creating a payment instruction; buyer name column in TransactionRow set to 25% to prevent initiation method badge overlap with long unit identifiers
- 101bb74: fix: preserve add-buyer success modal and payment flow after buyer creation

  After creating a buyer from the empty state, the congratulations modal and payment request flow were never shown. The root cause was that `AddBuyerFlow` was rendered at two different React tree positions in `BuyersTabContent` — when the buyers query refetched after creation, React unmounted the instance holding `flowStep = 'success-prompt'` and replaced it with a fresh one at `idle`. Fixed by always rendering a single `AddBuyerFlow` at the root so its flow state survives the empty→non-empty transition.

- e713ed5: Replace deprecated `xlsx` (SheetJS CE) with `exceljs` to address CVE-2023-30533 (Prototype Pollution). The xlsx export functionality is unaffected.
- 773b413: Refactor `ToastCard` to use the `IconBox` design-system component and add a `variant` prop (`success` | `warning`). Adds `fg-on-indication` and `border-on-indication` CSS tokens, updates toast consumers, speeds up trust-account polling interval, and fixes minor i18n copy.
- 3b237c5: Centralize document type max-file limits into a single `DOCUMENT_MAX_FILES` config in `@sollapay/domain`, shared by both frontend tab configs and backend upload gating. Signed sale agreement cap drops from 5 to 2 files; transaction legal documents now capped at 10 (previously unbounded).
- 3b237c5: Allow uploading up to 5 files for the signed sale agreement (חוזה מכר).

  Skip AI extraction for documents uploaded via the "Add documents" modal (view-buyer and view-developer flows) — extraction only runs during entity creation where results are consumed. This covers all text-extraction document types including חוזה מכר, נסח חברה, and תעודת התאגדות.

## 0.1.0

### Minor Changes

- 5f9225d: Buyer page UI improvements: payment initiation method badge, updated icons (copy-06, send-01), wider page padding, consolidated more menus for buyers and trust accounts, table column auto-sizing, TableActionsCell moved to @sollapay/ui, payment history sorted newest-first with time display, documents and history sections swapped, action column headers removed.
- aa6c2b4: Buyer registration forms and signed sale agreements now trigger AI extraction. The add-buyer form auto-fills all fields (name, national ID, date of birth, phone, email, address, unit identifier, purchase price, and spouse details if present) from uploaded documents, with per-field AI badges and an extraction status indicator.
- a5a3bda: Implement Transactions Tab for Trust Account view page.

  Replaces the "coming soon" placeholder with a fully functional timeline view:
  - Transactions grouped by date with daily balance totals
  - Each transaction shows buyer name, unit, type badge (ייזום/עצמאי/יוצא), status badge (בתהליך/נקלט), amount, and percent
  - Search by buyer name or unit identifier
  - Filter menu with date preset, amount range, initiation method, and direction
  - Loading skeleton for async state
  - API now enriches transactions with type, percent, and unit info by cross-referencing PaymentInstructions

- c8ffac0: Add trust account tab counts endpoint for lazy tab loading.

  Replaces eager full-data fetching (beneficiaries, transactions, documents, buyers) on every trust account page load with a single lightweight `GET /trust_accounts/:id/tab-counts` endpoint. Each tab's full data now loads lazily on first click.
  - New `GET /trust_accounts/:id/tab-counts` endpoint returns `{ buyers, beneficiaries, transactions, documents }` counts in a single parallel query
  - Transactions count uses Blnk Filter API with `include_count: true` (no full list fetch)
  - `BeneficiariesTabContent` and `DocumentsTabContent` now fetch their own data internally
  - `useTrustAccountBadgeCounts` rewritten to use the new endpoint instead of full arrays
  - Removes 3 eager queries from `TrustAccountViewPage`

- 349464f: Trust account documents tab: upload button per section, delete action in table. Trust name in breadcrumbs now navigates to overview tab
- 75c1ecc: Document upload infrastructure: UploadDocumentsModal, DocumentActionsBar, AddDocumentsButton components. DocumentsTable now uses DocumentActionsBar with delete support
- 1abc815: Buyer documents list: delete action, upload modal (BuyerUploadDocumentsModal), document type badge
- 4ec3454: Redesign ListSortingSelect with popover dialog and sort direction icons. Move the component and its types to `@sollapay/ui` so other apps can reuse it.
- 1b4a2da: Add trust account activity feed page replacing the "Coming Soon" Overview tab. Includes 4 KPI cards (total balance, deposits this week, active buyers, transactions) and a paginated recent activity feed with infinite scroll, showing transaction movements, buyer changes, and document events.
- ceea3ad: Display ILS balance for active trust accounts in three locations: table column (₪ symbol + amount, Figma-styled), card header chip (wallet icon), and view header chip. Balance is fetched from existing API endpoints and shown only when account status is `TRUST_ACTIVE`.

### Patch Changes

- a6d1661: Extract 9 generic components (MetricsCard, ContentSection, HeaderMetaRow, and 6 list filter/view components) from web to @sollapay/ui design system. Add ~35 Storybook stories across all web components and features, increasing coverage from 47% to 70%+.
- fcd7b54: Fix buyer card CTA stretch and completed payments KPI progress color: buyer card action button now stretches full width like the trust account card, and the completed payments metric uses progress-based coloring (success/info/warning thresholds) instead of static warning amber. Also renames the internal `MetricProgressColor` values from `'brand'/'warning'` to `'dynamic'/'static'` for clarity.
- 5f19022: Fix buyer success prompt modal disappearing immediately in production after creating a buyer.
- 95bf9a7: Fix infinite re-render crash (Maximum update depth exceeded) when opening the add-buyer modal. Stabilized callback references in document upload components to prevent setState loops.
- bdb19bc: Skeleton loading states for all pages — replaces spinners with layout-stable skeletons that match the exact structure of loaded content. Covers trust account list (card/table), trust account view (header + all 5 tabs), buyer detail (header + metrics + payments + documents), and activation page (package list + CTA).
- 00f521b: Fix calendar date range filter: end date was excluded (midnight comparison). Show two months side by side for easier range selection.
- 17f4287: Buyer document metadata (partyId, purchaseId) added to presign schema. Server-side partyId filter removed — moved to client. DocumentMetadata widened to Record<string, unknown>
- 95baf6c: Responsive root font-size scaling — UI renders at 82–100% depending on screen width to reduce visual density on smaller screens
- c18bb93: FileActionsBar component added — consistent file action icons across all upload/list components. Badge md size, Card onClick, Modal fit size added
- f3ea6df: Alert component redesigned — unified variant support, removed ErrorAlert
- e6666d6: Buyer cards and table rows are now fully clickable — CTA button and menu still work independently via stopPropagation

## 0.1.0

### Minor Changes

- 4bdcda2: feat(SOL-72, SOL-73, SOL-86): buyer onboarding, buyer detail page, and payment request flow
  - Add full buyer onboarding flow: Add Buyer modal (document upload + buyer details + unit details) → success prompt → payment request → payment sent
  - Add buyer detail page with per-unit metrics card, payment history table (with status badges, copy-to-clipboard reference), documents list, and unit tab selector synced to URL query param
  - Add payment request modal with method selection, custom amount support (feature flag: `VITE_ALLOW_CUSTOM_PAYMENT_AMOUNT`), remaining amount validation, and buyer/unit context indicators
  - Add buyer list view (card + table) with search, filter (payment status, deposit range, created at), sorting, and view toggle
  - Add spouse fields (`spouseName`, `spouseNationalId`) to person profiles with combined display name formatting
  - Add `formatPhoneDisplay` utility for national phone number formatting
  - Add `formatFileSize`, `computeRemainingAmountNis`, `isNonTerminalInstruction`, `isPaymentNextDisabled` shared utilities
  - Add shared `MetricsCard`, `HeaderMetaRow`, `CopyButton` components
  - Add payment instruction status badge config with icons
  - Add `copy` icon from `@untitledui/icons` to `@sollapay/ui` icon map
  - Fix backend test schema: add `spouse_name`/`spouse_national_id` columns and correct `date_of_birth` type to `DATE` in pg-mem test setup

- eb2e7e5: feat(trust-accounts): add trust account filter
  - Add filter panel for trust accounts list with status, purpose, and date range sections
  - Add `TrustAccountFilter` component with `TrustAccountFilterMenu`, `TrustAccountFilterStatusSection`, `TrustAccountFilterPurposeSection`, `TrustAccountFilterCreatedAtSection`, and `TrustAccountFilterDateRangeSection`
  - Add `useFilteredTrustAccounts` hook to apply filters client-side
  - Add `filter.config.ts` with default filter state and `filter.utils.ts` for filter logic

### Patch Changes

- b9b7c14: Show a green completed chip on activation modal tabs when all required fields are filled. Promote `ModalTabIconLabel` to `@sollapay/ui` for reuse across multi-step modals. Fix stale readiness state by invalidating the trust account detail query on every save and document upload/delete. Rename `onMutationSuccess` to `onDocumentChange` on `FileUploadManager`, `DocumentUploadSection`, and `DocumentUploadTabs`.
- fff4439: Add hover state and click handler to activation package row. The full row is now clickable and shows a surface hover background. Hover and click are disabled for packages that are submitted for review or coming soon.
- 56778d1: feat: auto-redirect unauthenticated users to Auth0 login
  - Remove manual login button from App.tsx; unauthenticated users are now redirected automatically via loginWithRedirect
  - Show spinner while redirecting instead of a button

- e688cca: chore: add BugHerd feedback widget script to app head
  - Adds the BugHerd sidebarv2.js snippet to index.html so the feedback widget loads on every page of the dev environment

- c159f82: feat(ui): enable month and year dropdown navigation in calendar pickers
  - Add `captionLayout="dropdown"` to FieldDatePicker and FieldDateRangePicker
  - Users can now jump directly to any month or year instead of navigating arrow-by-arrow

- 03db8a8: Fix text overflow in trust account cards for long names, refIDs, and status labels. Introduces a reusable Card component family (`Card`, `CardHeader`, `CardHeaderContent`, `CardBody`, `CardCell`, `CardFooter`) to the design system.
- b1bd097: fix(ui): change default trust account view from table to card
- 1702dec: Documents table column widths, row/title click navigation, and UI fixes.
  - `DocumentsTable`: per-column `width`/`minWidth`/`maxWidth` config for responsive layout without horizontal scroll; actions column fixed at 120px min
  - `Table`: adds `onRowClick` prop for clickable rows with `cursor-pointer` styling
  - `TrustAccountTable`: title/icon/refId area click navigates to trust account view
  - `TrustAccountCard`: adds `onTitleClick` prop wired to avatar+name+refId area
  - `TrustAccountCardList`: forwards `onCardTitleClick` to each card
  - `TrustAccountListPage`: splits row click (navigates to overview) from CTA button click (navigates to buyers tab for active trusts)
  - i18n: updates Hebrew `preview` label

- 78bab0f: Fix S3 NoSuchKey error showing as raw XML when viewing trust-details documents.
  - API: filter documents list to only UPLOADED/VERIFIED — PENDING_UPLOAD and REPLACED documents no longer appear in the documents tab
  - Web: `openDocumentPreview` now checks `response.ok` before creating a blob, so S3 errors throw instead of displaying raw XML in a new tab
  - Web: `handlePreview` and `handleDownload` in `DocumentsSection` now catch errors and display a user-friendly inline error message

- eb4066a: feat(ui): auto-save form on multi-step modal "Continue" and add next-button loading state
- c240425: feat(web): add disabled tab support to MultiStepsModal — disabled tabs are visually dimmed, non-clickable, skipped by Next/Back navigation, and can display an optional badge (e.g. "Coming Soon"). KYC tab in the activation modal is now disabled with the coming-soon badge.
- 39a9f0d: Add cursor pointer and hover background to SelectTrigger.
- b7739a2: fix(ui): replace sidebar collapse/expand icons with Solar linear icons, fix empty filter state, fix submit button arrow direction
  - Replace sidebar toggle icons with `solar:square-alt-arrow-left-linear` / `solar:square-alt-arrow-right-linear` (Iconify Solar set)
  - Fix `TrustAccountEmptySearch` showing `""` as search term when only a filter is active — show filter-specific subtitle and "Clear filters" button instead
  - Fix submit modal CTA arrow direction in RTL — arrow now correctly appears to the left of "הגש"

- 4f4eb4e: Show per-step error indicators in the activation package modal step nav. Steps with incomplete mandatory fields display an alert icon. Indicators are suppressed until the user has made any progress (first open of a fresh form shows no errors). Also lifts the trust-details query to the tab wrapper so both steps are always mounted and seeded on first render, and removes redundant refetch-on-mount behavior.
- eb2e7e5: feat(web): add sticky page header layout with PageLayout and PageContent components
  - Add `PageLayout` and `PageContent` layout components to scope scroll to content only
  - `SidebarMain` is now `overflow-hidden`; each page controls its own scroll boundary
  - `PageHeader` stays fixed while only the content area below it scrolls
  - Apply `PageLayout`/`PageContent` across all three page routes

- bf74e2d: Table truncation with overflow tooltips, per-column widths, and modal form fields refactor.
  - `Typography`: adds `truncate` base class + hover tooltip when text is clipped
  - `Table`: adds `minWidth`/`maxWidth` per-column config and horizontal scroll support
  - `columns.tsx`: replaces inline spans with `Typography` in text/date columns
  - `shadcn/tooltip`: adds `whitespace-pre-line` for multi-line tooltip support
  - `TrustAccountTable`: applies Figma-spec column widths with `min-w-0` on flex cells
  - `TrustAccountFormFields`: extracts shared form body from Create and Edit modals
  - Create/Edit modals: adds tooltip on purpose label help icon with i18n in EN and HE
  - `TrustAccountSortingSelect`: sets trigger font to `text-sm`

- d15ac5a: Mark the "Options" trust purpose as disabled in the create trust account modal, with a "Coming soon" badge, so users know it is on the roadmap but not yet available.
