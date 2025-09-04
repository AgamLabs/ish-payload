'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact.config';
import { useContactForm } from '@/hooks/useContactForm';
import { ContactFormData } from '@/types/contact.types';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const { 
    register, 
    handleSubmit, 
    handleWhatsAppSubmit,
    state, 
    resetForm,
    formState,
    categories 
  } = useContactForm({
    onSuccess: () => {
      console.log('Form submitted successfully!');
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    }
  });

  const sendViaWhatsApp = () => {
    handleWhatsAppSubmit();
  };

  if (state.isSubmitted) {
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
            onClick={() => resetForm()}
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
              </h2>              <form onSubmit={handleSubmit} className="glossy-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('full-name', { 
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' },
                        maxLength: { value: 50, message: 'Name must be less than 50 characters' }
                      })}
                      type="text"
                      placeholder="Name*"
                      className="no-glossy w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                    {formState.errors['full-name'] && (
                      <p className="text-red-500 text-sm mt-1">{formState.errors['full-name']?.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      placeholder="E-mail*"
                      className="no-glossy w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                    {formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{formState.errors.email?.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <select
                    {...register('subject', { required: 'Please select a category' })}
                    className="no-glossy w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                  {formState.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.subject?.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
                    })}
                    placeholder="Tell us about your steel requirements, project specifications, or any questions about our products..."
                    rows={6}
                    className="no-glossy w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                  {formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{formState.errors.message?.message}</p>
                  )}
                </div>

                {state.error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {state.error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button 
                    type="submit" 
                    disabled={state.isSubmitting}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[48px]"
                    style={{ backgroundColor: '#00416A' }}
                  >
                    {state.isSubmitting ? (
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
