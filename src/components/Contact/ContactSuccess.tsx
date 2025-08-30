/**
 * Contact Success Component
 * Displays success message after form submission
 */

import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_CONFIG } from '@/config/contact.config';

interface ContactSuccessProps {
  onReset: () => void;
}

export const ContactSuccess: React.FC<ContactSuccessProps> = ({ onReset }) => {
  const { title, description } = CONTACT_CONFIG.ui.messages.success;

  return (
    <div className="min-h-screen glossy-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 glossy-float bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold glossy-text mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        <Button 
          onClick={onReset}
          className="glossy-button px-6 py-3 bg-customBlue hover:bg-customBlue/90 text-white font-semibold rounded-3xl font-exo transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl [&>*]:text-white"
          style={{ color: 'white', backgroundColor: '#00416A' }}
        >
          <span className="text-white">Send Another Message</span>
        </Button>
      </div>
    </div>
  );
};

export default ContactSuccess;
