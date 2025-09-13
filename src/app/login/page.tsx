
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [role, setRole] = useState('ngo');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            if (typeof window !== 'undefined') {
                localStorage.setItem('userRole', role);
                // Storing user info to be used in the dashboard
                localStorage.setItem('userName', user.displayName || 'Anonymous');
                localStorage.setItem('userImage', user.photoURL || '');
            }

            toast({
                title: `Logged in as ${user.displayName}`,
                description: "Redirecting to your dashboard...",
            });
            router.push('/dashboard');
        } catch (error: any) {
            console.error("Google Sign-In Error: ", error);
            toast({
                variant: 'destructive',
                title: 'Authentication Failed',
                description: error.message,
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
                       Select your role and sign in to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
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
                        
                        <Button onClick={handleGoogleSignIn} disabled={isSubmitting} className="w-full">
                           <Chrome className="mr-2" />
                            {isSubmitting ? 'Signing in...' : 'Sign in with Google'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
