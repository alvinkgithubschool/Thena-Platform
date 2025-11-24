import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ConnectWallet from '@/components/ConnectWallet';
import { 
    Layers, 
    Wallet, 
    Lock, 
    LineChart, 
    Globe, 
    Workflow,
    Banknote,
    TrendingUp,
    ArrowRightLeft,
    Link as LinkIcon,
    Wand2,
    Globe2,
    CheckCircle2,
    XCircle,
    ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black font-sans text-zinc-100">
            <Head title="CreatorFund - Empower Creatives Globally" />

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-black/80 backdrop-blur-lg">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-xl">
                            🚀
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm uppercase tracking-[0.2em] text-zinc-500">Thena</span>
                            <span className="text-lg font-semibold tracking-tight">CreatorFund</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="#problem" className="hover:text-white transition-colors">Problem</a>
                        <a href="#solution" className="hover:text-white transition-colors">Solution</a>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline text-xs font-medium px-3 py-1 rounded-full border border-zinc-800 text-zinc-400 bg-zinc-900/60">
                            Built on Solana
                        </span>
                        <ConnectWallet />
                    </div>
                </div>
            </nav>

            <main className="pt-28 md:pt-32 pb-16">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    {/* HERO */}
                    <section className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 md:p-10 shadow-[0_0_120px_rgba(15,23,42,0.9)]">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
                            <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
                        </div>

                        <div className="relative z-10 grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-center">
                            {/* Hero copy */}
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-400 mb-5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Live prototype for Web3 creator funding
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                                    Fund the next wave
                                    <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                                        of internet-native creators.
                                    </span>
                                </h1>

                                <p className="text-sm md:text-base text-zinc-300 max-w-xl mb-6 leading-relaxed">
                                    Thena is a Solana-powered crowdfunding platform that lets you back African creatives with transparent,
                                    milestone-based funding and tokenized upside instead of one-off, opaque pledges.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                    <Link href="/campaigns">
                                        <Button
                                            size="lg"
                                            className="bg-white text-black hover:bg-zinc-100 text-sm md:text-base h-11 md:h-12 px-6 md:px-8 rounded-full w-full sm:w-auto"
                                        >
                                            Browse Campaigns
                                        </Button>
                                    </Link>
                                    <Link href="/campaigns/create">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-zinc-700 text-zinc-100 hover:bg-zinc-900 text-sm md:text-base h-11 md:h-12 px-6 md:px-8 rounded-full w-full sm:w-auto"
                                        >
                                            Start a Campaign
                                        </Button>
                                    </Link>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const el = document.getElementById('features');
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                    className="inline-flex items-center gap-2 text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors mb-5"
                                >
                                    <span>View demo campaign features</span>
                                    <ArrowRight className="w-3 h-3" />
                                </button>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        Wallet sign-in, no passwords
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        Smart-contract escrow
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        Tokenized equity for backers
                                    </div>
                                </div>
                            </div>

                            {/* Hero visual card */}
                            <div className="relative">
                                <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Live campaign</p>
                                            <p className="mt-1 text-sm font-medium">Afrofusion Studio Sessions</p>
                                        </div>
                                        <span className="rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-3 py-1">ON-CHAIN</span>
                                    </div>

                                    <div className="space-y-3 mb-5">
                                        <div className="flex justify-between text-xs text-zinc-400">
                                            <span>Raised</span>
                                            <span>Target</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-zinc-50">96.3 SOL</span>
                                            <span className="text-zinc-400">180 SOL</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                            <div className="h-full w-[52%] rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
                                            <span>147 backers</span>
                                            <span>9 days left</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 text-[11px]">
                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                                            <p className="text-zinc-500">Network</p>
                                            <p className="mt-1 text-xs font-semibold flex items-center gap-1">
                                                <Globe className="w-3 h-3" /> Solana
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                                            <p className="text-zinc-500">Milestone</p>
                                            <p className="mt-1 text-xs font-semibold">Studio-ready beta</p>
                                        </div>
                                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                                            <p className="text-zinc-500">Reward</p>
                                            <p className="mt-1 text-xs font-semibold">Tokenized royalties</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* METRICS STRIP */}
                    <section className="mt-6 grid gap-3 md:grid-cols-3 text-xs md:text-sm">
                        <button
                            type="button"
                            onClick={() => {
                                const el = document.getElementById('features');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="text-left flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 hover:border-zinc-500/70 hover:bg-zinc-900/80 transition-colors"
                        >
                            <Banknote className="w-5 h-5 text-emerald-400" />
                            <div>
                                <p className="font-medium text-zinc-100">Sub-cent transaction fees</p>
                                <p className="text-zinc-400">Powered by Solana's high-throughput blockchain.</p>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const el = document.getElementById('solution');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="text-left flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 hover:border-zinc-500/70 hover:bg-zinc-900/80 transition-colors"
                        >
                            <Wallet className="w-5 h-5 text-orange-400" />
                            <div>
                                <p className="font-medium text-zinc-100">Wallet-native access</p>
                                <p className="text-zinc-400">Phantom, Solflare & WalletConnect with AppKit.</p>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = '/campaigns';
                            }}
                            className="text-left flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 hover:border-zinc-500/70 hover:bg-zinc-900/80 transition-colors"
                        >
                            <LineChart className="w-5 h-5 text-indigo-400" />
                            <div>
                                <p className="font-medium text-zinc-100">Creator analytics</p>
                                <p className="text-zinc-400">Track backers, milestones, and token performance.</p>
                            </div>
                        </button>
                    </section>

                    {/* PROBLEM SECTION */}
                    <section id="problem" className="mt-14 md:mt-20">
                        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-3">The problem</p>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-zinc-50">
                                    Traditional funding locks out the next generation of creators.
                                </h2>
                                <p className="text-sm md:text-base text-zinc-200 mb-6 max-w-xl">
                                    Many professional creatives and artists—especially in emerging markets—run into dead ends when they
                                    try to raise capital. Gatekept banking, expensive payment rails, and opaque platforms limit who gets
                                    funded.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Exclusion from traditional finance for young creators without credit history",
                                        "High transaction fees and brutal FX losses on legacy payment rails",
                                        "Illiquid backer positions with no secondary market for support",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <XCircle className="w-4 h-4 mt-1 text-red-400" />
                                            <p className="text-xs md:text-sm text-zinc-300">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-zinc-700 bg-zinc-950/90 p-5 space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-emerald-400" />
                                    Why Web2 tools fall short
                                </h3>
                                <p className="text-xs text-zinc-300">
                                    Banks, card processors, and centralized crowdfunding platforms were not built for a global class of
                                    internet-native creators. They assume stable incomes, credit scores and borders that no longer fit how
                                    creativity spreads online.
                                </p>
                                <p className="text-xs text-zinc-400">
                                    Thena rethinks the stack: on-chain identity, programmable money, and transparent milestones instead of
                                    paperwork and opaque fees.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SOLUTION / ACCOMPLISHMENTS SECTION */}
                    <div className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent" />
                        <span>Solution</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-zinc-800 via-zinc-700 to-transparent" />
                    </div>

                    <section id="solution" className="mt-6 md:mt-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-3">Our approach</p>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-2">
                                    Web3 rails, creator-first product.
                                </h2>
                                <p className="text-sm md:text-base text-zinc-300 max-w-xl">
                                    Thena combines Solana, smart contracts, and lean creator tooling so every campaign can be funded,
                                    monitored, and rewarded on-chain.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 mb-10">
                            {[
                                {
                                    title: "Robust & secure tech stack",
                                    desc: "Solana + Laravel backend and smart contracts deliver sub-cent transaction costs and 65,000+ TPS throughput.",
                                },
                                {
                                    title: "On-chain legal clarity",
                                    desc: "Smart-contract escrow and milestone logic replace ad-hoc agreements and manual payouts.",
                                },
                                {
                                    title: "Ecosystem partnerships",
                                    desc: "Built with African creator communities and global backers to align incentives from day zero.",
                                },
                            ].map((card, i) => (
                                <div
                                    key={i}
                                    className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-5 shadow-xl"
                                >
                                    <div className="absolute inset-px rounded-2xl border border-white/5 pointer-events-none" />
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-3">0{i + 1}</p>
                                    <h3 className="text-sm font-semibold text-zinc-50 mb-3">{card.title}</h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-600/60 via-violet-600/70 to-purple-600/70 px-6 md:px-10 py-8 md:py-10 text-zinc-50 shadow-[0_0_80px_rgba(79,70,229,0.45)]">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                                <div className="max-w-md">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-3">What we unlock for creators & backers</h3>
                                    <p className="text-sm text-indigo-100">
                                        By moving funding, milestones, and rewards on-chain, Thena turns one-off pledges into programmable,
                                        transparent relationships between creators and their communities.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 text-xs">
                                    {[
                                        {
                                            icon: Banknote,
                                            title: "Global, low-cost fundraising",
                                            desc: "Crypto-native payments cut out multiple intermediaries so more capital reaches the project.",
                                        },
                                        {
                                            icon: TrendingUp,
                                            title: "Tokenized upside",
                                            desc: "Creators can issue tokens representing revenue share, perks, or governance rights.",
                                        },
                                        {
                                            icon: ArrowRightLeft,
                                            title: "Backer liquidity",
                                            desc: "Token positions can be traded, unlike traditional locked crowdfunding contributions.",
                                        },
                                        {
                                            icon: Globe2,
                                            title: "Borderless participation",
                                            desc: "Anyone with a wallet can support projects, regardless of geography or banking status.",
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="mt-0.5 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium mb-1">{item.title}</p>
                                                <p className="text-[11px] text-indigo-100/90 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FEATURES SECTION */}
                    <div className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent" />
                        <span>Features</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-zinc-800 via-zinc-700 to-transparent" />
                    </div>

                    <section id="features" className="mt-6 md:mt-10 mb-10 md:mb-14">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-3">Product surface</p>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 mb-2">
                                    Everything you need for on-chain campaigns.
                                </h2>
                                <p className="text-sm md:text-base text-zinc-400 max-w-xl">
                                    From wallet sign-in to milestone-based payouts, Thena ships the primitives needed to run
                                    transparent, Web3-native campaigns end to end.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    icon: Layers,
                                    title: "Campaign management",
                                    desc: "Launch campaigns with goals, milestones, and on-chain metadata. Track performance in real time.",
                                },
                                {
                                    icon: Wallet,
                                    title: "Wallet authentication",
                                    desc: "Let users sign in with Phantom, Solflare, and WalletConnect via AppKit. No passwords.",
                                },
                                {
                                    icon: Lock,
                                    title: "Smart-contract escrow",
                                    desc: "Hold funds in escrow and release progressively as milestones are met and verified.",
                                },
                                {
                                    icon: LineChart,
                                    title: "Real-time analytics",
                                    desc: "Dashboards for creators and backers: pledges, retention, milestone progress, and more.",
                                },
                                {
                                    icon: Globe,
                                    title: "Global reach",
                                    desc: "Accept SOL from anywhere in the world without traditional banking constraints.",
                                },
                                {
                                    icon: Workflow,
                                    title: "Milestone workflows",
                                    desc: "Model launch phases (Demo → Beta → Launch) directly in smart contracts and UI.",
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="relative rounded-2xl border border-zinc-700 bg-zinc-950/90 p-5 flex flex-col gap-3 hover:border-zinc-500/70 hover:-translate-y-0.5 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-xl bg-zinc-900 flex items-center justify-center text-indigo-400">
                                        <feature.icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-zinc-50">{feature.title}</h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/campaigns"
                            className="inline-flex items-center gap-2 text-[11px] font-medium text-zinc-300 hover:text-white transition-colors"
                        >
                            <span>Explore live campaigns</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <footer className="border-t border-zinc-900/80 pt-6 mt-6 mb-2 text-xs text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p>&copy; 2025 Thena Platform. Built on Solana.</p>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                <span>Solana devnet prototype</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" />
                                <span>Laravel · React · AppKit</span>
                            </span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
