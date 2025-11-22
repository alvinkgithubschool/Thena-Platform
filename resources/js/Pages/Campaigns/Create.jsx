import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CreateCampaign() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        target_amount_sol: '',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('campaigns.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Create Campaign" />
            
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Start a Campaign</h2>
                
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Campaign Details</CardTitle>
                        <CardDescription>Tell your story and define your funding goals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-zinc-200">Title</Label>
                                <Input 
                                    id="title" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="bg-zinc-950 border-zinc-800 text-white focus:ring-orange-500"
                                    placeholder="e.g. The Future of African Gaming"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-zinc-200">Description</Label>
                                <textarea 
                                    id="description"
                                    rows="5"
                                    className="flex w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Describe your project..."
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="target" className="text-zinc-200">Target Amount (SOL)</Label>
                                    <Input 
                                        id="target" 
                                        type="number" 
                                        step="0.1"
                                        value={data.target_amount_sol}
                                        onChange={e => setData('target_amount_sol', e.target.value)}
                                        className="bg-zinc-950 border-zinc-800 text-white"
                                        placeholder="100.0"
                                    />
                                    {errors.target_amount_sol && <p className="text-sm text-red-500">{errors.target_amount_sol}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deadline" className="text-zinc-200">Deadline</Label>
                                    <Input 
                                        id="deadline" 
                                        type="date" 
                                        value={data.deadline}
                                        onChange={e => setData('deadline', e.target.value)}
                                        className="bg-zinc-950 border-zinc-800 text-white"
                                    />
                                    {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button 
                            onClick={submit} 
                            disabled={processing}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium"
                        >
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Campaign
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </DashboardLayout>
    );
}
