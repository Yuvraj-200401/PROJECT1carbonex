
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3 } from '@/lib/web3-mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { CarboNexLogo } from '@/components/icons';
import { ArrowRight, CheckCircle, ChevronRight, Copy, Droplets, Leaf, Send, Settings, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, icon, walletType }: { title: string; value: number | string; icon: React.ReactNode; walletType?: string; }) => {
    const formatAddress = (addr: string) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground">{title}</h3>
                <div className="text-primary">{icon}</div>
            </div>
            <div>
                {typeof value === 'number' ? (
                    <p className="text-4xl font-bold font-headline">{value.toLocaleString()}</p>
                ) : (
                    <p className="text-lg font-mono font-bold">{formatAddress(value)}</p>
                )}
                 {walletType && <p className="text-sm text-muted-foreground">{walletType}</p>}
            </div>
        </motion.div>
    )
};

const FloatingToken = ({ id, onComplete }: { id: any; onComplete: (id: any) => void }) => {
    return (
        <motion.div
            className="absolute text-primary"
            initial={{ x: Math.random() * 200 - 100, y: 50, opacity: 1, scale: 0 }}
            animate={{ y: -200, opacity: 0, scale: [0, 1, 1.5, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
            onAnimationComplete={() => onComplete(id)}
        >
            <Droplets className="size-8" />
        </motion.div>
    );
};


export default function DashboardRootPage() {
    const { toast } = useToast();
    const { wallet, balances, totalSupply, mintTokens, transferTokens, transactionHistory, wallets } = useWeb3();
    
    const [mintAmount, setMintAmount] = useState(1000);
    const [isMinting, setIsMinting] = useState(false);
    
    const [transferAmount, setTransferAmount] = useState(100);
    const [transferTo, setTransferTo] = useState('');
    const [transferFrom, setTransferFrom] = useState(wallet?.address || '');

    const [floatingTokens, setFloatingTokens] = useState<any[]>([]);

    const handleMint = () => {
        setIsMinting(true);
        // Animate floating tokens
        const newTokens = Array.from({ length: 10 }, (_, i) => ({ id: Date.now() + i }));
        setFloatingTokens(current => [...current, ...newTokens]);

        setTimeout(() => {
            mintTokens(mintAmount);
            toast({
                title: "Mint Successful!",
                description: `${mintAmount.toLocaleString()} CARBO tokens were minted.`,
            });
            setIsMinting(false);
        }, 1500);
    };

     const removeToken = (id: any) => {
        setFloatingTokens(current => current.filter(t => t.id !== id));
    };

    const handleTransfer = () => {
        if (!transferTo || !transferFrom || transferAmount <= 0) {
            toast({ variant: 'destructive', title: "Transfer Failed", description: "Please fill all transfer fields correctly."});
            return;
        }

        const success = transferTokens(transferFrom, transferTo, transferAmount);
        if (success) {
            toast({
                title: "Transfer Successful!",
                description: `${transferAmount.toLocaleString()} CARBO sent to ${wallets.find(w => w.address === transferTo)?.type}`,
            });
            setTransferAmount(100);
            setTransferTo('');
        } else {
            toast({ variant: 'destructive', title: "Transfer Failed", description: "Insufficient funds."});
        }
    }
    
    const canMint = wallet?.type === 'Admin (NCCR)';

    const formatAddress = (addr: string) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : '';


  return (
    <div className="flex-1 animate-fade-in-up p-4 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className='flex items-center gap-4'>
                <CarboNexLogo className="h-10 w-10 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold font-headline">CARBO-NEX Dashboard</h1>
                    <p className="text-muted-foreground flex items-center gap-2">Connected as: 
                        <span className="font-semibold text-primary">{wallet?.type}</span>
                        <Copy className="size-3 cursor-pointer hover:text-foreground" onClick={() => navigator.clipboard.writeText(wallet?.address || '')} />
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost"><Settings className="mr-2"/> Settings</Button>
                <Button onClick={() => window.location.href = '/login'}>Disconnect</Button>
            </div>
        </header>

        <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Supply" value={totalSupply} icon={<Droplets />} />
                <StatCard title="Your Balance" value={balances[wallet?.address || ''] || 0} icon={<Leaf />} />
                <StatCard title="Community Rewards" value={balances[wallets.find(w=>w.type === 'Community')?.address || ''] || 0} icon={<Users />} />
                <StatCard title="Your Wallet Address" value={wallet?.address || ''} walletType={wallet?.type} icon={<CheckCircle />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Mint and Transfer */}
                     <Card className="glass-card">
                        <CardHeader><CardTitle className='font-headline'>Token Actions</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {/* Minting Card */}
                           <div className={cn("space-y-4", !canMint && "opacity-50 pointer-events-none")}>
                                <h3 className="font-semibold">Mint New Tokens</h3>
                                <div className="flex items-center gap-2 relative">
                                    <AnimatePresence>
                                        {floatingTokens.map(token => <FloatingToken key={token.id} id={token.id} onComplete={removeToken} />)}
                                    </AnimatePresence>
                                    <Input 
                                        type="number" 
                                        value={mintAmount} 
                                        onChange={e => setMintAmount(Number(e.target.value))}
                                        placeholder="Amount to mint"
                                        disabled={!canMint}
                                    />
                                    <Button onClick={handleMint} disabled={!canMint || isMinting}>
                                        {isMinting ? 'Minting...' : 'Mint'}
                                    </Button>
                                </div>
                                {!canMint && <p className="text-xs text-muted-foreground">Only Admin can mint tokens.</p>}
                           </div>
                           {/* Transfer Card */}
                           <div className="space-y-4">
                                <h3 className="font-semibold">Transfer Tokens</h3>
                                <div className="space-y-2">
                                     <Select value={transferFrom} onValueChange={setTransferFrom}>
                                        <SelectTrigger><SelectValue placeholder="From Wallet" /></SelectTrigger>
                                        <SelectContent className='glass-card'>
                                            {wallets.map(w => <SelectItem key={w.address} value={w.address}>{w.type} ({formatAddress(w.address)})</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select value={transferTo} onValueChange={setTransferTo}>
                                        <SelectTrigger><SelectValue placeholder="To Wallet" /></SelectTrigger>
                                        <SelectContent className='glass-card'>
                                            {wallets.map(w => <SelectItem key={w.address} value={w.address}>{w.type} ({formatAddress(w.address)})</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Input 
                                        type="number" 
                                        value={transferAmount} 
                                        onChange={e => setTransferAmount(Number(e.target.value))}
                                        placeholder="Amount to transfer"
                                    />
                                </div>
                                <Button onClick={handleTransfer} className="w-full"><Send className="mr-2"/>Transfer</Button>
                           </div>
                        </CardContent>
                    </Card>

                    {/* Marketplace Simulation */}
                     <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className='font-headline'>Marketplace</CardTitle>
                            <CardDescription>Purchase verified carbon credits.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                                <div>
                                    <p className="font-bold">Sulu Sea Seagrass Credits</p>
                                    <p className="text-sm text-muted-foreground">Available: {balances[wallets.find(w=>w.type === 'NGO')?.address || ''] || 0} CARBO</p>
                                </div>
                                <Button disabled={wallet?.type !== 'Buyer / Investor'}>Purchase</Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                
                {/* Transaction History */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className='font-headline'>Live Transaction History</CardTitle>
                        <CardDescription>Last 5 blockchain events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <AnimatePresence>
                            {transactionHistory.slice(0, 5).map((tx) => (
                                <motion.div 
                                    key={tx.id} 
                                    className="flex items-start gap-3 text-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="p-1.5 bg-primary/20 rounded-full mt-1">
                                        <ChevronRight className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{tx.description}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                            {transactionHistory.length === 0 && (
                                <p className="text-center text-muted-foreground">No transactions yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
