
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

    const handleConnect = (walletType: string) => {
        const selectedRole = roles.find(r => r.id === walletType);
        if (!selectedRole) return;

        connectWallet(walletType);
        
        toast({
            title: `Wallet Connected`,
            description: `You are now connected as: ${selectedRole.name}. Redirecting...`,
        });

        router.push('/dashboard');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full max-w-4xl">
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
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                        A decentralized platform for verifying and tokenizing blue carbon credits.
                        <br/>
                        <span className='font-semibold text-primary'>Select a demo wallet to begin.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role, i) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        >
                            <button
                                onClick={() => handleConnect(role.id)}
                                className="group text-left p-6 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all w-full h-full flex flex-col justify-between glass-card"
                            >
                                <div>
                                    <div className="text-primary mb-3">{role.icon}</div>
                                    <h3 className="font-semibold text-foreground text-lg">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
