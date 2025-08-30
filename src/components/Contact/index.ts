/**
 * Contact Components Barrel Export
 * Centralized exports for all contact-related components
 */

export { ContactHero } from './ContactHero';
export { ContactInfo } from './ContactInfo';
export { ContactMap } from './ContactMap';
export { ContactForm } from './ContactFormSimple';
export { ContactSuccess } from './ContactSuccess';

// Re-export types for convenience
export type {
  ContactHeroProps,
  ContactInfoProps,
  ContactMapProps,
  ContactFormProps,
} from '@/types/contact.types';
