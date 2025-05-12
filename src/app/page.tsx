// src/app/page.tsx
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AiRecommenderSection from '@/components/sections/AiRecommenderSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import LocationSection from '@/components/sections/LocationSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AiRecommenderSection />
        <TestimonialsSection />
        <AppointmentSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
