// src/components/sections/TestimonialsSection.tsx
import type { Testimonial } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah L.',
    title: 'Glowing Results',
    quote: "MedSpa Harmony transformed my skin! The revitalizing facial was incredible, and the staff made me feel so comfortable. I'm already planning my next visit.",
    avatar: 'https://picsum.photos/100/100?random&person1',
    dataAiHint: 'happy woman',
  },
  {
    id: '2',
    name: 'John B.',
    title: 'Stress-Free Experience',
    quote: "The deep tissue massage was exactly what I needed. Professional, relaxing, and truly therapeutic. The AI tool also helped me pick the right treatment initially!",
    avatar: 'https://picsum.photos/100/100?random&person2',
    dataAiHint: 'relaxed man',
  },
  {
    id: '3',
    name: 'Emily K.',
    title: 'Confidence Boost',
    quote: "I was nervous about injectables, but the team at MedSpa Harmony was so reassuring and knowledgeable. The results are subtle and natural. I feel amazing!",
    avatar: 'https://picsum.photos/100/100?random&person3',
    dataAiHint: 'confident person',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col rounded-lg bg-card">
      <CardContent className="p-6 flex-grow flex flex-col">
        <Quote className="w-8 h-8 text-primary mb-4 transform scale-x-[-1]" />
        <p className="text-muted-foreground italic mb-6 flex-grow">&quot;{testimonial.quote}&quot;</p>
        <div className="flex items-center mt-auto">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
            <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            {testimonial.title && <p className="text-sm text-primary">{testimonial.title}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Words of Harmony</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our delighted clients who have experienced the MedSpa Harmony difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
