/**
 * Contact Information Component
 * Displays company contact details and WhatsApp integration
 */

import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { ContactInfoProps } from '@/types/contact.types';

export const ContactInfo: React.FC<ContactInfoProps> = ({
  office,
  phone,
  email,
  whatsapp,
}) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello, I would like to inquire about your steel products.');
    const url = `https://wa.me/${whatsapp}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Office Information */}
      <div className="glossy-card p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="glossy-float bg-green-100 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {office.name}
            </h3>
            <p className="text-gray-600 mb-1">{office.address.line1}</p>
            <p className="text-gray-600 mb-1">{office.address.line2}</p>
            <p className="text-gray-900 font-medium">{phone}</p>
            <a 
              href={`mailto:${email}`} 
              className="text-green-600 hover:underline"
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact */}
      <div className="glossy-card p-6 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="glossy-float bg-green-100 p-3 rounded-full">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-3">Get instant support via WhatsApp</p>
            <button
              onClick={handleWhatsAppClick}
              className="glossy-button inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl [&>*]:text-white"
              style={{ color: 'white', backgroundColor: '#059669' }}
            >
              <MessageCircle className="w-4 h-4 mr-2 text-white" />
              <span className="text-white">Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
