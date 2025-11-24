# Thena: Web3 Crowdfunding Platform (Solana + Laravel)

## 1. Project Identity
*   **Name:** Thena
*   **Mission:** A decentralized crowdfunding platform for creatives in Africa and globally, enabling transparent funding via Solana.
*   **Design Language:**
    *   **Theme:** Minimal, sleek, responsive.
    *   **Palette:** 
        *   Primary: Black (`#000000`), White (`#FFFFFF`), Gray (`#F3F4F6` to `#1F2937`)
        *   Accent: Red-Orange Gradient (e.g., `bg-gradient-to-r from-orange-500 to-red-600`)
    *   **Typography:** Sans-serif (Inter or Geist Sans).

## 2. Tech Stack Architecture

### Backend (API & Logic)
*   **Framework:** Laravel 12 (PHP 8.4+)
*   **Database:** MySQL 8.0+
*   **Authentication:** Laravel Sanctum (for SPA auth) + Custom Wallet Auth (Signature Verification)
*   **Solana Integration:** `attestto/solana-php-sdk` (for server-side verification/indexing)

### Frontend (UI & Interaction)
*   **Framework:** React 19 (via Laravel Inertia.js SPA inside Laravel)
*   **Styling:** Tailwind CSS v4+
*   **Component Library:** **shadcn/ui** (Radix UI + Tailwind)
*   **Icons:** Lucide React
*   **State Management:** React Context / TanStack Query

### Web3 & Blockchain
*   **Client SDK:** `@solana/web3.js`
*   **Wallet Connection:** `@walletconnect/solana-adapter` + `@solana/wallet-adapter-react` (standard for React)
*   **Smart Contracts:** Anchor Framework (Rust) - *To be deployed*
*   **Token Standard:** SPL Token

## 3. Development Phases

### Phase 1: Initialization & Scaffolding
*   Setup Laravel 11 project.
*   Configure Inertia.js + React + Tailwind CSS.
*   Initialize `shadcn/ui`.
*   Run the requested MCP init command: `pnpm dlx shadcn@latest mcp init --client windsurf`.

### Phase 2: Core Backend & Database
*   Design Database Schema:
    *   `users` (wallet_address, nonce, role)
    *   `campaigns` (title, description, target_amount, current_amount, creator_id, deadlines)
    *   `donations` (tx_hash, amount, donor_id, campaign_id)
    *   `milestones` (campaign_id, description, percentage, status)
*   Implement Wallet Authentication Flow (Sign-in with Ethereum/Solana style).

### Phase 3: Web3 Integration
*   [Done] Integrate Wallet Connect modal (Reown AppKit + Phantom/Solflare).
*   [Done] Implement "Create Campaign" (Store metadata in DB; redirect logic based on auth).
*   [In Progress] Implement "Donate" (Client-side devnet transaction -> Wallet signature -> Record in DB).
*   [Pending] Implement "Withdraw/Milestone" logic (On-chain Program).

### Phase 4: Frontend UI (Thena Design)
*   [Done] **Landing Page:** Sleek, dark-mode compatible, Red-Orange gradient hero section.
*   [Done] **Browse Page:** Grid of campaign cards with search and filtering.
*   [Done] **Campaign Detail:** Rich project view with funding panel and progress bar.
*   [In Progress] **Creator Dashboard:** Analytics, funding progress, milestone management.
*   [In Progress] **Backer Dashboard:** Portfolio of funded projects, NFT/Token rewards.

## 4. Required Tools & Libraries List

**Composer (PHP):**
```json
{
    "laravel/framework": "^11.0",
    "laravel/sanctum": "^4.0",
    "attestto/solana-php-sdk": "^1.0",
    "tymon/jwt-auth": "^2.1"
}
```

**NPM (Node):**
```json
{
    "react": "^18.2",
    "react-dom": "^18.2",
    "autoprefixer": "^10.4",
    "postcss": "^8.4",
    "tailwindcss": "^3.4",
    "shadcn-ui": "latest",
    "lucide-react": "^0.300",
    "@solana/web3.js": "^1.90",
    "@solana/wallet-adapter-react": "^0.15",
    "@solana/wallet-adapter-react-ui": "^0.9",
    "@solana/wallet-adapter-wallets": "^0.19",
    "@walletconnect/solana-adapter": "^1.0",
    "clsx": "^2.0",
    "tailwind-merge": "^2.0"
}
```

## 5. Template & UI Strategy
We will not use a monolithic "theme" but rather assemble **Shadcn UI Blocks** to ensure modularity and the specific "Thena" aesthetic.

### Resources to Use
*   **Dashboard Template:** [Shadcn Admin](https://github.com/satnaing/shadcn-admin) (Vite + React version). We will adapt this layout (Sidebar + Navbar) for the Inertia app.
*   **Landing Page Blocks:** [Shadcn Blocks](https://www.shadcn.io/blocks).
*   **Charts:** [Recharts](https://recharts.org/en-US/) (Standard for Shadcn).

### Component Strategy
#### 1. Landing Page
*   **Hero Section:** Centered sleek typography, "Red-Orange" gradient text, "Connect Wallet" CTA.
*   **Feature Grid:** 3-column layout using `Card` components.
*   **Stats Section:** Minimal counters (Total SOL Raised, Projects Funded).

#### 2. Dashboard (The "Note" Requirement)
We will strictly use **Shadcn Dashboard Blocks** for the internal views:
*   **Layout:** `Sidebar` (collapsible) + `Header` (Breadcrumbs + UserNav).
*   **Overview Tab:** 
    *   `Card` blocks for "Total Contributed", "Active Campaigns".
    *   `Overview` block (Bar Chart) for funding history.
    *   `RecentSales` block (adapted to "Recent Donations").
*   **Campaign Management:** `DataTable` with pagination, filtering, and row actions (Edit, Withdraw).
*   **Wallet:** `Card` with gradient background showing SOL balance and address.

## 6. Current Status (MVP)

- **Core Stack:** Laravel 12 + Inertia + React 19 + Tailwind v4 + Shadcn UI.
- **Wallet & Auth:**
    - Reown AppKit integrated for Solana devnet (Phantom/Solflare).
    - `ConnectWallet` + `UserMenu` manage auth state and profile dropdowns.
    - Backend `WalletAuthController` handles nonce/signature verification and session login.
- **Campaign Flows:**
    - **Browse:** `/campaigns` with search/filter.
    - **Create:** Standalone 3-step wizard at `/campaigns/create`. Authenticated creators get redirected to dashboard; guests to browse.
    - **Detail & Donate:** `/campaigns/{id}` with wallet-aware funding panel. Donations execute on Solana devnet and are recorded in `donations` table.
- **Dashboards:**
    - `/dashboard` (Creator) and `/dashboard/backer` (Backer) routes established behind auth.

## 7. Next Steps

1.  **Dashboard Data:** Populate creator/backer dashboards with real campaign and donation stats.
2.  **Smart Contracts:** Replace placeholder treasury transfers with PDA-based campaign escrow logic.
3.  **Milestones:** Add milestone tracking and release logic to the campaign detail page.
