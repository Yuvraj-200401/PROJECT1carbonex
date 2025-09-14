
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { User, ShieldCheck, ShoppingBag, Users, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/lib/web3-mock';

const roles = [
    { id: 'ngo', name: 'NGO Wallet', icon: <Building />, description: "Manage project credits" },
    { id: 'community', name: 'Community Wallet', icon: <Users />, description: "Receive rewards" },
    { id: 'buyer', name: 'Buyer / Investor Wallet', icon: <ShoppingBag />, description: "Purchase credits" },
    { id: 'admin', name: 'Admin (NCCR) Wallet', icon: <ShieldCheck />, description: "Verify and mint tokens" },
];

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { connectWallet } = useWeb3();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleConnect = (walletType: string) => {
        const selectedRole = roles.find(r => r.id === walletType);
        if (!selectedRole) return;

        connectWallet(walletType);
        
        toast({
            title: `Wallet Connected`,
            description: `You are now connected as: ${selectedRole.name}. Redirecting...`,
        });

        setIsDialogOpen(false);
        router.push('/dashboard');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center"
            >
                <motion.div 
                    className="inline-block mb-8"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <CarboNexLogo className="size-24 text-primary" />
                </motion.div>

                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                    Welcome to CARBO-NEX
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    A decentralized platform for verifying and tokenizing blue carbon credits.
                </p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <motion.div
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" className="text-lg font-semibold px-8 py-6 rounded-full shadow-lg shadow-primary/20">
                                Connect Wallet
                            </Button>
                        </motion.div>
                    </DialogTrigger>
                    <DialogContent className="glass-card sm:max-w-[480px]">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">Choose Your Wallet Persona</DialogTitle>
                            <DialogDescription>
                                Select a demo wallet to interact with the platform.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            {roles.map((role) => (
                                <button
                                key={role.id}
                                onClick={() => handleConnect(role.id)}
                                className="group text-left p-4 rounded-lg border-2 border-transparent hover:border-primary hover:bg-primary/10 transition-all"
                                >
                                    <div className="text-primary mb-2">{role.icon}</div>
                                    <h3 className="font-semibold text-foreground">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground">{role.description}</p>
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    )
}
