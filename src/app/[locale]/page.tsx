
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Bot, BarChart, CheckCircle, Database, Users, TrendingUp, Shield, Layers, Package, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';

const FeatureCard = ({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
  >
    <div className="text-primary bg-primary/10 rounded-lg p-3 w-min mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const StatCard = ({ value, label, index }: { value: string, label: string, index: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="text-center"
    >
        <p className="text-4xl md:text-5xl font-bold text-primary tracking-tighter">{value}</p>
        <p className="text-muted-foreground mt-1">{label}</p>
    </motion.div>
);

export default function HomePage() {
    const t = useI18n();
    const router = useRouter();

    const features = [
        { icon: <CheckCircle/>, title: t('features.verification.title'), description: t('features.verification.description')},
        { icon: <Package/>, title: t('features.tokenize.title'), description: t('features.tokenize.description')},
        { icon: <TrendingUp/>, title: t('features.marketplace.title'), description: t('features.marketplace.description')},
    ]

    return (
        <div className="w-full">
            {/* Hero Section */}
            <WavyBackground containerClassName="h-screen">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                        {t('hero.title_1')}<br/> 
                        <span className="text-primary">{t('hero.title_2')}</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('hero.description')}
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button size="lg" onClick={() => router.push('/login')}>{t('hero.cta_get_started')} <ArrowRight/></Button>
                        <Button size="lg" variant="outline" onClick={() => router.push('/dashboard/marketplace')}>{t('hero.cta_explore')}</Button>
                    </div>
                </motion.div>
            </WavyBackground>

            {/* Stats Section */}
            <section className="container py-20 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <StatCard value="1.2M+" label={t('stats.co2')} index={0} />
                    <StatCard value="50+" label={t('stats.ngos')} index={1} />
                    <StatCard value="99.7%" label={t('stats.accuracy')} index={2} />
                </div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-sm text-muted-foreground mt-8 max-w-2xl mx-auto"
                >
                    {t('stats.co2_desc')} {t('stats.ngos_desc')} {t('stats.accuracy_desc')}
                </motion.p>
            </section>

             {/* How it Works Section */}
            <section id="features" className="container py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline">{t('features.title')}</h2>
                    <p className="mt-4 text-muted-foreground">{t('features.description')}</p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                   {features.map((feature, i) => (
                       <FeatureCard key={feature.title} {...feature} index={i}/>
                   ))}
                </div>
            </section>
        </div>
    );
}
