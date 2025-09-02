import { Endpoint } from "payload";
import { Product } from "../payload-types";

const bulkUploadProducts: Endpoint = {
  path: "/bulk-upload-products",
  method: "post",
  handler: async (req) => {
    try {
      debugger;
      // Safely check if req.json is a function before calling
      if (typeof req.json !== "function") {
        return Response.json(
          {
            message: "Invalid request object",
          },
          { status: 400 }
        );
      }

      // Read request body data
      const body = await req.json();
      const products = Array.isArray(body?.products) ? body.products : [];

      if (!Array.isArray(products)) {
        return Response.json(
          {
            message: "Invalid format",
          },
          { status: 400 }
        );
      }

      const created: string[] = [];
      const errors: Array<{ product: any; error: string }> = [];

      // Utility to recursively remove all 'id' properties
      function removeIds(obj: any): any {
        if (Array.isArray(obj)) {
          return obj.map(removeIds);
        } else if (obj && typeof obj === "object") {
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
          const productData: any = {
            title: product.title ?? "",
            stock: Number(product.stock) || 1000,
            price: Number(product.price) || 0,
            enableVariants: false,
            _status: "draft",
            gallery: [16, 18, 19],
            // add any other fields you want to save
          };

          // Recursively remove all 'id' properties
          const cleanProductData = removeIds(productData);
          const doc = await req.payload.create({
            collection: "products",
            data: cleanProductData,
            overrideAccess: true, // Bypass access controls for bulk upload
          });

          created.push(doc.title);
        } catch (error) {
          console.error(`Failed to create product ${product.title}:`, error);
          errors.push({
            product,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      if (errors.length > 0) {
        return Response.json(
          {
            success: false,
            message: `Uploaded ${created.length} products, ${errors.length} failed.`,
            uploadedCount: created.length,
            errors,
          },
          { status: 200 }
        );
      }

      return Response.json(
        {
          success: true,
          message: `Uploaded ${created.length} products.`,
          uploadedCount: created.length,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Bulk upload error:", error);
      return Response.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  },
};

export default bulkUploadProducts;
