import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useAppKitAccount } from '@reown/appkit/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, User, LogOut, Wallet } from 'lucide-react';
import axios from 'axios';

export default function UserMenu({ auth }) {
    const { address, isConnected } = useAppKitAccount();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            router.visit('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!auth?.user || !isConnected) {
        return null;
    }

    const walletSnippet = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`}
                            alt={walletSnippet}
                        />
                        <AvatarFallback className="bg-orange-500 text-white">
                            {walletSnippet.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-white" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Connected</p>
                        <p className="text-xs leading-none text-zinc-400 flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            {walletSnippet}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                    className="cursor-pointer focus:bg-zinc-800 focus:text-white"
                    onClick={() => router.visit('/dashboard')}
                >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Creator Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="cursor-pointer focus:bg-zinc-800 focus:text-white"
                    onClick={() => router.visit('/dashboard/backer')}
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Backer Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                    className="cursor-pointer focus:bg-zinc-800 focus:text-white text-red-400"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
