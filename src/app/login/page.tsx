
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('ngo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle actual authentication here.
        // For the hackathon, we'll just store the role and redirect.
        if (typeof window !== 'undefined') {
            localStorage.setItem('userRole', role);
        }
        toast({
            title: `Logged in as ${role.toUpperCase()}`,
            description: "Redirecting to your dashboard...",
        });
        router.push('/dashboard');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md animate-fade-in-up bg-card/50 backdrop-blur-sm">
                 <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <CarboNexLogo className="size-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </CardTitle>
                    <CardDescription>
                        {isLogin ? 'Select your role to sign in to your dashboard.' : 'Sign up to tokenize your carbon assets.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" required />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required defaultValue="password" />
                        </div>

                        <div className="space-y-3">
                            <Label>I am a...</Label>
                            <RadioGroup defaultValue="ngo" onValueChange={setRole} className="flex space-x-4">
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
                        
                        <Button type="submit" className="w-full">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="px-1">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
