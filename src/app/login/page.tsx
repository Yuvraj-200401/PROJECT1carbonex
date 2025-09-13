
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [role, setRole] = useState('ngo');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = () => {
        setIsSubmitting(true);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('userRole', role);
                
                const userNames: { [key: string]: string } = {
                    ngo: 'Eco Ventures',
                    buyer: 'Green Buyer Co.',
                    verifier: 'NCCR Verifier',
                };

                localStorage.setItem('userName', userNames[role]);
                localStorage.setItem('userImage', `https://picsum.photos/seed/${userNames[role]}/40/40`);
            }

            toast({
                title: `Logged in as ${role.toUpperCase()}`,
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md animate-fade-in-up bg-card/50 backdrop-blur-sm">
                 <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <CarboNexLogo className="size-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">
                        Welcome to CARBO-NEX
                    </CardTitle>
                    <CardDescription>
                       Select your role to access the demo dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                         <div className="space-y-3">
                            <Label>I am a...</Label>
                            <RadioGroup defaultValue="ngo" onValueChange={setRole} className="grid grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ngo" id="r_ngo" />
                                    <Label htmlFor="r_ngo">NGO</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="buyer" id="r_buyer" />
                                    <Label htmlFor="r_buyer">Buyer</Label>
                                </div>
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="verifier" id="r_verifier" />
                                    <Label htmlFor="r_verifier">Verifier</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <Button onClick={handleLogin} disabled={isSubmitting} className="w-full">
                           <LogIn className="mr-2 size-4" />
                            {isSubmitting ? 'Loading...' : 'Access Demo Dashboard'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
