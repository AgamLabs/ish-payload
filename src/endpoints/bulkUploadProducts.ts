import { Endpoint } from 'payload';
import { Product } from '../payload-types';

const bulkUploadProducts: Endpoint = {
  path: '/bulk-upload-products',
  method: 'post',
  handler: async (req) => {
    try {
      debugger;
      // Safely check if req.json is a function before calling
      if (typeof req.json !== 'function') {
        return Response.json({
          message: 'Invalid request object'
        }, { status: 400 });
      }


      // Read request body data
      const body = await req.json();
      const products = Array.isArray(body?.products) ? body.products : [];

      if (!Array.isArray(products)) {
        return Response.json({
          message: 'Invalid format'
        }, { status: 400 });
      }

      const created: string[] = [];

      // Utility to recursively remove all 'id' properties
      function removeIds(obj: any): any {
        if (Array.isArray(obj)) {
          return obj.map(removeIds);
        } else if (obj && typeof obj === 'object') {
          const { id, ...rest } = obj;
          for (const key in rest) {
            rest[key] = removeIds(rest[key]);
          }
          return rest;
        }
        return obj;
      }

      for (const product of products) {
        try {
          // Expect product.variants to be the correct object structure
          const productData: Omit<Product, "id" | "updatedAt" | "createdAt"> & Partial<Pick<Product, "id" | "updatedAt" | "createdAt">> = {
            title: product.title ?? '',
            stock: Number(product.stock) || 1000,
            price: Number(product.price) || 0,
            enableVariants: true,
            _status: 'draft',
            gallery: [16, 18, 19],
            variants: product.variants ?? null,
            // add any other fields you want to save
          };

          // Recursively remove all 'id' properties
          const cleanProductData = removeIds(productData);
          const doc = await req.payload.create({
            collection: 'products',
            data: cleanProductData,
          });

          created.push(doc.title);
        } catch (error) {
          console.error(`Failed to create product ${product.title}:`, error);
        }
      }

      return Response.json({ message: `Uploaded ${created.length} products.` }, { status: 200 });
    } catch (error) {
      console.error('Bulk upload error:', error);
      return Response.json({ message: 'Internal server error' }, { status: 500 });
    }
  },
};

export default bulkUploadProducts;
