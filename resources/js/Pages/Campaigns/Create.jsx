import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, CheckCircle2, ArrowLeft, Calendar, Coins, Type } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ConnectWallet from '@/components/ConnectWallet';

export default function CreateCampaign() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        target_amount_sol: '',
        deadline: '',
    });

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const nextStep = () => {
        if (step === 1 && (!data.title || !data.description)) return;
        if (step === 2 && (!data.target_amount_sol || !data.deadline)) return;
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/campaigns');
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
            <Head title="Create Campaign" />

            {/* Top navigation, aligned with browse page */}
            <nav className="container mx-auto p-6 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-md z-50">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Thena<span className="text-orange-500">.</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/campaigns" className="text-sm font-medium text-zinc-400 hover:text-white hidden sm:block">
                        Browse
                    </Link>
                    <ConnectWallet />
                </div>
            </nav>

            <main className="container mx-auto px-6 py-10 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white">Start a Campaign</h2>
                                <p className="text-zinc-400 mt-1">Bring your project to life on Solana.</p>
                            </div>
                            <div className="text-sm text-zinc-500">Step {step} of {totalSteps}</div>
                        </div>
                        <Progress value={progress} className="h-1 bg-zinc-800" indicatorClassName="bg-orange-500 transition-all duration-500" />
                    </div>

                    <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                    <form onSubmit={submit}>
                        {/* STEP 1: DETAILS */}
                        {step === 1 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Type className="w-5 h-5 text-orange-500" />
                                        Project Details
                                    </CardTitle>
                                    <CardDescription>Let's start with the basics. What are you building?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-zinc-200">Campaign Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="bg-zinc-950 border-zinc-800 text-white focus:ring-orange-500 text-lg py-6"
                                            placeholder="e.g. The Future of African Gaming"
                                            autoFocus
                                        />
                                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-zinc-200">Description</Label>
                                        <textarea
                                            id="description"
                                            rows="6"
                                            className="flex w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white resize-none"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            placeholder="Tell your story. What problem are you solving? How will you use the funds?"
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                </CardContent>
                            </>
                        )}

                        {/* STEP 2: FUNDING */}
                        {step === 2 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Coins className="w-5 h-5 text-orange-500" />
                                        Funding Goals
                                    </CardTitle>
                                    <CardDescription>How much do you need to make this happen?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="target" className="text-zinc-200">Target Amount (SOL)</Label>
                                        <div className="relative">
                                            <Input
                                                id="target"
                                                type="number"
                                                step="0.1"
                                                value={data.target_amount_sol}
                                                onChange={e => setData('target_amount_sol', e.target.value)}
                                                className="bg-zinc-950 border-zinc-800 text-white pl-12 text-lg py-6"
                                                placeholder="100.0"
                                                autoFocus
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">SOL</div>
                                        </div>
                                        {errors.target_amount_sol && <p className="text-sm text-red-500">{errors.target_amount_sol}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="deadline" className="text-zinc-200">Campaign Deadline</Label>
                                        <div className="relative">
                                            <Input
                                                id="deadline"
                                                type="date"
                                                value={data.deadline}
                                                onChange={e => setData('deadline', e.target.value)}
                                                className="bg-zinc-950 border-zinc-800 text-white pl-12 text-lg py-6"
                                            />
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                        </div>
                                        <p className="text-xs text-zinc-500">Campaigns usually run for 30-60 days.</p>
                                        {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
                                    </div>
                                </CardContent>
                            </>
                        )}

                        {/* STEP 3: REVIEW */}
                        {step === 3 && (
                            <>
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        Review & Launch
                                    </CardTitle>
                                    <CardDescription>You're almost there. Review your campaign details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-zinc-950 rounded-lg p-6 border border-zinc-800 space-y-4">
                                        <div>
                                            <h4 className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Campaign Title</h4>
                                            <p className="text-white text-lg font-medium mt-1">{data.title}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Target</h4>
                                            <p className="text-white text-lg font-medium mt-1">{data.target_amount_sol} SOL</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Deadline</h4>
                                            <p className="text-white text-lg font-medium mt-1">{data.deadline}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Description</h4>
                                            <p className="text-zinc-300 mt-1 line-clamp-3">{data.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </>
                        )}

                        <CardFooter className="flex justify-between pt-4 border-t border-zinc-800/50">
                            {step > 1 ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={prevStep}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                            ) : (
                                <div />
                            )}

                            {step < totalSteps ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-white text-black hover:bg-zinc-200"
                                    disabled={(step === 1 && (!data.title || !data.description)) || (step === 2 && (!data.target_amount_sol || !data.deadline))}
                                >
                                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={submit}
                                    disabled={processing}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8"
                                >
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Launch Campaign
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
                </div>
            </main>
        </div>
    );
}
