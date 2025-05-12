// src/components/shared/Header.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X, Sparkles as SpaIcon } from 'lucide-react'; // Using SpaIcon alias for Sparkles

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#ai-recommender', label: 'AI Tool' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#appointment', label: 'Appointment' },
  { href: '#location', label: 'Location' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            <SpaIcon className="w-7 h-7" />
            MedSpa Harmony
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#appointment">Book Now</Link>
          </Button>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-primary" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        <SpaIcon className="w-6 h-6" />
                        MedSpa Harmony
                    </Link>
                    <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                            <X className="w-6 h-6 text-muted-foreground" />
                         </Button>
                    </SheetClose>
                </div>
                  
                  {navItems.map((item) => (
                    <SheetClose key={item.label} asChild>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href="#appointment" onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
