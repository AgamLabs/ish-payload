/**
 * Contact Utilities
 * Reusable utility functions for contact functionality
 */

import { CONTACT_CONFIG } from '@/config/contact.config';
import { 
  ContactFormData, 
  NormalizedContactData, 
  ValidationResult, 
  ContactFormError,
  ValidationRule 
} from '@/types/contact.types';

/**
 * Normalizes form data for consistent internal use
 */
export const normalizeContactData = (formData: ContactFormData): NormalizedContactData => ({
  name: formData['full-name'],
  email: formData.email,
  category: formData.subject || undefined,
  message: formData.message,
});

/**
 * Validates contact form data
 */
export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: Record<string, string> = {};
  const rules = CONTACT_CONFIG.form.validationRules;

  // Validate name
  if (rules.name.required && !data['full-name'].trim()) {
    errors['full-name'] = 'Name is required';
  } else if (data['full-name'].length < rules.name.minLength) {
    errors['full-name'] = `Name must be at least ${rules.name.minLength} characters`;
  } else if (data['full-name'].length > rules.name.maxLength) {
    errors['full-name'] = `Name must not exceed ${rules.name.maxLength} characters`;
  }

  // Validate email
  if (rules.email.required && !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!rules.email.pattern.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate message
  if (rules.message.required && !data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < rules.message.minLength) {
    errors.message = `Message must be at least ${rules.message.minLength} characters`;
  } else if (data.message.length > rules.message.maxLength) {
    errors.message = `Message must not exceed ${rules.message.maxLength} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Formats WhatsApp message
 */
export const formatWhatsAppMessage = (data: NormalizedContactData): string => {
  return CONTACT_CONFIG.whatsapp.messageTemplate(data);
};

/**
 * Generates WhatsApp URL
 */
export const generateWhatsAppUrl = (data: NormalizedContactData): string => {
  const message = formatWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_CONFIG.company.whatsapp}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with formatted message
 */
export const openWhatsApp = (data: NormalizedContactData): void => {
  const url = generateWhatsAppUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Converts form data to API submission format
 */
export const formatApiSubmission = (data: ContactFormData, formId: string) => ({
  form: formId,
  submissionData: Object.entries(data).map(([field, value]) => ({
    field,
    value,
  })),
});

/**
 * Handles API errors with proper error types
 */
export const handleApiError = (error: unknown, context: string): ContactFormError => {
  if (error instanceof Error) {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new ContactFormError(
        'Network error. Please check your connection and try again.',
        'NETWORK_ERROR',
        error
      );
    }
    return new ContactFormError(
      `${context} failed: ${error.message}`,
      'API_ERROR',
      error
    );
  }
  
  return new ContactFormError(
    `An unexpected error occurred during ${context}`,
    'API_ERROR',
    error
  );
};

/**
 * Retry mechanism for API calls
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = CONTACT_CONFIG.form.maxRetries,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i === maxRetries) break;
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError!;
};

/**
 * Debounce function for form validation
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Sanitizes user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

/**
 * Checks if the form submission is within rate limits
 */
export const checkRateLimit = (lastSubmission?: number): boolean => {
  if (!lastSubmission) return true;
  
  const now = Date.now();
  const timeDiff = now - lastSubmission;
  const minInterval = 30000; // 30 seconds
  
  return timeDiff >= minInterval;
};
