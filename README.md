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
*   **Campaign Creation:** Launch new crowdfunding campaigns with targets and deadlines.
*   **Donations:** (In Progress) Contribute SOL to campaigns.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
