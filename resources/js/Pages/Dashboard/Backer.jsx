import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, TrendingUp } from 'lucide-react';
import ConnectWallet from '@/components/ConnectWallet';

export default function BackerDashboard() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Head title="Backer Dashboard" />

            {/* Top nav */}
            <nav className="container mx-auto p-6 flex justify-between items-center border-b border-zinc-900">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Thena<span className="text-orange-500">.</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/campaigns" className="text-sm font-medium text-zinc-400 hover:text-white">
                        Browse
                    </Link>
                    <ConnectWallet />
                </div>
            </nav>

            {/* Main content */}
            <main className="container mx-auto px-6 py-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Backer Dashboard</h1>
                            <p className="text-zinc-400 mt-1">Track campaigns you've supported</p>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline" className="border-zinc-700 text-zinc-100 hover:bg-zinc-800">
                                Switch to Creator
                            </Button>
                        </Link>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-zinc-400">Campaigns Backed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">0</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-zinc-400">Total Pledged</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">0 SOL</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-zinc-400">Active Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">0</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Empty state */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="py-16 text-center">
                            <Heart className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
                            <h3 className="text-lg font-medium text-zinc-300 mb-2">No campaigns backed yet</h3>
                            <p className="text-zinc-500 mb-6">Start supporting creators and building your portfolio</p>
                            <Link href="/campaigns">
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                    Browse Campaigns
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
