import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Cpu, Leaf, Zap } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-3d-landing');
const featureImage1 = PlaceHolderImages.find((img) => img.id === 'feature-1');
const featureImage2 = PlaceHolderImages.find((img) => img.id === 'feature-2');
const featureImage3 = PlaceHolderImages.find((img) => img.id === 'feature-3');


export default function Home() {
  const stats = [
    { value: '1M+', label: 'Tons CO2 Verified' },
    { value: '250+', label: 'Projects Funded' },
    { value: '$50M+', label: 'Value Transacted' },
    { value: '99.8%', label: 'Verification Accuracy' },
  ];

  const features = [
    {
      title: 'AI-Powered Verification',
      description: 'Our state-of-the-art AI analyzes satellite imagery, drone data, and in-situ measurements to provide unbiased, scientific-grade verification of carbon sequestration projects.',
      icon: <Cpu className="size-8 text-primary" />,
      image: featureImage1
    },
    {
      title: 'Tokenize Your Impact',
      description: 'Successfully verified carbon credits are minted as unique digital tokens (CARBOs) on a secure blockchain, creating a transparent and tradable asset for environmental impact.',
      icon: <Leaf className="size-8 text-primary" />,
      image: featureImage2
    },
    {
      title: 'Liquid Marketplace',
      description: 'Buy and sell CARBO tokens on our open marketplace. We connect project originators with corporations and individuals committed to offsetting their carbon footprint.',
      icon: <Zap className="size-8 text-primary" />,
      image: featureImage3
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CarboNexLogo className="h-6 w-6" />
            <span className="font-bold font-headline sm:inline-block">
              CARBO-NEX
            </span>
          </Link>
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            <Link href="#features">Features</Link>
            <Link href="#marketplace">Marketplace</Link>
            <Link href="#about">About</Link>
          </nav>
          <div className="flex items-center justify-end space-x-4">
             <Link href="/dashboard">
                <Button>
                  Launch App <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
           <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-full w-full bg-background"
          >
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(0,255,102,0.1)] opacity-50 blur-[80px]"></div>
          </div>
          <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="max-w-xl animate-fade-in-up">
              <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl">
                The Future of Carbon Credits.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                CARBO-NEX is a decentralized platform for verifying and tokenizing blue carbon credits. We use AI and blockchain to bring transparency, liquidity, and trust to the carbon market.
              </p>
              <div className="mt-8 flex gap-4">
                 <Link href="/dashboard">
                  <Button size="lg">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-64 w-full animate-fade-in-up [animation-delay:200ms] md:h-96">
                {heroImage && 
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="rounded-2xl object-cover shadow-2xl shadow-primary/10"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                }
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="animate-fade-in-up rounded-2xl border border-border/80 bg-card/50 p-6 text-center backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="font-headline text-4xl font-bold text-primary md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="font-headline text-4xl font-bold md:text-5xl">
                A Transparent Ecosystem
              </h2>
              <p className="mt-4 text-muted-foreground">
                From data submission to token trading, every step is verifiable and transparent.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="relative transform-gpu overflow-hidden border-border/80 bg-card/50 backdrop-blur-sm transition-transform hover:-translate-y-2 animate-fade-in-up"
                   style={{ animationDelay: `${index * 150}ms` }}
                >
                {feature.image && (
                  <div className="relative h-48 w-full">
                    <Image src={feature.image.imageUrl} alt={feature.image.description} fill className="object-cover" data-ai-hint={feature.image.imageHint} />
                     <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>
                )}
                  <CardHeader className="relative -mt-12">
                     <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <CarboNexLogo className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              © {new Date().getFullYear()} CARBO-NEX. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
