
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, ShieldCheck, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [role, setRole] = useState('ngo');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = (selectedRole: string) => {
        setIsSubmitting(true);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('userRole', selectedRole);
                
                const userNames: { [key: string]: string } = {
                    ngo: 'Eco Ventures',
                    buyer: 'Green Buyer Co.',
                    verifier: 'NCCR Verifier',
                };

                localStorage.setItem('userName', userNames[selectedRole]);
                localStorage.setItem('userImage', `https://picsum.photos/seed/${userNames[selectedRole]}/40/40`);
            }

            toast({
                title: `Logged in as ${selectedRole.toUpperCase()}`,
                description: "Redirecting to your dashboard...",
            });
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Login Error: ", error);
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Could not simulate login.',
            });
            setIsSubmitting(false);
        }
    };

    const roles = [
        { id: 'ngo', name: 'NGO', description: 'Submit and manage carbon projects.', icon: <User /> },
        { id: 'buyer', name: 'Buyer', description: 'Purchase verified carbon credits.', icon: <ShoppingBag /> },
        { id: 'verifier', name: 'Verifier', description: 'Review and approve projects.', icon: <ShieldCheck /> },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
             <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full"
            >
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[10%] rounded-full bg-primary/10 opacity-50 blur-[120px]"></div>
                <div className="absolute bottom-0 right-auto left-0 top-auto h-[500px] w-[500px] translate-x-[20%] -translate-y-[10%] rounded-full bg-secondary/10 opacity-50 blur-[120px]"></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-lg bg-card/50 backdrop-blur-lg border-border/50">
                    <CardHeader className="text-center">
                        <motion.div 
                            className="mx-auto mb-4"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <CarboNexLogo className="size-12 text-primary" />
                        </motion.div>
                        <CardTitle className="font-headline text-3xl">
                            Welcome to CARBO-NEX
                        </CardTitle>
                        <CardDescription>
                        Select your role to access the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {roles.map((r, i) => (
                            <motion.button
                                key={r.id}
                                onClick={() => handleLogin(r.id)}
                                disabled={isSubmitting}
                                className={cn(
                                    "group w-full text-left p-4 rounded-lg border flex items-center gap-4 transition-all hover:bg-muted/50 hover:border-primary/50",
                                    role === r.id && "bg-muted ring-2 ring-primary border-primary"
                                )}
                                onMouseEnter={() => setRole(r.id)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                <div className="p-2 rounded-md bg-primary/10 text-primary">
                                    {r.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{r.name}</h3>
                                    <p className="text-sm text-muted-foreground">{r.description}</p>
                                </div>
                                <LogIn className="ml-auto size-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
             </motion.div>
        </div>
    )
}
