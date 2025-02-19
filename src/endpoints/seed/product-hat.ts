import type { Product } from '@/payload-types'

export const productHat: Partial<Product> & { gallery: unknown[], categories: unknown[], variants: { options: any[], variants: any[] } } = {
  variants: {
    options: [
      {
        label: 'Colour',
        slug: 'colour',
        values: [
          {
            label: 'Black',
            slug: 'black',
          },
          {
            label: 'White',
            slug: 'white',
          },
        ],
      },
    ],
    variants: [
      {
        options: [{ slug: 'black', label: 'Black' }],
        stock: 52,
        price: 1900,
        images: ['{{IMAGE_1}}' as unknown as number],
      },
      {
        options: [{ slug: 'white', label: 'White' }],
        stock: 52,
        price: 1900,
        images: ['{{IMAGE_2}}' as unknown as number],
      },
    ],
  },
  stock: 0,
  meta: {
    title: 'Hat | Payload Ecommerce Template',
    image: '{{IMAGE_1}}' as unknown as number,
    description:
      'Top off your look with our classic hat, crafted for style and comfort. Made with breathable, high-quality materials and an adjustable strap for the perfect fit.',
  },
  skipSync: false,
  _status: 'published',
  layout: [],
  categories: ['{{CATEGORY_1}}' as unknown as number],
  description: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Top off your look with our classic hat, crafted for style and comfort. Made with breathable, high-quality materials and an adjustable strap for the perfect fit, it’s ideal for everyday wear or outdoor adventures. Available in a range of colors to match any outfit.',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
  enableVariants: true,
  gallery: ['{{IMAGE_1}}', '{{IMAGE_2}}', '{{IMAGE_3}}'].map(img => img as unknown as number),
  price: 1999,
  publishedOn: '2025-01-21T00:01:06.661Z',
  title: 'Hat',
  slug: 'hat',
}
