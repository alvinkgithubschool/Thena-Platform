import React, { useState, useEffect } from 'react';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import axios from 'axios';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Wallet, Loader2 } from 'lucide-react';
import UserMenu from './UserMenu';

export default function ConnectWallet() {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('solana');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        // If wallet is connected but user is not logged in (Laravel auth), start auth flow
        if (isConnected && address && !auth?.user) {
            authenticate();
        } 
        // If wallet connected AND user logged in, redirect to dashboard if on welcome page
        else if (isConnected && address && auth?.user && window.location.pathname === '/') {
            router.visit('/dashboard');
        }
    }, [isConnected, address, auth]);

    const authenticate = async () => {
        if (!walletProvider) return;
        setIsAuthenticating(true);

        try {
            const walletAddress = address;
            const { data: { nonce } } = await axios.post('/api/auth/wallet/nonce', {
                wallet_address: walletAddress
            });

            const message = new TextEncoder().encode(
                `Sign this message to authenticate with Thena.\nNonce: ${nonce}`
            );

            // AppKit Solana provider exposes standard adapter methods
            const signature = await walletProvider.signMessage(message);
            const signatureBase64 = btoa(String.fromCharCode(...signature));

            await axios.post('/api/auth/wallet/verify', {
                wallet_address: walletAddress,
                signature: signatureBase64,
            });

            // Reload using Inertia to refresh auth state and redirect
            router.visit('/dashboard');

        } catch (error) {
            console.error("Authentication failed", error);
            // We might want to disconnect here if auth fails, but AppKit manages connection state.
        } finally {
            setIsAuthenticating(false);
        }
    };

    // Show UserMenu if wallet connected AND user authenticated
    if (isConnected && address && auth?.user) {
        return <UserMenu auth={auth} />;
    }

    // Show authenticating state if wallet connected but not yet authenticated
    if (isConnected && address && !auth?.user && isAuthenticating) {
        return (
            <Button 
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-100 gap-2"
                disabled
            >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Authenticating...</span>
            </Button>
        );
    }

    return (
        <Button 
            onClick={() => open()} 
            variant="default"
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
        >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
        </Button>
    );
}
