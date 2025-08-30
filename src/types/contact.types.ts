/**
 * Contact Form Types
 * TypeScript definitions for contact functionality
 */

// Base form data structure
export interface ContactFormData {
  'full-name': string;
  email: string;
  subject: string;
  message: string;
}

// Normalized form data for internal use
export interface NormalizedContactData {
  name: string;
  email: string;
  category?: string;
  message: string;
}

// Form submission state
export interface ContactFormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  formId: string | null;
}

// API response types
export interface FormApiResponse {
  docs: Array<{
    id: string;
    title: string;
  }>;
}

export interface SubmissionApiPayload {
  form: string;
  submissionData: Array<{
    field: string;
    value: string;
  }>;
}

// Component prop types
export interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export interface ContactInfoProps {
  office: {
    name: string;
    address: {
      line1: string;
      line2: string;
    };
  };
  phone: string;
  email: string;
  whatsapp: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onWhatsAppSubmit: (data: ContactFormData) => void;
  state: ContactFormState;
  categories: Array<{
    value: string;
    label: string;
  }>;
}

export interface ContactMapProps {
  embedUrl: string;
  title: string;
  height?: string;
}

// Error types
export class ContactFormError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'API_ERROR' | 'NETWORK_ERROR' | 'FORM_NOT_READY',
    public details?: any
  ) {
    super(message);
    this.name = 'ContactFormError';
  }
}

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}
