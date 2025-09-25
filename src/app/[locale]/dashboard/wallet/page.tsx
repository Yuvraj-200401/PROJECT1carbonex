'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function WalletPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Wallet</h1>
                    <p className="text-muted-foreground">This is a placeholder for your wallet details.</p>
                </div>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>A detailed wallet interface with transaction history, portfolio analysis, and connection to external wallets will be available here.</p>
                </CardContent>
             </Card>
        </motion.div>
    );
}
