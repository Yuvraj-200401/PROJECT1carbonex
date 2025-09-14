
'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { CarboNexLogo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ShoppingBag, Users, Building, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const roles = [
    { id: 'ngo', name: 'NGO/Comm', icon: <Building />, description: "Manage & tokenize carbon projects.", user: { name: 'Sulu Sea Conservation', email: 'contact@sulusea.org', role: 'NGO' } },
    { id: 'verifier', name: 'Verifier', icon: <ShieldCheck />, description: "Verify project data for NCCR.", user: { name: 'Admin Verifier', email: 'admin@nccr.gov', role: 'Verifier' } },
    { id: 'buyer', name: 'Buyer', icon: <ShoppingBag />, description: "Purchase & trade carbon credits.", user: { name: 'EcoCapital Inc.', email: 'trades@ecocapital.com', role: 'Buyer' } },
];

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleConnect = (role: typeof roles[0]) => {
        try {
          localStorage.setItem('demoUser', JSON.stringify(role.user));
        } catch (error) {
          console.error("Could not access local storage:", error);
          toast({
              variant: 'destructive',
              title: `Login Failed`,
              description: `Could not access local storage. Please enable it in your browser settings.`,
          });
          return;
        }
        
        toast({
            title: `Logged in as ${role.name}`,
            description: `Welcome, ${role.user.name}! Redirecting to your dashboard...`,
        });

        router.push('/dashboard');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-secondary/5 blur-3xl" />

            <div className="w-full max-w-4xl z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center"
                >
                    <motion.div 
                        className="inline-block mb-8"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <CarboNexLogo className="size-24 text-primary" />
                    </motion.div>

                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-foreground">
                        Welcome to <span className="text-primary">CARBO-NEX</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                        The future of transparent, verifiable, and liquid blue carbon markets.
                        <br/>
                        <span className='font-semibold text-foreground'>Select a demo persona to explore the platform.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roles.map((role, i) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        >
                            <button
                                onClick={() => handleConnect(role)}
                                className="group text-left p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-card/80 transition-all duration-300 w-full h-full flex flex-col justify-between bg-card/50 backdrop-blur-sm"
                            >
                                <div>
                                    <div className="text-primary mb-4 p-2 bg-primary/10 rounded-lg w-min">{role.icon}</div>
                                    <h3 className="font-semibold text-foreground text-xl">{role.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 h-12">{role.description}</p>
                                </div>
                                <span className="text-primary font-semibold mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore Dashboard <Leaf size={16}/>
                                </span>
                            </button>
                        </motion.div>
                    ))}
                </div>
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-12"
                 >
                    <Button variant="link" onClick={() => router.push('/')}>
                        Back to Landing Page
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}
