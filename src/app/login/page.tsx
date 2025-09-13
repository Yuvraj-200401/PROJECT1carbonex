
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, ShieldCheck, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg animate-fade-in-up bg-card/50 backdrop-blur-sm">
                 <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <CarboNexLogo className="size-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">
                        Join CARBO-NEX
                    </CardTitle>
                    <CardDescription>
                       Select your role to access the demo dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {roles.map((r) => (
                           <button 
                             key={r.id}
                             onClick={() => handleLogin(r.id)}
                             disabled={isSubmitting}
                             className={cn(
                                 "w-full text-left p-4 rounded-lg border flex items-center gap-4 transition-all hover:bg-muted/50",
                                 role === r.id && "bg-muted ring-2 ring-primary"
                              )}
                              onMouseEnter={() => setRole(r.id)}
                           >
                                <div className="p-2 rounded-md bg-primary/10 text-primary">
                                    {r.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{r.name}</h3>
                                    <p className="text-sm text-muted-foreground">{r.description}</p>
                                </div>
                                <LogIn className="ml-auto size-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                           </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
