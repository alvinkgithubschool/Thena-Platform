import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    PlusCircle, 
    Wallet, 
    Settings, 
    LogOut, 
    Menu,
    X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({ children }) {
    const page = usePage();
    const auth = page.props?.auth;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [isOpen, setIsOpen] = useState(false);

    const NavItem = ({ href, icon: Icon, label, active }) => (
        <Link 
            href={href} 
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium
            ${active 
                ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </Link>
    );

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    Thena<span className="text-orange-500">.</span>
                </Link>
            </div>
            
            <div className="px-4 py-2">
                <div className="space-y-1">
                    <h4 className="mb-2 px-2 text-xs font-semibold tracking-tight text-zinc-500 uppercase">Platform</h4>
                    <NavItem href="/dashboard" icon={LayoutDashboard} label="Overview" active={currentPath.startsWith('/dashboard')} />
                    <NavItem href="/campaigns/create" icon={PlusCircle} label="Start Campaign" active={currentPath.startsWith('/campaigns/create')} />
                    <NavItem href="/campaigns" icon={Wallet} label="My Campaigns" active={currentPath.startsWith('/campaigns')} />
                </div>
                
                <Separator className="my-4 bg-zinc-800" />
                
                <div className="space-y-1">
                    <h4 className="mb-2 px-2 text-xs font-semibold tracking-tight text-zinc-500 uppercase">Settings</h4>
                    <NavItem href="/profile" icon={Settings} label="Profile" active={currentPath.startsWith('/profile')} />
                </div>
            </div>

            <div className="mt-auto p-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <Avatar className="h-9 w-9 border border-zinc-700">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${auth?.user?.wallet_address ?? 'thena-user'}`} />
                        <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">
                            {auth?.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                            {auth?.user?.wallet_address
                                ? `${auth.user.wallet_address.substring(0, 4)}...${auth.user.wallet_address.substring(auth.user.wallet_address.length - 4)}`
                                : 'Wallet not connected'}
                        </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500 selection:text-white">
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="text-xl font-bold text-white">
                    Thena<span className="text-orange-500">.</span>
                </Link>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-black border-r border-zinc-800 p-0 w-72">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex w-72 flex-col border-r border-zinc-800 bg-black">
                    <SidebarContent />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-4 md:p-8">
                    <div className="mx-auto max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
