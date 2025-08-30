/**
 * Contact Map Component
 * Embeds Google Maps for office location
 */

import React from 'react';
import { ContactMapProps } from '@/types/contact.types';

export const ContactMap: React.FC<ContactMapProps> = ({
  embedUrl,
  title,
  height = 'h-96',
}) => {
  return (
    <div className={`glossy-card rounded-xl overflow-hidden ${height}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full h-full"
      />
    </div>
  );
};

export default ContactMap;
