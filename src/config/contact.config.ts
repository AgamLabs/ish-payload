/**
 * Contact Configuration
 * Central configuration for contact-related functionality
 */

export const CONTACT_CONFIG = {
  // Company Information
  company: {
    name: 'ISH Steel',
    email: 'info@ishsteel.com',
    phone: '+91 44 2618 2020',
    whatsapp: '914426182020',
  },

  // Office Locations
  offices: {
    chennai: {
      name: 'Chennai Office',
      address: {
        line1: 'AC 5, 2nd Ave, AC Block, Anna Nagar,',
        line2: 'Chennai, Tamil Nadu 600040',
      },
      coordinates: {
        lat: 13.085170990778887,
        lng: 80.22098931482195,
      },
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8515207778706!2d80.22098931482195!3d13.085170990778887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265f1b8a5b3a3%3A0x8b5b1b0b5b1b5b1b!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin',
    },
  },

  // Steel Product Categories
  productCategories: [
    { value: 'structural-steel', label: 'Structural Steel' },
    { value: 'reinforcement-bars', label: 'Reinforcement Bars' },
    { value: 'steel-sheets', label: 'Steel Sheets & Plates' },
    { value: 'pipes-tubes', label: 'Pipes & Tubes' },
    { value: 'custom-fabrication', label: 'Custom Fabrication' },
    { value: 'bulk-orders', label: 'Bulk Orders' },
    { value: 'technical-support', label: 'Technical Support' },
  ],

  // Form Configuration
  form: {
    maxRetries: 3,
    timeout: 10000, // 10 seconds
    validationRules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      email: {
        required: true,
        pattern: /^\S[^\s@]*@\S+$/,
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
      },
    },
  },

  // WhatsApp Configuration
  whatsapp: {
    messageTemplate: (data: { name: string; email: string; category?: string; message: string }) => `
Hello! I have a steel inquiry:

Name: ${data.name}
Email: ${data.email}
Category: ${data.category || 'General Inquiry'}
Message: ${data.message}

Please get back to me. Thank you!
    `.trim(),
    
    quickMessages: {
      general: 'Hello, I would like to inquire about your steel products.',
      pricing: 'Hi, could you please provide pricing information for your steel products?',
      support: 'Hello, I need technical support regarding steel specifications.',
    },
  },

  // UI Configuration
  ui: {
    hero: {
      title: 'Ask Us Question',
      subtitle: 'Have questions about our premium steel products and services? We\'re here to help you find the perfect steel solutions for your construction and industrial needs.',
      backgroundImage: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    
    images: {
      steel: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    
    messages: {
      success: {
        title: 'Thank You!',
        description: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
      },
      loading: 'Sending Message',
      error: 'Something went wrong. Please try again.',
      formNotReady: 'Form not ready. Please try again.',
    },
  },
} as const;

export type ContactConfig = typeof CONTACT_CONFIG;
export type ProductCategory = typeof CONTACT_CONFIG.productCategories[number];
export type Office = typeof CONTACT_CONFIG.offices[keyof typeof CONTACT_CONFIG.offices];
