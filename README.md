# Thena Platform

**Thena** is a decentralized crowdfunding platform designed to empower creatives in Africa and around the globe. By leveraging the Solana blockchain, Thena facilitates transparent, borderless, and efficient funding for projects ranging from indie games to art installations.

![Thena Platform](https://placehold.co/1200x600/18181b/f97316?text=Thena+Platform)

## 🚀 Mission
To bridge the funding gap for creative talent in emerging markets by providing a trustless, global platform where creators can raise capital directly from a community of backers without the barriers of traditional finance.

## 🛠️ Tech Stack

**Backend:**
*   **Framework:** Laravel 11 (PHP 8.2+)
*   **Authentication:** Custom Wallet Auth (Ed25519 Signature Verification) + JWT/Session
*   **Database:** MySQL 8.0+

**Frontend:**
*   **Framework:** React 19 (via Inertia.js)
*   **Styling:** Tailwind CSS v4
*   **UI Library:** Shadcn UI (Radix primitives)
*   **Web3 Integration:** `@solana/web3.js`, `@solana/wallet-adapter-react`

**Blockchain:**
*   **Network:** Solana (Devnet for testing)
*   **Smart Contracts:** (Planned) Anchor Framework

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   **PHP** >= 8.2
*   **Composer**
*   **Node.js** >= 18
*   **MySQL** (Running locally or via Docker)
*   **Git**

## ⚙️ Installation & Setup

Follow these steps to set up the project in your preferred IDE (VS Code, Windsurf, PHPStorm).

### 1. Clone the Repository
```bash
git clone https://github.com/alvinkgithubschool/Thena-Platform.git
cd Thena-Platform
```

### 2. Install Backend Dependencies
```bash
composer install
```

### 3. Configure Environment
Copy the example environment file and configure your database credentials.
```bash
cp .env.example .env
```
Open `.env` and update the `DB_*` variables:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=thena
DB_USERNAME=root
DB_PASSWORD=your_password
```

Generate the application key:
```bash
php artisan key:generate
```

### 4. Run Migrations
Create the database tables (Users, Campaigns, Donations).
```bash
php artisan migrate
```

### 5. Install Frontend Dependencies
```bash
npm install
```

### 6. Start Development Servers
You will need two terminal windows running simultaneously:

**Terminal 1 (Laravel Server):**
```bash
php artisan serve
```

**Terminal 2 (Vite Development Server):**
```bash
npm run dev
```

### 7. Access the Application
Open your browser and navigate to: `http://localhost:8000`

## 🧪 Features

*   **Wallet Connection:** Connect Phantom or Solflare wallets.
*   **Authentication:** Sign-in with Solana (SIWS) - completely passwordless.
*   **Creator Dashboard:** Manage campaigns and track funding.
*   **Campaign Browsing:** Explore active campaigns on `/campaigns`, with demo campaigns shown when the database is empty.
*   **Campaign Creation Wizard:** Start a campaign via a 3-step flow on `/campaigns/create` (details → funding → review).
*   **Donations:** (In Progress) Contribute SOL to campaigns.

## 🧱 Architecture Overview

Thena is built as a **Laravel + Inertia + React** application:

- **Laravel (Backend):**
  - Handles routing, validation, database access, and wallet-auth APIs.
  - Key routes:
    - `/` → `Welcome` (landing page with hero, metrics, and CTAs).
    - `/campaigns` → `Campaigns/Index` (browse campaigns).
    - `/campaigns/create` → `Campaigns/Create` (multi-step wizard).
  - `CampaignController` exposes `index`, `create`, and `store` actions.

- **Inertia + React (Frontend):**
  - `@inertiajs/react` connects Laravel responses to React components in `resources/js/Pages`.
  - `useForm` is used for SPA-style forms (e.g. campaign wizard), posting JSON to Laravel and handling validation/errors without full reloads.

- **UI & Styling:**
  - Tailwind CSS v4 for utility-first styling.
  - Shadcn UI components (Button, Card, Input, Label, Sheet, Avatar, Progress, etc.) for consistent, accessible UI primitives.
  - `DashboardLayout.jsx` provides a responsive layout (sidebar + mobile sheet) for internal pages like the campaign wizard and dashboards.

## 🔌 Key Libraries & How They Interact

- **`@inertiajs/react` + Laravel Inertia:**
  - Laravel controllers return `Inertia::render(...)` responses.
  - The Inertia React adapter renders the corresponding JSX page and keeps URL + history in sync.

- **Shadcn UI + Radix + Tailwind:**
  - Shadcn components are imported from `@/components/ui/*` and styled with Tailwind classes.
  - Radix primitives (e.g. `@radix-ui/react-icons`) are used inside components like `Sheet` and `DropdownMenu`.

- **Solana & Wallets:**
  - `@solana/web3.js` & `@solana/spl-token` underpin transaction creation and token operations.
  - `@reown/appkit` + `@reown/appkit-adapter-solana` provide a wallet-connect modal for Phantom, Solflare, etc.
  - `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui`, and `@solana/wallet-adapter-wallets` supply wallet context/hooks for React.
  - Backend `WalletAuthController` pairs with these to implement SIWS-style login using Laravel sessions.

- **Solana PHP SDK:**
  - `attestto/solana-php-sdk` is available for server-side Solana operations (verifying signatures, indexing transactions, future on-chain logic).

Together, these pieces allow you to:

1. Render marketing and dashboard views with React + Shadcn on top of Laravel.
2. Connect a Solana wallet in the browser, sign messages, and authenticate to Laravel.
3. Create and browse crowdfunding campaigns, with donation flows to be layered on next.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
