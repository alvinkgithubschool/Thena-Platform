import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Clock, Target, Wallet, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ConnectWallet from '@/components/ConnectWallet';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';

export default function Show({ campaign }) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('solana');
  const calculateProgress = (current, target) => {
    if (!target) return 0;
    const percent = (current / target) * 100;
    return Math.min(percent, 100);
  };

  const daysLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Ended';
  };

  const handleDonation = async () => {
    if (!isConnected || !walletProvider || !amount || parseFloat(amount) <= 0) {
      alert('Please connect your wallet and enter a valid amount.');
      return;
    }

    setIsProcessing(true);

    try {
      // Connect to Solana devnet
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      
      // For MVP: send SOL to a placeholder campaign treasury address (you can replace this with a real PDA later)
      const campaignTreasuryPublicKey = new PublicKey('11111111111111111111111111111111'); // Placeholder
      const fromPublicKey = new PublicKey(address);
      
      // Build transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: campaignTreasuryPublicKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;

      // Sign transaction via wallet
      const signedTransaction = await walletProvider.signTransaction(transaction);

      // Send transaction to the network
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature, 'confirmed');

      // Record donation on backend
      await axios.post(`/campaigns/${campaign.id}/donations`, {
        amount_sol: parseFloat(amount),
        transaction_signature: signature,
        donor_wallet: address,
      });

      // Reload page to show updated campaign data
      router.reload();
      alert(`Successfully donated ${amount} SOL! Transaction: ${signature}`);
    } catch (error) {
      console.error('Donation failed:', error);
      alert(`Donation failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Head title={campaign.title} />

      {/* Simple nav aligned with browse page */}
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

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="mb-6 flex items-center gap-3 text-sm text-zinc-500">
          <Link href="/campaigns" className="inline-flex items-center gap-2 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Back to campaigns
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.2fr] gap-8">
          {/* Left: story */}
          <Card className="bg-zinc-950 border-zinc-900">
            <div className="h-72 w-full bg-zinc-900 relative overflow-hidden rounded-t-lg">
              <img
                src={campaign.image_url || `https://placehold.co/800x450/18181b/f97316?text=${encodeURIComponent(campaign.title)}`}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-orange-500 font-medium">
                <Wallet className="w-3 h-3" />
                {campaign.creator_wallet
                  ? `${campaign.creator_wallet.substring(0, 4)}...${campaign.creator_wallet.substring(campaign.creator_wallet.length - 4)}`
                  : 'Creator wallet pending'}
              </div>
              <CardTitle className="text-2xl md:text-3xl">{campaign.title}</CardTitle>
              <CardDescription className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {campaign.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Right: funding panel */}
          <Card className="bg-zinc-950 border-zinc-900 h-fit sticky top-24">
            <CardHeader>
              <CardTitle>Back this project</CardTitle>
              <CardDescription>Fund this campaign on Solana. Donation flow is being wired up next.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-zinc-100">{campaign.current_amount_sol} SOL raised</span>
                  <span className="text-zinc-500">of {campaign.target_amount_sol} SOL goal</span>
                </div>
                <Progress
                  value={calculateProgress(campaign.current_amount_sol, campaign.target_amount_sol)}
                  className="h-2 bg-zinc-800"
                  indicatorClassName="bg-orange-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-zinc-500">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>{Math.round(calculateProgress(campaign.current_amount_sol, campaign.target_amount_sol))}% funded</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{daysLeft(campaign.deadline)}</span>
                </div>
              </div>

              {/* Donation amount input */}
              <div className="mt-4 space-y-3">
                <Label htmlFor="amount" className="text-zinc-200">Amount (SOL)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.1"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1.0"
                  className="bg-zinc-950 border-zinc-800 text-white"
                  disabled={!isConnected}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              {!isConnected ? (
                <div className="w-full space-y-2">
                  <p className="text-sm text-zinc-500 text-center">Connect your wallet to back this project</p>
                  <ConnectWallet />
                </div>
              ) : (
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium" 
                  onClick={handleDonation}
                  disabled={isProcessing || !amount || parseFloat(amount) <= 0}
                >
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessing ? 'Processing...' : `Back with ${amount || '0'} SOL`}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
