import React from 'react';
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solanaDevnet } from "@reown/appkit/networks";
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694';

// 2. Create Solana Adapter with explicit wallets
const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
});

// 3. Create metadata
const metadata = {
    name: 'Thena',
    description: 'Decentralized Crowdfunding on Solana',
    url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// 4. Create modal with proper configuration
const modal = createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solanaDevnet],
    defaultNetwork: solanaDevnet,
    metadata,
    projectId,
    features: {
        analytics: false,
        email: false,
        socials: false,
        emailShowWallets: true,
    },
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#f97316',
        '--w3m-border-radius-master': '4px',
    },
    allowUnsupportedChain: false,
});

export function AppKitProvider({ children }) {
    return <>{children}</>;
}
