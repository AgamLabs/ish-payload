'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { getClientSideURL } from '@/utilities/getURL';

type ContactFormData = {
  'full-name': string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formId, setFormId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  // Fetch the contact form ID on component mount
  useEffect(() => {
    const fetchFormId = async () => {
      try {
        const response = await fetch(`${getClientSideURL()}/api/forms?where[title][equals]=Contact`);
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          setFormId(data.docs[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch form ID:', error);
      }
    };
    
    fetchFormId();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!formId) {
      setError('Form not ready. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert form data to the format expected by PayloadCMS
      const submissionData = Object.entries(data).map(([field, value]) => ({
        field,
        value,
      }));

      const response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendViaWhatsApp = (data: ContactFormData) => {
    const message = `
Hello! I have a steel inquiry:

Name: ${data['full-name']}
Email: ${data.email}
Category: ${data.subject || 'General Inquiry'}
Message: ${data.message}

Please get back to me. Thank you!
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/914426182020?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen glossy-bg flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 glossy-float bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold glossy-text mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="glossy-button px-6 py-3 bg-customBlue hover:bg-customBlue/90 text-white font-semibold rounded-3xl font-exo transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl [&>*]:text-white"
            style={{ color: 'white', backgroundColor: '#00416A' }}
          >
            <span className="text-white">Send Another Message</span>
          </Button>
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
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1565728744382-61accd4aa148?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glossy-text-white">Ask Us Question</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed glossy-text-white">
              Have questions about our premium steel products and services? We're here to help you find the perfect 
              steel solutions for your construction and industrial needs.
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Chennai Office</h3>
                    <p className="text-gray-600 mb-1">AC 5, 2nd Ave, AC Block, Anna Nagar,</p>
                    <p className="text-gray-600 mb-1">Chennai, Tamil Nadu 600040</p>
                    <p className="text-gray-900 font-medium">+91 44 2618 2020</p>
                    <a href="mailto:info@ishsteel.com" className="text-green-600 hover:underline">info@ishsteel.com</a>
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
                      href="https://wa.me/914426182020?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20steel%20products."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glossy-button inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl [&>*]:text-white"
                      style={{ color: 'white', backgroundColor: '#059669' }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 text-white" />
                      <span className="text-white">Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glossy-card rounded-xl overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8515207778706!2d80.22098931482195!3d13.085170990778887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265f1b8a5b3a3%3A0x8b5b1b0b5b1b5b1b!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chennai Office Location - Anna Nagar"
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
              
              <form onSubmit={handleSubmit(onSubmit)} className="glossy-form">
                {error && (
                  <div className="glossy-card bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('full-name', { required: 'Name is required' })}
                      placeholder="Name*"
                      className="no-glossy h-12 border-gray-300 rounded-lg"
                    />
                    {errors['full-name'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['full-name'].message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S[^\s@]*@\S+$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      placeholder="E-mail*"
                      className="no-glossy h-12 border-gray-300 rounded-lg"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <select 
                    {...register('subject')}
                    className="no-glossy w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="structural-steel">Structural Steel</option>
                    <option value="reinforcement-bars">Reinforcement Bars</option>
                    <option value="steel-sheets">Steel Sheets & Plates</option>
                    <option value="pipes-tubes">Pipes & Tubes</option>
                    <option value="custom-fabrication">Custom Fabrication</option>
                    <option value="bulk-orders">Bulk Orders</option>
                    <option value="technical-support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <Textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Tell us about your steel requirements, project specifications, or any questions about our products..."
                    rows={6}
                    className="no-glossy resize-none border-gray-300 rounded-lg"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="glossy-button px-6 py-3 bg-customBlue hover:bg-customBlue/90 text-white font-semibold rounded-3xl font-exo transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl disabled:opacity-50 [&>*]:text-white"
                    style={{ color: 'white', backgroundColor: '#00416A' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className="text-white">Sending Message</span>
                      </>
                    ) : (
                      <span className="text-white">Send Message</span>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleSubmit(sendViaWhatsApp)}
                    className="glossy-button px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-3xl font-exo transition-all duration-300 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl [&>*]:text-white"
                    style={{ color: 'white', backgroundColor: '#059669' }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-white" />
                    <span className="text-white">Send via WhatsApp</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Image */}
            <div className="lg:order-first">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Steel construction and industrial materials"
                className="glossy-image w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
