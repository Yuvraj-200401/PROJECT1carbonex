// src/app/[locale]/page.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Database, Waves, Globe } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useI18n } from '@/locales/client';

const stats = [
    { value: '1M+', labelKey: 'stats.co2' as const, descriptionKey: 'stats.co2_desc' as const },
    { value: '25+', labelKey: 'stats.ngos' as const, descriptionKey: 'stats.ngos_desc' as const },
    { value: '99.8%', labelKey: 'stats.accuracy' as const, descriptionKey: 'stats.accuracy_desc' as const },
]

export default function Home() {
  const t = useI18n();

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
                     {t('hero.title_1')}
                  </h1>
                  <p className='font-headline text-5xl font-bold tracking-tighter md:text-7xl text-primary -mt-2'>{t('hero.title_2')}</p>

                  <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                    {t('hero.description')}
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                     <Link href="/login">
                        <Button size="lg" className="font-semibold text-lg px-8">
                            {t('hero.cta_get_started')}
                        </Button>
                     </Link>
                     <Link href="/login">
                        <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                             {t('hero.cta_explore')}
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
                        key={stat.labelKey}
                        className="p-6 border border-border rounded-lg bg-card text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold font-headline text-primary">{stat.value}</h2>
                        <h3 className="text-xl font-semibold mt-2">{t(stat.labelKey)}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{t(stat.descriptionKey)}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline">{t('features.title')}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t('features.description')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.verification.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.verification.description')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.tokenize.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.tokenize.description')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.marketplace.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.marketplace.description')}</p>
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
                © {new Date().getFullYear()} CARBO-NEX. {t('footer.rights_reserved')}
            </p>
        </div>
      </footer>
    </div>
  );
}
