// src/components/shared/Footer.tsx
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <Sparkles className="w-6 h-6" />
              MedSpa Harmony
            </Link>
            <p className="text-sm text-muted-foreground">
              Your sanctuary for beauty, wellness, and rejuvenation. Experience transformative treatments in a serene environment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="#ai-recommender" className="hover:text-primary transition-colors">AI Recommendation</Link></li>
              <li><Link href="#appointment" className="hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link href="#location" className="hover:text-primary transition-colors">Find Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Harmony Lane, Serenity City, SC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@medspaharmony.com" className="hover:text-primary transition-colors">contact@medspaharmony.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} MedSpa Harmony. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
