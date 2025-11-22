import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import { router, usePage } from '@inertiajs/react';

export default function ConnectWallet() {
    const { publicKey, signMessage, disconnect } = useWallet();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        // If wallet is connected but user is not logged in (Laravel auth), start auth flow
        if (publicKey && !auth?.user) {
            authenticate();
        } 
        // If wallet connected AND user logged in, redirect to dashboard if on welcome page
        else if (publicKey && auth?.user && window.location.pathname === '/') {
            router.visit('/dashboard');
        }
    }, [publicKey, auth]);

    const authenticate = async () => {
        if (!publicKey || !signMessage) return;
        setIsAuthenticating(true);

        try {
            const walletAddress = publicKey.toBase58();
            const { data: { nonce } } = await axios.post('/api/auth/wallet/nonce', {
                wallet_address: walletAddress
            });

            const message = new TextEncoder().encode(
                `Sign this message to authenticate with Thena.\nNonce: ${nonce}`
            );
            const signature = await signMessage(message);
            const signatureBase64 = btoa(String.fromCharCode(...signature));

            await axios.post('/api/auth/wallet/verify', {
                wallet_address: walletAddress,
                signature: signatureBase64,
            });

            // Reload using Inertia to refresh auth state and redirect
            router.visit('/dashboard');

        } catch (error) {
            console.error("Authentication failed", error);
            disconnect();
        } finally {
            setIsAuthenticating(false);
        }
    };

    return (
        <WalletMultiButton className="!bg-white !text-black !font-medium !rounded-lg hover:!bg-gray-200 !h-10 !px-4">
            {isAuthenticating ? 'Signing...' : 'Connect Wallet'}
        </WalletMultiButton>
    );
}
