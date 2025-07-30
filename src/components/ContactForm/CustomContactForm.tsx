'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { getClientSideURL } from '@/utilities/getURL';

type ContactFormData = {
  'full-name': string;
  email: string;
  subject: string;
  message: string;
};

interface CustomContactFormProps {
  showContactInfo?: boolean;
  compact?: boolean;
  className?: string;
}

export function CustomContactForm({ 
  showContactInfo = false, 
  compact = false,
  className = ""
}: CustomContactFormProps) {
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
        } else {
          // Fallback: try to get the first form
          const fallbackResponse = await fetch(`${getClientSideURL()}/api/forms?limit=1`);
          const fallbackData = await fallbackResponse.json();
          if (fallbackData.docs && fallbackData.docs.length > 0) {
            setFormId(fallbackData.docs[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch form ID:', error);
        // Use a hardcoded fallback ID
        setFormId('1');
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
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || 'Failed to submit form');
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`text-center ${className}`}>
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your message has been sent successfully. We'll get back to you soon.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid ${showContactInfo ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8 ${className}`}>
      {/* Contact Information - only show if requested */}
      {showContactInfo && (
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@ishsteel.com</p>
                  <p className="text-gray-600">sales@ishsteel.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Steel Industry Road<br />
                    Industrial District<br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact Form */}
      <div className={showContactInfo ? 'lg:col-span-2' : 'lg:col-span-1'}>
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name *</Label>
                  <Input
                    id="full-name"
                    {...register('full-name', { required: 'Full name is required' })}
                    placeholder="Your full name"
                    className={compact ? "h-10" : "h-12"}
                  />
                  {errors['full-name'] && (
                    <p className="text-red-500 text-sm">{errors['full-name'].message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S[^\s@]*@\S+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    placeholder="your.email@example.com"
                    className={compact ? "h-10" : "h-12"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  {...register('subject')}
                  placeholder="What is this regarding?"
                  className={compact ? "h-10" : "h-12"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell us about your steel requirements or any questions you have..."
                  rows={compact ? 4 : 6}
                  className="resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !formId}
                className={`w-full md:w-auto ${compact ? 'h-10 px-6' : 'h-12 px-8'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
