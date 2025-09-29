
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { I18nProviderClient, useI18n } from '@/locales/client';
import { motion } from 'framer-motion';
import { BarChart, Briefcase, ChevronRight, Database, Dna, Landmark, Mail, MapPin, Phone, Users, Bot } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarsBackground } from '@/components/ui/stars-background';
import React from 'react';

const StatCard = ({ icon, value, label, description }: { icon: React.ReactNode, value: string, label: string, description: string }) => (
    <motion.div 
        className="glass-card p-6 rounded-2xl flex flex-col items-center text-center"
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
    >
        <div className="text-primary mb-4">{icon}</div>
        <p className="text-4xl font-bold text-foreground">{value}</p>
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </motion.div>
);

const FeatureCard = ({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) => (
    <motion.div
      className="relative p-8 rounded-2xl overflow-hidden glass-card group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/10 blur-3xl" />
        
        <div className="relative z-10">
            <div className="mb-4 text-primary w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4 text-sm">{description}</p>
            <a href={link} className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:underline">
                Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
    </motion.div>
);

const ServiceCard = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) => (
    <div className="glass-card p-6 rounded-2xl h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground flex-grow">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


function HomePageContent() {
    const t = useI18n();
    const router = useRouter();
    
    const teamMembers = [
      { name: 'Priyanshu', role: 'Team Lead & AI Engineer' },
      { name: 'Yuvraj', role: 'Blockchain / Core Feature Developer' },
      { name: 'Vanshika', role: 'Designer & Presentation Specialist' },
      { name: 'Manan', role: 'Product Manager' },
      { name: 'Nishant', role: 'Backend Developer' },
      { name: 'Manmohan', role: 'Frontend Developer (UI/UX)' }
    ];

    return (
        <StarsBackground>
            <div className="flex flex-col min-h-screen text-foreground">
                <main id="home" className="flex-grow flex items-center justify-center text-center px-4 pt-24 pb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-10 space-y-6"
                    >
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Carbo-Nex
                        </h1>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline">
                            The Future of Carbon Credits is Here.
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Carbo-Nex is engineering a new paradigm for environmental assets. We fuse AI and Blockchain to create a carbon credit ecosystem that is transparent, liquid, and fundamentally trustworthy.
                        </p>
                        <div className="space-x-4">
                            <Button size="lg" onClick={() => router.push('/login')}>Learn More</Button>
                            <Button size="lg" variant="outline" onClick={() => router.push('/login')}>Watch Demo</Button>
                        </div>
                    </motion.div>
                </main>
                
                <Section id="features" title="Revolutionary Technology" subtitle="Experience the future of environmental conservation with our cutting-edge platform.">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Database size={24} />}
                            title="Immutable Registry"
                            description="Leverage the power of blockchain for a tamper-proof record of every carbon credit. End-to-end transparency is not a feature; it's the foundation."
                            link="#"
                        />
                        <FeatureCard 
                            icon={<Bot size={24} />}
                            title="AI-Powered Verification"
                            description="Our advanced AI analyzes satellite, drone, and field data in real-time, delivering unparalleled accuracy and automating the verification process."
                            link="#"
                        />
                        <FeatureCard 
                            icon={<Users size={24} />}
                            title="Community Ecosystem"
                            description="Engage communities and stakeholders with a gamified, mobile-first data collection system that democratizes participation in conservation."
                            link="#"
                        />
                    </div>
                </Section>

                <Section id="metrics" title="Performance Metrics" subtitle="Real-time insights into the quantifiable impact and efficiency of the Carbo-Nex platform.">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<Dna size={32} />} value="99.9%" label="Accuracy Rate" description="AI model precision in data verification." />
                        <StatCard icon={<Briefcase size={32} />} value="1000x" label="Livelihood Impact" description="Empowering local communities directly." />
                        <StatCard icon={<BarChart size={32} />} value="90%" label="Cost Reduction" description="Operational savings vs. traditional methods." />
                        <StatCard icon={<Landmark size={32} />} value="100%" label="Compliance" description="Adherence to global and national standards." />
                    </div>
                </Section>

                <Section id="about" title="About Carbo-Nex" subtitle="We are architects of a new environmental economy, built on truth and powered by technology.">
                    <div className="glass-card rounded-2xl p-8 lg:p-12">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                                <p className="text-muted-foreground mb-6">
                                    Our mission is to unlock the full potential of our planet's natural assets by building a transparent, liquid, and trustworthy market for carbon credits. We empower NGOs, corporations, and governments to take meaningful climate action with data-driven confidence.
                                </p>
                                <p className="text-muted-foreground mb-6">
                                   Carbo-Nex is more than a platform; it's a movement to rewire the economics of conservation, making it profitable to protect our planet.
                                </p>
                                <Button variant="link" className="p-0 text-primary">
                                    Join us in building a sustainable future.
                                </Button>
                            </div>
                            <div className="bg-primary/5 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Key Achievements</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>99.9% AI Validation Accuracy</span></li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>1000x Livelihood Improvement for Communities</span></li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>90% Reduction in Verification Costs</span></li>
                                    <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>100% Compliance with NCCR Standards</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section id="services" title="Our Services" subtitle="A comprehensive suite of tools to manage the entire lifecycle of carbon credits.">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ServiceCard icon={<Database />} title="Carbon Registry" items={["Decentralized & immutable record-keeping", "Full traceability from origin to retirement", "Built on secure blockchain technology"]} />
                        <ServiceCard icon={<Bot />} title="AI Verification" items={["Automated analysis of geospatial data", "Real-time monitoring and anomaly detection", "Drastically reduced verification times"]} />
                        <ServiceCard icon={<Landmark />} title="Marketplace" items={["Liquid and transparent trading environment", "Direct access for buyers and sellers", "Integrated with global carbon markets"]} />
                        <ServiceCard icon={<BarChart />} title="Analytics Dashboard" items={["Visualize your environmental impact", "Track project performance in real-time", "Generate auditable, custom reports"]} />
                        <ServiceCard icon={<Users />} title="NGO Integration" items={["Streamlined onboarding for new projects", "Tools for project and fund management", "Direct channel to funding and support"]} />
                        <ServiceCard icon={<Briefcase />} title="Mobile App" items={["Field data collection with ease", "Gamified community engagement tools", "Offline capabilities for remote areas"]} />
                    </div>
                </Section>
                
                <Section id="team" title="THE TEAM" subtitle="Meet the passionate innovators driving Carbo-Nex forward — blending AI, blockchain, and design to create a sustainable future.">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {teamMembers.map(member => (
                            <div key={member.name} className="glass-card text-center p-6 rounded-2xl">
                                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary">{member.name.charAt(0)}</span>
                                </div>
                                <h4 className="font-bold text-foreground">{member.name}</h4>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section id="contact" title="Get In Touch" subtitle="Ready to revolutionize your carbon credit management? Let's discuss how Carbo-Nex can transform your environmental impact.">
                    <div className="glass-card rounded-2xl p-8 lg:p-12">
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Mail className="text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Email</h4>
                                            <p className="text-muted-foreground">team@blockbusters.dev</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Phone</h4>
                                            <p className="text-muted-foreground">+91 12345 67890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Location</h4>
                                            <p className="text-muted-foreground">Ahmedabad, Gujarat, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <form className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input placeholder="First Name" />
                                        <Input placeholder="Last Name" />
                                    </div>
                                    <Input type="email" placeholder="Email" />
                                    <Input placeholder="Subject" />
                                    <Textarea placeholder="Type your message here." rows={5} />
                                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Section>
                
                <footer className="w-full py-8 border-t border-border/20">
                    <div className="container flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                        <div className="flex items-center gap-2">
                            <CarboNexLogo className="h-6 w-6 text-primary" />
                            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Carbo-Nex. Engineering a new environmental economy.</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Made for Google India Hackathon 2024</p>
                    </div>
                </footer>
            </div>
        </StarsBackground>
    );
}

export default function HomePage({ params }: { params: { locale: string } }) {
    const { locale } = params;
    return (
        <I18nProviderClient locale={locale}>
            <HomePageContent />
        </I18nProviderClient>
    );
}


const Section = ({ id, title, subtitle, children }: { id?: string, title: string, subtitle: string, children: React.ReactNode }) => (
    <section id={id} className="container py-16 lg:py-24">
        <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary mb-2">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
        </div>
        {children}
    </section>
);


const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);
