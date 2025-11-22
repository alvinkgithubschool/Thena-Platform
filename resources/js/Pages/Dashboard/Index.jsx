import React from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, Activity, ArrowUpRight } from 'lucide-react';

const data = [
    { name: 'Mon', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Tue', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Wed', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Thu', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Fri', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Sat', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Sun', total: Math.floor(Math.random() * 5000) + 1000 },
];

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Overview</h2>
                    <p className="text-zinc-400">Track your campaigns and contributions.</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw Funds
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                        <DollarSign className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245.5 SOL</div>
                        <p className="text-xs text-zinc-400">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Backers</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-zinc-400">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-zinc-400">2 Active, 1 Completed</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-zinc-400">Campaign #2 is nearly funded</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4 bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>Funding Activity</CardTitle>
                        <CardDescription>Daily SOL contributions over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="#888888" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                    <YAxis 
                                        stroke="#888888" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false} 
                                        tickFormatter={(value) => `$${value}`} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                                        cursor={{ fill: '#27272a' }}
                                    />
                                    <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>Recent Donations</CardTitle>
                        <CardDescription>Latest contributions to your campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">
                                            Wallet ...{Math.floor(1000 + Math.random() * 9000)}
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            Donated to "Indie Game 2025"
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-orange-500">
                                        +{Math.floor(Math.random() * 10)}.5 SOL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
