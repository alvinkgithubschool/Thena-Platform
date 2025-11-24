import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Wallet, Clock, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConnectWallet from '@/components/ConnectWallet';

export default function Index({ campaigns }) {
    // Helper to calculate percentage
    const calculateProgress = (current, target) => {
        if (!target) return 0;
        const percent = (current / target) * 100;
        return Math.min(percent, 100);
    };

    // Helper to format date
    const daysLeft = (deadline) => {
        const end = new Date(deadline);
        const now = new Date();
        const diff = end - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? `${days} days left` : 'Ended';
    };

    const [search, setSearch] = useState('');

    const demoCampaigns = [
        {
            id: 'demo-1',
            title: 'Afrofusion Studio Sessions',
            description: 'Fund studio time for an emerging Afrofusion artist recording their debut EP.',
            creator_wallet: 'DEMOwALLeT1234',
            current_amount_sol: 32.4,
            target_amount_sol: 80,
            deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
            image_url: 'https://placehold.co/600x400/18181b/f97316?text=Afrofusion+Sessions',
        },
        {
            id: 'demo-2',
            title: 'Indie Game Proto: Lagos Drift',
            description: 'A Solana-themed racing game built by a small indie studio in Lagos.',
            creator_wallet: 'DEMOwALLeT5678',
            current_amount_sol: 54.1,
            target_amount_sol: 120,
            deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
            image_url: 'https://placehold.co/600x400/18181b/facc15?text=Lagos+Drift',
        },
        {
            id: 'demo-3',
            title: 'Documentary: Creators on Chain',
            description: 'A short documentary following three African creators using Web3 for funding.',
            creator_wallet: 'DEMOwALLeT9012',
            current_amount_sol: 18.9,
            target_amount_sol: 60,
            deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9).toISOString(),
            image_url: 'https://placehold.co/600x400/18181b/22c55e?text=Creators+on+Chain',
        },
    ];

    const hasRealCampaigns = campaigns && campaigns.length > 0;

    const listToRender = useMemo(() => {
        const base = hasRealCampaigns ? campaigns : demoCampaigns;

        if (!search) return base;

        const query = search.toLowerCase();
        return base.filter((campaign) =>
            campaign.title.toLowerCase().includes(query) ||
            campaign.description.toLowerCase().includes(query)
        );
    }, [hasRealCampaigns, campaigns, demoCampaigns, search]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
            <Head title="Browse Campaigns" />

            {/* Navigation */}
            <nav className="container mx-auto p-6 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-md z-50">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Thena<span className="text-orange-500">.</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white hidden sm:block">
                        Dashboard
                    </Link>
                    <ConnectWallet />
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div className="space-y-3 w-full md:w-auto">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Explore Projects</h1>
                            <p className="text-zinc-400">Discover and fund the next wave of African creativity.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-xl">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or description"
                                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                    <Link href="/campaigns/create">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                            Start a Campaign
                        </Button>
                    </Link>
                </div>

                {!hasRealCampaigns && (
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="text-sm text-zinc-400">
                            Showing <span className="font-semibold text-zinc-200">demo campaigns</span> until real projects are launched.
                        </div>
                        <Link href="/campaigns/create">
                            <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                                Be the first to launch
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listToRender.map((campaign) => (
                        <Card key={campaign.id} className="bg-zinc-900 border-zinc-800 text-white flex flex-col h-full hover:border-zinc-700 transition-colors">
                                <div className="h-48 w-full bg-zinc-800 relative overflow-hidden rounded-t-lg">
                                    {/* Use placeholder if no image, or the stored image URL */}
                                    <img 
                                        src={campaign.image_url || `https://placehold.co/600x400/27272a/f97316?text=${encodeURIComponent(campaign.title)}`} 
                                        alt={campaign.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white border-none hover:bg-black/80">
                                        Gaming
                                    </Badge>
                                </div>
                                
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-xs text-orange-500 mb-2 font-medium">
                                        <Wallet className="w-3 h-3" />
                                        {campaign.creator_wallet.substring(0, 4)}...{campaign.creator_wallet.substring(campaign.creator_wallet.length - 4)}
                                    </div>
                                    <CardTitle className="line-clamp-1 text-xl">{campaign.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-zinc-400 mt-1">
                                        {campaign.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="mt-auto space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-zinc-300">{campaign.current_amount_sol} SOL</span>
                                            <span className="text-zinc-500">of {campaign.target_amount_sol} SOL</span>
                                        </div>
                                        <Progress 
                                            value={calculateProgress(campaign.current_amount_sol, campaign.target_amount_sol)} 
                                            className="h-2 bg-zinc-800" 
                                            indicatorClassName="bg-orange-500"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <Target className="w-4 h-4" />
                                            <span>{Math.round(calculateProgress(campaign.current_amount_sol, campaign.target_amount_sol))}%</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{daysLeft(campaign.deadline)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="pt-2">
                                    {hasRealCampaigns ? (
                                        <Link href={`/campaigns/${campaign.id}`} className="w-full">
                                            <Button className="w-full bg-zinc-100 text-black hover:bg-zinc-200 font-medium">
                                                Back this Project <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            disabled
                                            className="w-full bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-default"
                                        >
                                            Demo data • Connect wallet to launch
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
            </main>

            <footer className="border-t border-zinc-900 py-12 mt-20 bg-black">
                <div className="container mx-auto px-6 text-center text-zinc-600">
                    &copy; 2025 Thena Platform. Built on Solana.
                </div>
            </footer>
        </div>
    );
}
