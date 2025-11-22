import React from 'react';
import { Head } from '@inertiajs/react';
import ConnectWallet from '@/components/ConnectWallet';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
                <nav className="container mx-auto p-6 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tighter">
                        Thena<span className="text-orange-500">.</span>
                    </div>
                    <ConnectWallet />
                </nav>

                <main className="container mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 mb-8 backdrop-blur-xl">
                        <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                        Now Live on Solana Devnet
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6">
                        Fund the <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Future of Creativity</span> in Africa.
                    </h1>
                    
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        The first decentralized crowdfunding platform tailored for African creators. 
                        Transparent, borderless, and powered by Solana.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20">
                            Start a Campaign
                        </button>
                        <button className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium text-lg hover:bg-zinc-800 transition-colors">
                            Browse Projects
                        </button>
                    </div>
                </main>

                <footer className="border-t border-zinc-900 py-12 mt-20">
                    <div className="container mx-auto px-6 text-center text-zinc-600">
                        &copy; 2025 Thena Platform. Built on Solana.
                    </div>
                </footer>
            </div>
        </>
    );
}
