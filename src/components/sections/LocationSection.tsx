// src/components/sections/LocationSection.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LocationSection() {
  const address = "123 Harmony Lane, Serenity City, SC 12345";
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Visit Our Sanctuary</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find us easily and step into a world of tranquility and rejuvenation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <Card className="shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="https://picsum.photos/800/500?random&map-location-abstract"
                  alt="Map indicating MedSpa Harmony location"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="map location"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <MapPin className="w-6 h-6" /> Our Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground">{address}</p>
                <Button variant="outline" asChild className="mt-4 border-primary text-primary hover:bg-primary/10">
                  <Link href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Clock className="w-5 h-5" /> Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground space-y-1">
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </CardContent>
              </Card>
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <Phone className="w-5 h-5" /> Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground space-y-1">
                  <p><a href="tel:+1234567890" className="hover:underline">(123) 456-7890</a></p>
                  <p><a href="mailto:contact@medspaharmony.com" className="hover:underline break-all">contact@medspaharmony.com</a></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
