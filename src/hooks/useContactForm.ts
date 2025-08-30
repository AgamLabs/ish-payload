/**
 * Contact Form Hook
 * Custom React hook for managing contact form state and logic
 */

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormData, ContactFormState, ContactFormError } from '@/types/contact.types';
import { CONTACT_CONFIG } from '@/config/contact.config';
import { contactApiService } from '@/services/contact-api.service';
import { 
  validateContactForm, 
  normalizeContactData, 
  openWhatsApp,
  checkRateLimit,
  sanitizeInput 
} from '@/lib/contact.utils';

interface UseContactFormOptions {
  onSuccess?: () => void;
  onError?: (error: ContactFormError) => void;
}

export const useContactForm = (options: UseContactFormOptions = {}) => {
  // Form state
  const [state, setState] = useState<ContactFormState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    formId: null,
  });

  // Last submission timestamp for rate limiting
  const [lastSubmission, setLastSubmission] = useState<number>();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    mode: 'onChange',
    defaultValues: {
      'full-name': '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Initialize form ID on mount
  useEffect(() => {
    const initializeForm = async () => {
      try {
        const formId = await contactApiService.getFormId();
        setState(prev => ({ ...prev, formId }));
      } catch (error) {
        console.error('Failed to initialize form:', error);
        setState(prev => ({ 
          ...prev, 
          error: 'Failed to initialize form. Please refresh the page.' 
        }));
      }
    };

    initializeForm();
  }, []);

  // Sanitize inputs on change
  const watchedFields = watch();
  useEffect(() => {
    Object.entries(watchedFields).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const sanitized = sanitizeInput(value);
        if (sanitized !== value) {
          setValue(key as keyof ContactFormData, sanitized);
        }
      }
    });
  }, [watchedFields, setValue]);

  // Clear error when user starts typing
  useEffect(() => {
    if (state.error && Object.keys(watchedFields).some(key => watchedFields[key as keyof ContactFormData])) {
      setState(prev => ({ ...prev, error: null }));
    }
  }, [watchedFields, state.error]);

  // Handle form submission
  const onSubmit = useCallback(async (data: ContactFormData) => {
    // Rate limiting check
    if (!checkRateLimit(lastSubmission)) {
      setState(prev => ({ 
        ...prev, 
        error: 'Please wait 30 seconds before submitting again.' 
      }));
      return;
    }

    if (!state.formId) {
      setState(prev => ({ 
        ...prev, 
        error: CONTACT_CONFIG.ui.messages.formNotReady 
      }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      error: null 
    }));

    try {
      // Client-side validation
      const validation = validateContactForm(data);
      if (!validation.isValid) {
        throw new ContactFormError(
          'Please fix the form errors',
          'VALIDATION_ERROR',
          validation.errors
        );
      }

      await contactApiService.processFormSubmission(data);
      
      setState(prev => ({ 
        ...prev, 
        isSubmitted: true,
        isSubmitting: false 
      }));
      
      setLastSubmission(Date.now());
      reset();
      options.onSuccess?.();
      
    } catch (error) {
      const contactError = error instanceof ContactFormError 
        ? error 
        : new ContactFormError(
            CONTACT_CONFIG.ui.messages.error,
            'API_ERROR',
            error
          );

      setState(prev => ({ 
        ...prev, 
        error: contactError.message,
        isSubmitting: false 
      }));
      
      options.onError?.(contactError);
      console.error('Form submission error:', contactError);
    }
  }, [state.formId, lastSubmission, reset, options]);

  // Handle WhatsApp submission
  const onWhatsAppSubmit = useCallback((data: ContactFormData) => {
    try {
      const validation = validateContactForm(data);
      if (!validation.isValid) {
        setState(prev => ({ 
          ...prev, 
          error: 'Please fill in all required fields before sending via WhatsApp.' 
        }));
        return;
      }

      const normalizedData = normalizeContactData(data);
      openWhatsApp(normalizedData);
    } catch (error) {
      console.error('WhatsApp submission error:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to open WhatsApp. Please try again.' 
      }));
    }
  }, []);

  // Reset form state
  const resetForm = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isSubmitted: false, 
      error: null 
    }));
    reset();
  }, [reset]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // Form handlers
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleWhatsAppSubmit: handleSubmit(onWhatsAppSubmit),
    
    // Form state
    formState: {
      errors,
      isValid: Object.keys(errors).length === 0,
      isDirty: Object.values(watchedFields).some(value => value !== ''),
    },
    
    // Component state
    state,
    
    // Actions
    resetForm,
    clearError,
    
    // Configuration
    categories: CONTACT_CONFIG.productCategories,
    validationRules: CONTACT_CONFIG.form.validationRules,
  };
};
