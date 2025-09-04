'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact.config';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const sendViaWhatsApp = () => {
    const message = CONTACT_CONFIG.whatsapp.messageTemplate({
      name: formData.name,
      email: formData.email,
      category: formData.subject,
      message: formData.message
    });
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.company.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen glossy-bg flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 glossy-float bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold glossy-text mb-4">{CONTACT_CONFIG.ui.messages.success.title}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {CONTACT_CONFIG.ui.messages.success.description}
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="glossy-button px-6 py-3 bg-customBlue hover:bg-blue-700 text-white font-semibold rounded-3xl font-exo transition-colors backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen glossy-bg">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center bg-no-repeat glossy-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${CONTACT_CONFIG.ui.hero.backgroundImage}')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glossy-text-white">{CONTACT_CONFIG.ui.hero.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed glossy-text-white">
              {CONTACT_CONFIG.ui.hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="py-16 glossy-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold glossy-text mb-4">You can ask us questions !</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Get ready to buy our best steel products and materials. Connect with our experts 
              to find the perfect steel solutions for your construction and industrial projects.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
              {/* Chennai Office */}
              <div className="glossy-card p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <div className="glossy-float bg-green-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{CONTACT_CONFIG.offices.chennai.name}</h3>
                    <p className="text-gray-600 mb-1">{CONTACT_CONFIG.offices.chennai.address.line1}</p>
                    <p className="text-gray-600 mb-1">{CONTACT_CONFIG.offices.chennai.address.line2}</p>
                    <p className="text-gray-900 font-medium">{CONTACT_CONFIG.company.phone}</p>
                    <a href={`mailto:${CONTACT_CONFIG.company.email}`} className="text-green-600 hover:underline">{CONTACT_CONFIG.company.email}</a>
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
                    <a 
                      href={`https://wa.me/${CONTACT_CONFIG.company.whatsapp}?text=${encodeURIComponent(CONTACT_CONFIG.whatsapp.quickMessages.general)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glossy-button inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glossy-card rounded-xl overflow-hidden h-96">
              <iframe
                src={CONTACT_CONFIG.offices.chennai.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${CONTACT_CONFIG.offices.chennai.name} Location - Anna Nagar`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16 glossy-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className="glossy-card p-8 rounded-xl">
              <h2 className="text-3xl font-bold glossy-text mb-6">
                Fill Up The Form If You Have Any Question
              </h2>
              
              <form onSubmit={handleSubmit} className="glossy-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name*"
                      className="no-glossy w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                      required
                      minLength={CONTACT_CONFIG.form.validationRules.name.minLength}
                      maxLength={CONTACT_CONFIG.form.validationRules.name.maxLength}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="E-mail*"
                      className="no-glossy w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                      required
                      pattern={CONTACT_CONFIG.form.validationRules.email.pattern.source}
                    />
                  </div>
                </div>

                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="no-glossy w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">All Categories</option>
                    {CONTACT_CONFIG.productCategories.map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your steel requirements, project specifications, or any questions about our products..."
                    rows={6}
                    className="no-glossy w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                    minLength={CONTACT_CONFIG.form.validationRules.message.minLength}
                    maxLength={CONTACT_CONFIG.form.validationRules.message.maxLength}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[48px]"
                    style={{ backgroundColor: '#00416A' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {CONTACT_CONFIG.ui.messages.loading}
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={sendViaWhatsApp}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px]"
                    style={{ backgroundColor: '#16a34a' }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>

            {/* Image */}
            <div className="lg:order-first">
              <img 
                src={CONTACT_CONFIG.ui.images.steel} 
                alt="Steel Manufacturing and Industrial Materials" 
                className="glossy-image w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
