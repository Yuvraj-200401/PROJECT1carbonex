
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Database, Waves, Globe } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { OceanGuardian } from '@/components/ocean-guardian';


const stats = [
    { value: '1M+', label: 'CO₂ Verified (t)', description: 'Tons of CO₂ equivalent verified and tokenized through our platform.' },
    { value: '25+', label: 'NGOs Onboarded', description: 'Global conservation groups leveraging CARBO-NEX to fund their projects.' },
    { value: '99.8%', label: 'Verification Accuracy', description: 'AI-powered verification ensures the highest level of data integrity.' },
]

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CarboNexLogo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block text-foreground">
              CARBO-NEX
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
             <Button variant="ghost" asChild>
                <Link href="/login">Explore Marketplace</Link>
             </Button>
             <Link href="/login">
                <Button>
                  Launch App <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <WavyBackground
          className="max-w-7xl mx-auto pb-40"
          containerClassName="h-auto"
          backgroundFill="hsl(var(--background))"
          colors={['hsl(var(--primary))', 'hsl(var(--secondary))', '#818cf8', '#22d3ee']}
          waveOpacity={0.1}
          blur={10}
        >
            <section className="container py-20 md:py-32 grid grid-cols-1 items-center gap-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                     Tokenizing Blue Carbon
                  </h1>
                  <p className='font-headline text-5xl font-bold tracking-tighter md:text-7xl text-primary -mt-2'>with AI + Blockchain.</p>

                  <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                    CARBO-NEX is a decentralized platform for verifying and tokenizing blue carbon credits. We use AI and blockchain to bring transparency, liquidity, and trust to the carbon market.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                     <Link href="/login">
                        <Button size="lg" className="font-semibold text-lg px-8">
                            Get Started
                        </Button>
                     </Link>
                     <Link href="/login">
                        <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                             Explore Marketplace
                        </Button>
                     </Link>
                  </div>
                </motion.div>
            </section>
        </WavyBackground>

        {/* Stats Section */}
        <section className="container py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="p-6 border border-border rounded-lg bg-card text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold font-headline text-primary">{stat.value}</h2>
                        <h3 className="text-xl font-semibold mt-2">{stat.label}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{stat.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline">How It Works</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A seamless flow from verification to monetization, built on trust and transparency.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}>
                    <div className="p-4 bg-primary/10 rounded-full border-4 border-primary/20 text-primary">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mt-6">AI-Powered Verification</h3>
                    <p className="text-muted-foreground mt-2">Upload drone imagery and site data. Our AI models analyze and verify the data against NCCR guidelines, ensuring integrity and accuracy.</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}>
                     <div className="p-4 bg-primary/10 rounded-full border-4 border-primary/20 text-primary">
                        <Database size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mt-6">Tokenize Your Impact</h3>
                    <p className="text-muted-foreground mt-2">Once verified, your carbon credits are minted as unique tokens on the blockchain, creating a transparent and immutable record of your environmental impact.</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}>
                    <div className="p-4 bg-primary/10 rounded-full border-4 border-primary/20 text-primary">
                        <Waves size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mt-6">Liquid Marketplace</h3>
                    <p className="text-muted-foreground mt-2">List your tokenized credits on our open marketplace. Connect with buyers and investors to fund your conservation efforts and scale your impact.</p>
                </motion.div>
            </div>
        </section>

      </main>

       {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container py-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <CarboNexLogo className="h-6 w-6 text-primary" />
                <span className="font-bold">CARBO-NEX</span>
            </div>
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CARBO-NEX. All rights reserved.
            </p>
        </div>
      </footer>
      <OceanGuardian />
    </div>
  );
}
