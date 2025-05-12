// src/components/sections/HeroSection.tsx
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-accent/30 via-background to-background min-h-[calc(100vh-5rem)] flex items-center pt-20">
      <div className="absolute inset-0 opacity-20">
        {/* You can use a subtle pattern or a very light large SVG icon here */}
      </div>
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight mb-6">
              Discover Your Inner <span className="text-foreground">Harmony</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Experience personalized medspa treatments designed to rejuvenate your body, mind, and spirit. 
              Embrace a new level of confidence and well-being at MedSpa Harmony.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="#appointment">Request Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="#services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto md:max-w-none">
            <Image
              src="https://picsum.photos/600/600?random&spa-wellness"
              alt="Relaxing spa ambiance"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-2xl"
              data-ai-hint="spa wellness"
              priority
            />
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-50 blur-xl"></div>
             <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent rounded-full opacity-30 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
