import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string; // URL for placeholder
  icon: LucideIcon;
  dataAiHint: string; // For image placeholder services like Unsplash
}

export interface Testimonial {
  id:string;
  name: string;
  quote: string;
  avatar: string; // URL for placeholder
  title?: string; // e.g., "Satisfied Client"
  dataAiHint: string; // For image placeholder services
}
