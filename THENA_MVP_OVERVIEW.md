# Thena MVP Overview

## 1. What Thena Is

Thena is a Solana-powered crowdfunding platform for creatives in Africa and globally. Creators launch on-chain-aware campaigns, and backers support them with SOL.

The current MVP focuses on:

- **Landing & Storytelling**
  - Hero page styled with Shadcn blocks and Linkify-inspired layout.
  - Clear CTAs to **Browse Campaigns** and **Start a Campaign**.
- **Campaign Browsing**
  - `/campaigns` shows real campaigns or a curated demo grid when the DB is empty.
  - Client-side search + simple filters for narrowing down campaigns.
  - Each card displays image, title, description, target, progress, and time left.
- **Campaign Detail & Funding**
  - `/campaigns/{id}` renders a dedicated detail screen with story, stats, and donation progress.
  - Funding panel integrates wallet connect + SOL amount input + devnet donation flow.
- **Campaign Creation**
  - `/campaigns/create` provides a 3-step standalone wizard page:
    - Step 1 – Project Details (title, description)
    - Step 2 – Funding (target SOL, deadline)
    - Step 3 – Review & Launch
  - On submit, a `campaigns` row is created in MySQL. Authenticated creators go to the dashboard; guests return to browse.
- **Wallet & Auth Foundation**
  - Wallet-connect UI via Reown AppKit + Solana wallets (Phantom/Solflare) on devnet.
  - Backend wallet-auth endpoints (`WalletAuthController`) performing nonce + signature verification and Laravel session login.
  - `ConnectWallet` + `UserMenu` components expose connect, dashboards, and logout.
- **Dashboards (Early MVP)**
  - Creator dashboard at `/dashboard` (auth-protected) for campaign stats.
  - Backer dashboard shell at `/dashboard/backer` for viewing pledged campaigns.

Donation/backing flows are implemented against Solana devnet for testing; on-chain settlement hardening is next.

---

## 2. Tech Stack (MVP Reality)

### Backend

- **Framework:** Laravel 12.x (PHP 8.4)
- **Routing:** Inertia-powered routes in `routes/web.php`:
  - `/` → `Welcome` (landing)
  - `/campaigns` → `Campaigns/Index` (browse + search)
  - `/campaigns/create` → `Campaigns/Create` (wizard)
  - `/campaigns/{campaign}` → `Campaigns/Show` (detail + funding)
  - `/dashboard` → `Dashboard/Index` (creator dashboard, `auth`)
  - `/dashboard/backer` → `Dashboard/Backer` (backer dashboard, `auth`)
- **Donation Endpoint:** `POST /campaigns/{campaign}/donations` handled by `DonationController@store`.
- **Database:** MySQL (e.g. `campaigns`, `donations` tables)
- **Auth:**
  - Laravel session auth triggered by wallet connect (nonce + signature flow).
  - Campaign creation endpoints remain public for prototyping, but redirect differently depending on auth (dashboard vs browse).
- **Solana / Web3:**
  - `attestto/solana-php-sdk` installed for future server-side Solana integration.

### Frontend

