/**
 * Contact Hero Component
 * Reusable hero section for contact pages
 */

import React from 'react';
import { ContactHeroProps } from '@/types/contact.types';
import { CONTACT_CONFIG } from '@/config/contact.config';

export const ContactHero: React.FC<ContactHeroProps> = ({
  title = CONTACT_CONFIG.ui.hero.title,
  subtitle = CONTACT_CONFIG.ui.hero.subtitle,
  backgroundImage = CONTACT_CONFIG.ui.hero.backgroundImage,
}) => {
  return (
    <div 
      className="relative h-80 bg-cover bg-center bg-no-repeat glossy-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 glossy-text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed glossy-text-white">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
