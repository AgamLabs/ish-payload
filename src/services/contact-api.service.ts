/**
 * Contact API Service
 * Centralized API handling for contact functionality
 */

import { getClientSideURL } from '@/utilities/getURL';
import { CONTACT_CONFIG } from '@/config/contact.config';
import { 
  ContactFormData, 
  FormApiResponse, 
  SubmissionApiPayload,
  ContactFormError 
} from '@/types/contact.types';
import { formatApiSubmission, handleApiError, withRetry } from '@/lib/contact.utils';

class ContactApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = getClientSideURL();
    this.timeout = CONTACT_CONFIG.form.timeout;
  }

  /**
   * Fetches the contact form ID from the API
   */
  async getFormId(): Promise<string> {
    return withRetry(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      try {
        const response = await fetch(
          `${this.baseUrl}/api/forms?where[title][equals]=Contact`,
          {
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: FormApiResponse = await response.json();

        if (!data.docs || data.docs.length === 0) {
          throw new ContactFormError(
            'Contact form not found',
            'API_ERROR',
            { response: data }
          );
        }

        return data.docs[0].id;
      } catch (error) {
        clearTimeout(timeoutId);
        throw handleApiError(error, 'Form ID fetch');
      }
    });
  }

  /**
   * Submits the contact form data
   */
  async submitForm(data: ContactFormData, formId: string): Promise<void> {
    return withRetry(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      try {
        const payload: SubmissionApiPayload = formatApiSubmission(data, formId);

        const response = await fetch(`${this.baseUrl}/api/form-submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Optionally parse response if needed
        await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        throw handleApiError(error, 'Form submission');
      }
    });
  }

  /**
   * Validates form data before submission
   */
  private validateSubmissionData(data: ContactFormData): void {
    const requiredFields: (keyof ContactFormData)[] = ['full-name', 'email', 'message'];
    
    for (const field of requiredFields) {
      if (!data[field] || !data[field].trim()) {
        throw new ContactFormError(
          `Missing required field: ${field}`,
          'VALIDATION_ERROR',
          { field }
        );
      }
    }
  }

  /**
   * Complete form submission workflow
   */
  async processFormSubmission(data: ContactFormData): Promise<void> {
    try {
      // Validate data
      this.validateSubmissionData(data);

      // Get form ID (with caching in a real implementation)
      const formId = await this.getFormId();

      // Submit form
      await this.submitForm(data, formId);
    } catch (error) {
      if (error instanceof ContactFormError) {
        throw error;
      }
      throw handleApiError(error, 'Form processing');
    }
  }
}

// Export singleton instance
export const contactApiService = new ContactApiService();

// Export class for testing
export { ContactApiService };
