
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Database, Waves, Globe } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/locales/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const stats = [
    { value: '1M+', label: 'CO₂ Verified (t)', description: 'Tons of CO₂ equivalent verified and tokenized through our platform.' },
    { value: '25+', label: 'NGOs Onboarded', description: 'Global conservation groups leveraging CARBO-NEX to fund their projects.' },
    { value: '99.8%', label: 'Verification Accuracy', description: 'AI-powered verification ensures the highest level of data integrity.' },
]

export default function Home() {
    const t = useI18n();
    const changeLocale = useChangeLocale();
    const currentLocale = useCurrentLocale();

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
                <Link href="/login">{t('hero.marketplace')}</Link>
             </Button>
             <Link href="/login">
                <Button>
                  {t('hero.launchApp')} <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Globe className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Change language</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => changeLocale('en')}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLocale('es')}>
                        Español
                    </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
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
                     {t('hero.title1')}
                  </h1>
                  <p className='font-headline text-5xl font-bold tracking-tighter md:text-7xl text-primary -mt-2'>{t('hero.title2')}</p>

                  <p className="mt-6 text-lg text-primary max-w-3xl mx-auto">
                    {t('hero.subtitle')}
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                     <Link href="/login">
                        <Button size="lg" className="font-semibold text-lg px-8">
                            {t('hero.getStarted')}
                        </Button>
                     </Link>
                     <Link href="/login">
                        <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                             {t('hero.marketplace')}
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
                        <h3 className="text-xl font-semibold mt-2">{t(`stats.${index}.label` as any)}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{t(`stats.${index}.description` as any)}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline">{t('features.title')}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t('features.subtitle')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.items.0.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.items.0.description')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.items.1.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.items.1.description')}</p>
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
                    <h3 className="text-2xl font-bold mt-6">{t('features.items.2.title')}</h3>
                    <p className="text-muted-foreground mt-2">{t('features.items.2.description')}</p>
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
                {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
        </div>
      </footer>
    </div>
  );
}
