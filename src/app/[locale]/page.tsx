
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/client';
import { WavyBackground } from '@/components/ui/wavy-background';
import { motion } from 'framer-motion';
import { BarChart, Bot, Briefcase, ChevronRight, Database, Dna, FileText, Landmark, Mail, MapPin, Phone, Users } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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


export default function HomePage() {
    const t = useI18n();
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <WavyBackground>
                <main className="flex-grow flex items-center justify-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative z-10 space-y-6"
                    >
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            CarbonX
                        </h1>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline">
                            SAVE OUR PLANET
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Empower your business and community with transparent, AI-driven carbon credit solutions. CarbonX ensures every action for the planet is verified, impactful, and rewarded.
                        </p>
                        <div className="space-x-4">
                            <Button size="lg" onClick={() => router.push('/login')}>Learn More</Button>
                            <Button size="lg" variant="outline" onClick={() => router.push('/login')}>Watch Demo</Button>
                        </div>
                    </motion.div>
                </main>
            </WavyBackground>
            
            <Section title="Revolutionary Technology" subtitle="Experience the future of environmental conservation with our cutting-edge platform.">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard 
                        icon={<Database size={24} />}
                        title="Immutable Registry"
                        description="Blockchain-powered verification provides complete data immutability with end-to-end transparency."
                        link="#"
                    />
                     <FeatureCard 
                        icon={<Bot size={24} />}
                        title="AI-Powered Verification"
                        description="Real-time automated validation using satellite imagery, drone data, and advanced computer vision."
                        link="#"
                    />
                     <FeatureCard 
                        icon={<Users size={24} />}
                        title="Community Ecosystem"
                        description="Mobile-first data collection with gamified user engagement, hyper-tokenization and government integration."
                        link="#"
                    />
                </div>
            </Section>

            <Section title="Performance Metrics" subtitle="Real-time insights on CarbonX's superior performance compared to traditional carbon credit systems.">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<Dna size={32} />} value="99.9%" label="Accuracy Rate" description="AI Model Precision" />
                    <StatCard icon={<Briefcase size={32} />} value="1000x" label="Livelihood Impact" description="Better Remuneration" />
                    <StatCard icon={<BarChart size={32} />} value="90%" label="Cost Reduction" description="Operational Savings" />
                    <StatCard icon={<Landmark size={32} />} value="100%" label="Compliance" description="Govt. Approved" />
                </div>
            </Section>

            <Section title="About CarbonX" subtitle="Revolutionizing carbon credit management through blockchain innovation and AI-powered verification.">
                 <div className="glass-card rounded-2xl p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                            <p className="text-muted-foreground mb-6">
                                CarbonX is pioneering the future of environmental conservation by creating a transparent, efficient, and accessible platform for carbon credit management. We integrate cutting-edge technologies including AI and blockchain to create more robust, verifiable, traceable, auditable, and reportable.
                            </p>
                             <p className="text-muted-foreground mb-6">
                                We empower conservationists, communities, businesses, and government to participate in the global carbon market with confidence, knowing their contributions are measured and accounted for.
                            </p>
                             <Button variant="link" className="p-0 text-primary">
                                Global Impact: Connecting Stakeholders Worldwide
                            </Button>
                        </div>
                        <div className="bg-primary/5 p-8 rounded-lg">
                             <h3 className="text-2xl font-bold text-foreground mb-4">Key Achievements</h3>
                             <ul className="space-y-4">
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>99.9% AI Validation Accuracy</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>10x Livelihood Improvement</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>90% Cost Reduction</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="text-primary" /><span>100% Compliance</span></li>
                             </ul>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Our Services" subtitle="We offer a scalable solution for carbon credit management powered by blockchain and AI.">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ServiceCard icon={<Database />} title="Carbon Registry" items={["Blockchain Based", "Decentralized", "Secure & Transparent"]} />
                    <ServiceCard icon={<Bot />} title="AI Verification" items={["AI/ML Driven", "Computer Vision", "Real-time Monitoring"]} />
                    <ServiceCard icon={<Landmark />} title="Marketplace" items={["Integrated with global markets", "Real-time settlement", "Open & Transparent"]} />
                    <ServiceCard icon={<BarChart />} title="Analytics Dashboard" items={["Real-time analytics", "Impact monitoring", "Custom reporting"]} />
                    <ServiceCard icon={<Users />} title="NGO Integration" items={["Easy Onboarding", "Project Management", "Fund Management"]} />
                    <ServiceCard icon={<Briefcase />} title="Mobile App" items={["Data Collection", "Community Engagement", "Gamification"]} />
                </div>
            </Section>
            
            <Section title="Blockbusters" subtitle="Meet the Indians behind CarbonX — applying to the Google India Hackathon 2024 with a solution for blue carbon credit management.">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {['Malay Raval', 'B Himanshu Raaa', 'Rivoj Parekh', 'Ben Patel', 'Tisha Sharma', 'Gayatri Bhamare'].map(name => (
                        <div key={name} className="glass-card text-center p-6 rounded-2xl">
                             <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary">?</span>
                             </div>
                             <h4 className="font-bold text-foreground">{name}</h4>
                             <p className="text-sm text-muted-foreground">Role Description</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Get In Touch" subtitle="Ready to revolutionize your carbon credit management? Let's discuss how CarbonX can transform your environmental impact.">
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
                        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} CarbonX Building the future of carbon credit management</p>
                    </div>
                     <p className="text-sm text-muted-foreground">Made for Google India Hackathon 2024</p>
                </div>
            </footer>
        </div>
    );
}


const Section = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
    <section className="container py-16 lg:py-24">
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

    