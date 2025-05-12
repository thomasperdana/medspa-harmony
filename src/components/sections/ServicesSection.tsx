// src/components/sections/ServicesSection.tsx
import type { Service } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Facial, Waves, Target, Sun, Bot, Stethoscope, Leaf, HandHeart } from 'lucide-react'; // Added more icons
import { Button } from '../ui/button';
import Link from 'next/link';

const servicesData: Service[] = [
  {
    id: '1',
    name: 'Revitalizing Facials',
    description: 'Customized facials to cleanse, exfoliate, and nourish your skin, leaving it radiant and refreshed.',
    longDescription: 'Our revitalizing facials are tailored to your specific skin type and concerns. Using premium products and advanced techniques, we address issues like acne, aging, dryness, and sensitivity. Each session includes a thorough skin analysis, deep cleansing, gentle exfoliation, a soothing massage, and a targeted mask. Emerge with a visibly smoother, brighter, and healthier complexion.',
    image: 'https://picsum.photos/400/300?random&facial',
    icon: Facial,
    dataAiHint: 'facial treatment',
  },
  {
    id: '2',
    name: 'Relaxing Massages',
    description: 'Soothe your body and mind with our therapeutic massages, designed to relieve tension and promote relaxation.',
    longDescription: 'Experience deep relaxation and muscle relief with our range of massage therapies. Choose from Swedish, deep tissue, hot stone, or aromatherapy massages, each performed by our skilled therapists. We focus on releasing tension, improving circulation, and promoting overall well-being. Let us melt away your stress and leave you feeling rejuvenated.',
    image: 'https://picsum.photos/400/300?random&massage',
    icon: HandHeart,
    dataAiHint: 'massage therapy',
  },
  {
    id: '3',
    name: 'Advanced Injectables',
    description: 'Smooth wrinkles and restore volume with our safe and effective injectable treatments, administered by experts.',
    longDescription: 'Turn back the clock with our advanced injectable treatments, including Botox and dermal fillers. Our experienced medical professionals provide natural-looking results, reducing fine lines, wrinkles, and restoring youthful volume to your face. We prioritize safety and precision, ensuring a comfortable experience and beautiful outcomes.',
    image: 'https://picsum.photos/400/300?random&injectable',
    icon: Stethoscope, // Using Stethoscope for a medical yet gentle feel
    dataAiHint: 'cosmetic injectable',
  },
  {
    id: '4',
    name: 'Body Contouring',
    description: 'Achieve your desired silhouette with our non-invasive body contouring procedures for a sculpted look.',
    longDescription: 'Shape and sculpt your body with our cutting-edge, non-invasive body contouring treatments. Target stubborn fat, tighten skin, and reduce cellulite without surgery or downtime. Our experts will create a personalized plan to help you achieve your body goals and boost your confidence.',
    image: 'https://picsum.photos/400/300?random&body-contouring',
    icon: Waves, // Waves can represent smooth body lines
    dataAiHint: 'body contouring',
  },
  {
    id: '5',
    name: 'Laser Hair Removal',
    description: 'Enjoy smooth, hair-free skin with our state-of-the-art laser hair removal technology for long-lasting results.',
    longDescription: 'Say goodbye to unwanted hair with our advanced laser hair removal services. Safe for various skin types, our technology offers effective and long-lasting hair reduction on virtually any part of the body. Our trained technicians ensure a comfortable and efficient treatment process.',
    image: 'https://picsum.photos/400/300?random&laser-hair-removal',
    icon: Target, 
    dataAiHint: 'laser hair removal',
  },
  {
    id: '6',
    name: 'Wellness Therapies',
    description: 'Enhance your overall well-being with our holistic wellness therapies, including IV drips and vitamin shots.',
    longDescription: 'Boost your vitality and well-being from the inside out with our specialized wellness therapies. We offer customized IV nutrient drips and vitamin injections to enhance energy, immunity, and overall health. Consult with our wellness experts to find the perfect therapy for your needs.',
    image: 'https://picsum.photos/400/300?random&wellness-therapy',
    icon: Leaf,
    dataAiHint: 'wellness iv therapy',
  },
];


function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <div className="relative w-full h-48">
        <Image
          src={service.image}
          alt={service.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={service.dataAiHint}
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-8 h-8 text-primary" />
          <CardTitle className="text-xl font-semibold text-foreground">{service.name}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-sm line-clamp-3 h-[3.75rem]">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        {/* In a real app, this would link to a service detail page */}
        <Button variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary/10" asChild>
            <Link href={`#appointment?service=${encodeURIComponent(service.name)}`}>Learn More & Book</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Our Premier Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indulge in a variety of treatments designed to enhance your natural beauty and promote holistic well-being.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Export servicesData for use in AppointmentForm
export { servicesData };