- **Framework:** React 19 via `@inertiajs/react` (Inertia SPA inside Laravel).
- **Bundler:** Vite 7 + `laravel-vite-plugin`.
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`).
- **UI Components:** Shadcn UI primitives:
  - `Button`, `Card`, `Input`, `Label`, `Sheet`, `DropdownMenu`, `Avatar`, `Progress`, `Table`, `Badge`, `Separator`, etc.
- **Icons:** `lucide-react`, `@radix-ui/react-icons`.
- **Layout:**
  - `Welcome.jsx`: marketing landing, Linkify-style sections, wallet CTA.
  - `Campaigns/Index.jsx`: campaign grid + demo state + search bar.
  - `Campaigns/Create.jsx`: standalone 3-step wizard with top nav + wallet button.
  - `Campaigns/Show.jsx`: detail view with funding stats + donation UI.
  - `Dashboard/Index.jsx` and `Dashboard/Backer.jsx`: early dashboards served after wallet auth.

### Web3 & Wallets

- **Core SDKs:**
  - `@solana/web3.js` – low-level Solana RPC + transaction building.
  - `@solana/spl-token` – token helpers for later SPL integration.
- **Wallet UX:**
  - `@reown/appkit` + `@reown/appkit-adapter-solana` – wallet-connect modal & adapters.
  - `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui`, `@solana/wallet-adapter-wallets` – wallet context, hooks, and default wallets.
- **Server SDK:**
  - `attestto/solana-php-sdk` – planned for on-chain verification and transaction indexing.

---

## 3. How the Pieces Interact

### 3.1 Request Flow (Inertia + Laravel + React)

1. **HTTP request** hits Laravel (e.g. `GET /campaigns`).
2. Laravel route calls `CampaignController@index`.
3. Controller loads Eloquent models (`Campaign`) and returns an Inertia response:
   - `Inertia::render('Campaigns/Index', ['campaigns' => $campaigns])`.
4. Inertia sends JSON to the browser; React renders `resources/js/Pages/Campaigns/Index.jsx`.
5. Frontend components use Shadcn UI + Tailwind classes for layout.

### 3.2 Campaign Creation Wizard

- **Step state** is kept in React (`step` in `CreateCampaign`).
- **Form state** is handled by Inertia’s `useForm` hook, which:
  - Tracks `data`, `errors`, and `processing`.
  - On `post('/campaigns')`, sends JSON via XHR with CSRF & Inertia headers.
- Laravel validates and creates a `campaign` row, then redirects to:
  - `/dashboard` when `Auth::check()` is true (wallet-authenticated creator).
  - `/campaigns` when the user is a guest.
- Inertia intercepts the redirect to update the SPA without a full page reload.

### 3.3 Wallet Connect & Auth (High Level)

- `AppKitProvider` configures Reown AppKit for Solana **devnet** with Phantom/Solflare adapters.
- `ConnectWallet.jsx` + `UserMenu.jsx`:
  - Launch the AppKit modal.
  - Detect connection state (`address`, `isConnected`).
  - Automatically call backend auth when a wallet connects but the Laravel session is missing.
  - After auth, replace the connect button with a profile dropdown (creator/backer dashboards + logout).
- Backend `WalletAuthController` exposes endpoints:
  - `POST /api/auth/wallet/nonce` – generate nonce + persist on the user.
  - `POST /api/auth/wallet/verify` – verify signed nonce (MVP placeholder) and `Auth::login` the wallet user.
- Authenticated users gain access to `/dashboard` + `/dashboard/backer`, and their wallet address becomes the `creator_wallet` when creating campaigns.

### 3.4 Donation Flow (MVP)

- Frontend `Campaigns/Show.jsx`:
  - Displays funding progress and accepts a SOL amount.
  - Builds a `SystemProgram.transfer` transaction using `@solana/web3.js` and the connected wallet provider.
  - Sends the transaction to Solana devnet and waits for confirmation.
  - Posts `{ amount_sol, transaction_signature, donor_wallet }` to `/campaigns/{campaign}/donations`.
- Backend `DonationController@store`:
  - Validates input, creates a `donations` row, and increments `campaign.current_amount_sol`.
  - Returns the refreshed campaign payload for UI updates.

---

## 4. Current MVP Features

- **Landing page (`/`)**
  - Linkify-styled hero with Thena branding.
  - Metrics strip and Problem/Solution/Features sections.
  - CTAs: Browse Campaigns, Start a Campaign, View demo campaign.

- **Browse campaigns (`/campaigns`)**
  - Real or demo campaigns with consistent card UI.
  - Client-side search + simple filter hooks for quick narrowing.
  - Cards show image, description, creator wallet snippet, SOL raised vs target, and days left.

- **Create campaign wizard (`/campaigns/create`)**
  - 3-step Typeform-style flow rendered on a standalone page with top nav + wallet button.
  - Validation before moving between steps.
  - Redirect depends on auth (dashboard vs browse page).

- **Campaign detail & donations (`/campaigns/{id}`)**
  - Full story, creator wallet snippet, progress bar, and funding stats.
  - Wallet-aware donation panel that triggers Solana devnet transfers and records donations on the backend.

- **Dashboards**
  - `/dashboard`: early creator dashboard (auth required) reached post-wallet-auth.
  - `/dashboard/backer`: placeholder dashboard for a backer’s pledges.

- **Routing & Auth tweaks**
  - Named `login` route stub to satisfy Laravel’s `auth` middleware.
  - Public `campaigns.create`/`store` routes for smoother prototyping.
  - Dashboard routes (`/dashboard`, `/dashboard/backer`) remain behind `auth`.

---

## 5. Next Steps

- **Wallet Modal Stability**
  - Verify AppKit configuration + projectId deliver Phantom/Solflare options in all environments.
- **Donation Flow Hardening**
  - Replace placeholder treasury address with campaign-specific PDAs and add richer transaction feedback.
- **Dashboard Data + CRUD**
  - Populate creator/backer dashboards with real stats, donations, and campaign management actions once wallet auth is persistent.
- **On-chain Settlement**
  - Use `@solana/web3.js` and `@solana/spl-token` for real SOL/SPL transfers.
  - Optionally: Anchor programs for campaign escrow & milestones.
