
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { motion } from 'framer-motion';


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/50 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CarboNexLogo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              CARBO-NEX
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
             <Link href="/login">
                <Button>
                  Launch App <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <section className="container py-20 md:py-32 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl">
                Tokenizing Blue Carbon with AI + Blockchain.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                CARBO-NEX is a decentralized platform for verifying and tokenizing blue carbon credits. We use AI and blockchain to bring transparency, liquidity, and trust to the carbon market.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                 <Link href="/login">
                  <Button size="lg" className="font-semibold text-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
        </section>
      </main>
    </div>
  );
}
