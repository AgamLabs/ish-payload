import type { CollectionConfig } from 'payload'

import { admins } from '@/access/admins'
// import { adminsOrLoggedIn } from '@/access/adminsOrLoggedIn'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { sendOrderEmails } from './hooks/sendOrderEmails'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true, // Allow anyone to create orders
    delete: admins,
    read: ({ req: { user } }) => {
      // Admins can read all orders
      if (user?.roles?.includes('admin')) return true

      // Users can read their own orders
      if (user) {
        return {
          orderedBy: {
            equals: user.id,
          },
        }
      }

      return false
    },
    update: admins,
  },
  admin: {
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: (doc) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
    useAsTitle: 'createdAt',
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
      relationTo: 'users',
      required: false,
    },
    {
      name: 'email',
      type: 'text',
      required: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'total',
          type: 'number',
          min: 0,
          required: true,
        },
        {
          name: 'currency',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' }
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Track payment status for offline payments',
      },
    },
    {
      name: 'paymentNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the payment (e.g., payment method, receipt number)',
        position: 'sidebar',
      },
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
            {
              name: 'variant',
              type: 'text',
            },
          ],
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [clearUserCart, sendOrderEmails],
  },
}
