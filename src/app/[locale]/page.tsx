// src/app/[locale]/page.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Database, Waves, ShieldCheck, Cpu, GitCompareArrows, LineChart, Users, Star, Mail, Phone, MapPin, Send } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useI18n } from '@/locales/client';
import { MainHeader } from '@/components/main-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


const stats = [
    { value: '99.8%', label: 'Verification Accuracy', description: 'AI-driven data validation' },
    { value: '1M+', label: 'Tonnes CO₂ Verified', description: 'Across global projects' },
    { value: '25+', label: 'NGOs Onboarded', description: 'Funding conservation efforts' },
    { value: '10x', label: 'Faster Liquidity', description: 'Compared to traditional markets' },
];

const features = [
    { icon: <ShieldCheck size={32} />, title: 'Immutable Registry', description: 'Blockchain-powered verification ensures every carbon credit is unique, traceable, and cannot be double-spent. Complete transparency from source to offset.' },
    { icon: <Cpu size={32} />, title: 'AI-Powered Verification', 'description': 'Our advanced AI analyzes satellite imagery, sensor data, and ecological models to verify carbon sequestration with unparalleled accuracy, reducing manual overhead.' },
    { icon: <GitCompareArrows size={32} />, title: 'Community Ecosystem', description: 'We provide tools for data collection with verified user engagement, transparent data validation, and government integration for a holistic approach.' }
]

const services = [
    { icon: <Database />, title: "Carbon Registry", description: "Secure, transparent ledger for all carbon assets." },
    { icon: <ShieldCheck />, title: "AI Verification", description: "Automated data validation with high accuracy." },
    { icon: <Waves />, title: "Marketplace", description: "A liquid market to trade tokenized carbon credits." },
    { icon: <LineChart />, title: "Analytics Dashboard", description: "Track, analyze, and report your environmental impact." },
    { icon: <Users />, title: "NGO Integration", description: "Onboard projects and connect with funders seamlessly." },
    { icon: <Star />, title: "Mobile App", description: "Manage and track assets on the go." }
]

const team = [
    { name: "John Doe", role: "Lead Blockchain Engineer" },
    { name: "Jane Smith", role: "AI & Climate Science Lead" },
    { name: "Peter Jones", role: "Head of Platform & Growth" },
    { name: "Sarah Williams", role: "Senior Frontend Engineer" },
    { name: "Mike Johnson", role: "Smart Contract Developer" },
    { name: "Emily Brown", role: "UX/UI Designer" }
]

