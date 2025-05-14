"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "../ui/table";
import { toast } from "sonner";
import { generateProductUploadTemplate } from "@/utilities/generateProductTemplate";
import type { Product } from "@/payload-types";

interface ProductDataTemp {
  title: string;
  price: number;
  description?: string;
  category?: string;
  variantList: any[]; // array of variant rows
}

interface ProductData {
  title: string;
  price: number;
  description?: string;
  category?: string;
  variants: Product['variants'];
}

interface BulkUploadResponse {
  success: boolean;
  message: string;
  uploadedCount?: number;
  validationErrors?: Array<{
    product: ProductData;
    errors: Array<{ path: string; message: string }>;
  }>;
  errors?: Array<{
    product: ProductData;
    error: string;
  }>;
}

const BulkProductUpload: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadErrors, setUploadErrors] = useState<BulkUploadResponse | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      const productMap = new Map<string, ProductDataTemp>();

      jsonData.forEach((row) => {
        const key = `${row.title}||${row.category}`;
        const variant = {
          thickness: row.variant_thickness,
          width: row.variant_width,
          length: row.variant_length,
          grade: row.variant_grade,
          price: Number(row.variant_price) || 0,
          stock: Number(row.variant_stock) || 0,
          // images: row.variant_images ? row.variant_images.split(';') : []
        };
        if (productMap.has(key)) {
          productMap.get(key)!.variantList.push(variant);
        } else {
          productMap.set(key, {
            title: row.title,
            price: Number(row.price),
            description: row.description || '',
            category: row.category || '',
            variantList: [variant],
          });
        }
      });

      // 2. After aggregation, map to final ProductData[] with correct Product['variants'] type
      const validProducts: ProductData[] = Array.from(productMap.values()).map((product) => {
        const options = [
          { label: 'Thickness', slug: 'thickness', id: null },
          { label: 'Width', slug: 'width', id: null },
          { label: 'Length', slug: 'length', id: null },
          { label: 'Grade', slug: 'grade', id: null },
        ];
        const transformedVariants = transformVariants(product.variantList);
        const { variantList, ...rest } = product;
        return {
          ...rest,
          variants: {
            options,
            variants: transformedVariants,
          },
        };

      });

      setProducts(validProducts);
      setUploadErrors(null);
      toast.success(`Parsed ${validProducts.length} products`);
    } catch (error) {
      console.error("Error parsing file:", error);
      toast.error("Error parsing file. Please check your Excel format.");
    }
  };



  // Returns Product['variants']['variants'] (array of variant objects)
  const transformVariants = (variantsData: any[]): NonNullable<NonNullable<Product['variants']>['variants']> => {
    if (!Array.isArray(variantsData)) {
      throw new Error('Invalid variants data format');
    }

    return variantsData.map((variant, index) => ({
      id: (variant.id ?? index?.toString()) ?? null,
      options: [
        {
          label: variant.thickness,
          slug: variant.thickness?.toLowerCase().replace(/\s+/g, '-'),
          id: variant.thickness_id ?? undefined,
        },
        {
          label: variant.width,
          slug: variant.width?.toLowerCase().replace(/\s+/g, '-'),
          id: variant.width_id ?? undefined,
        },
        {
          label: variant.length,
          slug: variant.length?.toLowerCase().replace(/\s+/g, '-'),
          id: variant.length_id ?? undefined,
        },
        {
          label: variant.grade,
          slug: variant.grade?.toLowerCase().replace(/\s+/g, '-'),
          id: variant.grade_id ?? undefined,
        },
      ],
      price: Number(variant.price) || 0,
      stock: Number(variant.stock) || 0,
      images: Array.isArray(variant.images) && variant.images.length > 0 ? variant.images : null,
    }));
  };




  const handleBulkUpload = async () => {
    if (products.length === 0) {
      toast.error("No products to upload");
      return;
    }

    setIsUploading(true);
    setUploadErrors(null);

    try {
      const response = await fetch("/api/bulk-upload-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      const result: BulkUploadResponse = await response.json();

      if (result.success) {
        toast.success(`Successfully uploaded ${result.uploadedCount} products`);
        setProducts([]);
        setUploadErrors(null); // Clear errors on success
      } else {
        setUploadErrors(result); // Only set errors on failure
        toast.error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Bulk Product Upload</h2>

      {/* Upload Controls */}
      <div className="bg-white dark:bg-neutral-900 shadow rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center gap-4">
        <Input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileUpload}
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
        />
        <Button
          onClick={() => generateProductUploadTemplate()}
          variant="outline"
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 border border-gray-300 dark:border-neutral-700 rounded shadow-sm px-4 py-2"
        >
          Download Template
        </Button>
      </div>

      {/* Error/Success Messages */}
      {uploadErrors && !uploadErrors.success && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {uploadErrors.message}
        </div>
      )}

      {/* Products Table */}
      {products.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-lg shadow mb-6">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader className="bg-gray-50 dark:bg-neutral-800">
                <TableRow>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Title</TableHead>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Price</TableHead>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-neutral-900">
                {products.map((product, index) => (
                  <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                    <TableCell className="px-4 py-2">{product.title}</TableCell>
                    <TableCell className="px-4 py-2">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="px-4 py-2">{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button
            onClick={handleBulkUpload}
            disabled={isUploading}
            className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors px-6 py-2 shadow"
          >
            {isUploading ? "Uploading..." : `Upload ${products.length} Products`}
          </Button>
        </>
      )}

      {uploadErrors && !uploadErrors.success && (
        <div className="mt-4 p-4 bg-red-50 rounded">
          <h3 className="text-red-700 font-bold mb-2">Upload Errors</h3>
          {uploadErrors.validationErrors && (
            <div>
              <h4 className="text-red-600">Validation Errors:</h4>
              {uploadErrors.validationErrors.map((validationError, index) => (
                <div key={index} className="mb-2 p-2 bg-red-100 rounded">
                  <p className="font-semibold">Product: {validationError.product.title}</p>
                  {validationError.errors.map((error, errorIndex) => (
                    <p key={errorIndex} className="text-red-700">
                      {error.path}: {error.message}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {uploadErrors.errors && (
            <div>
              <h4 className="text-red-600">Creation Errors:</h4>
              {uploadErrors.errors.map((error, index) => (
                <div key={index} className="mb-2 p-2 bg-red-100 rounded">
                  <p className="font-semibold">Product: {error.product.title}</p>
                  <p className="text-red-700">{error.error}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkProductUpload;