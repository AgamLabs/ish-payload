/**
 * Contact Form Component
 * Simple contact form with inline styling for steel industry theme
 */

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    'full-name': '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setFormData({ 'full-name': '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const message = `Hello! I'd like to inquire about:\n\n` +
      `Name: ${formData['full-name']}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n` +
      `Message: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="glossy-card p-8 rounded-xl text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you soon.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="glossy-button px-6 py-2 rounded-lg"
          style={{ color: 'white' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="glossy-card p-8 rounded-xl">
      <h2 className="text-3xl font-bold glossy-text mb-6">
        Fill Up The Form If You Have Any Question
      </h2>
      
      <form onSubmit={handleSubmit} className="glossy-form">
        {/* Error Display */}
        {error && (
          <div className="glossy-card bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              value={formData['full-name']}
              onChange={handleInputChange}
              className="glossy-input w-full"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="glossy-input w-full"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="glossy-input w-full"
            required
          >
            <option value="">Select a subject</option>
            <option value="Steel Bars & Rods">Steel Bars & Rods</option>
            <option value="Structural Steel">Structural Steel</option>
            <option value="Steel Sheets & Plates">Steel Sheets & Plates</option>
            <option value="Custom Steel Solutions">Custom Steel Solutions</option>
            <option value="Bulk Orders">Bulk Orders</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Pricing Inquiry">Pricing Inquiry</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="glossy-input w-full resize-none"
            placeholder="Tell us about your steel requirements..."
            required
          ></textarea>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="glossy-button flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300"
            style={{ color: 'white' }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="glossy-button flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-green-600 hover:bg-green-700"
            style={{ color: 'white' }}
          >
            <MessageCircle className="w-5 h-5 mr-2 inline" />
            Send via WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

// Export with both names for compatibility
export const ContactFormSimple = ContactForm;