export default function Home() {
  const t = useI18n();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MainHeader />
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
                     SAVE OUR PLANET
                  </h1>
                  <p className='font-headline text-5xl font-bold tracking-tighter md:text-7xl text-primary -mt-2'>{t('hero.title_2')}</p>

                  <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Empower your business and community with transparent, AI-driven carbon credit solutions. CARBO-NEX ensures every action for the planet is verified, impactful, and rewarded.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                     <Link href="/login">
                        <Button size="lg" className="font-semibold text-lg px-8">
                            Learn More
                        </Button>
                     </Link>
                     <Link href="/dashboard/marketplace">
                        <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                             Watch Demo
                        </Button>
                     </Link>
                  </div>
                </motion.div>
            </section>
        </WavyBackground>

        {/* Features Section */}
        <section className="container py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Revolutionary Technology</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Experience the future of environmental conservation with our cutting-edge platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="p-1 rounded-lg bg-gradient-to-b from-primary/20 to-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, scale: 1.02}}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                       <Card className="h-full glass-card border-0 p-8 text-center">
                            <div className="inline-block p-4 bg-primary/10 rounded-full border-2 border-primary/30 text-primary mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                       </Card>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="container py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Performance Metrics</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Real-time recognition showing CARBO-NEX's superior performance compared to traditional carbon credit systems.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="p-1 rounded-lg bg-gradient-to-b from-primary/10 to-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="glass-card border-0 p-6 text-center">
                            <h3 className="text-5xl font-bold font-headline text-primary">{stat.value}</h3>
                            <p className="text-lg font-semibold mt-2 text-foreground">{stat.label}</p>
                            <p className="text-sm text-muted-foreground">{stat.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* About Section */}
        <section className="container py-24">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}>
                     <h2 className="text-4xl font-bold font-headline mb-4">About CARBO-NEX</h2>
                     <p className="text-lg text-muted-foreground mb-4">We are revolutionizing carbon credit management through blockchain innovation and AI-powered verification.</p>
                     <h3 className="text-2xl font-bold text-primary mb-2">Our Mission</h3>
                     <p className="text-muted-foreground">CARBO-NEX is pioneering the future of environmental conservation by creating a transparent, liquid, and accessible platform for carbon credit management. We combine cutting-edge technology including AI and verifiable credentials to create a carbon credit that is verifiable, traceable, and impactful. We empower conservation communities, businesses, and governance participants to pursue their climate objectives with confidence. We believe that a decarbonized future can be achieved by embracing technology and market-driven solutions.</p>
                </motion.div>
                <motion.div
                    className="p-1 rounded-xl bg-gradient-to-br from-primary via-secondary to-background"
                     initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}>
                    <div className="bg-card p-8 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-center">Key Achievements</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3"><CheckCircle className="text-primary"/><span>99.8% AI Validation Accuracy</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="text-primary"/><span>100% Blockchain Traceability</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="text-primary"/><span>70% Lower Transaction Fees</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="text-primary"/><span>50% Faster Project Onboarding</span></li>
                        </ul>
                    </div>
                </motion.div>
             </div>
        </section>
        
        {/* Services Section */}
        <section className="container py-24">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Our Services</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We offer scalable solutions to credit management, powered by blockchain and AI.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {services.map((service) => (
                    <motion.div
                        key={service.title}
                        className="p-1 rounded-lg bg-gradient-to-b from-primary/10 to-transparent"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="glass-card h-full border-0 p-6">
                             <div className="p-3 inline-block bg-primary/10 text-primary rounded-md mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm">{service.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Team Section */}
        <section className="container py-24">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Blockbusters</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Meet the brilliant minds behind CarbonX, aspiring to win Google's AI hackathon 2024 and revolutionize carbon credit management.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {team.map((member) => (
                    <motion.div key={member.name}
                        className="p-1 rounded-lg bg-gradient-to-b from-secondary/10 to-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}>
                        <Card className="glass-card text-center border-0 p-6">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <span className="text-4xl font-bold">?</span>
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-secondary font-semibold">{member.role}</p>
                        </Card>
                    </motion.div>
                 ))}
            </div>
        </section>

        {/* Contact Section */}
        <section className="container py-24">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Get In Touch</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Ready to revolutionize your carbon credit management? Let's discuss how CarbonX can transform your environmental impact.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{duration: 0.5}}>
                    <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <Mail className="text-primary mt-1"/>
                            <div>
                                <h4 className="font-semibold">Email</h4>
                                <a href="mailto:info@carbonx.io" className="text-muted-foreground hover:text-primary">info@carbonx.io</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="text-primary mt-1"/>
                            <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <MapPin className="text-primary mt-1"/>
                            <div>
                                <h4 className="font-semibold">Location</h4>
                                <p className="text-muted-foreground">Virtual First, Global Impact</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                 <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{duration: 0.5}}>
                    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
                        <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
                        <form className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </div>
                             <Input type="email" placeholder="Email Address" />
                             <Input placeholder="Subject" />
                             <Textarea placeholder="Your message..." rows={5}/>
                             <Button type="submit" className="w-full" size="lg">
                                <Send className="mr-2"/> Send Message
                             </Button>
                        </form>
                    </Card>
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
       <OceanGuardian />
    </div>
  );
}
