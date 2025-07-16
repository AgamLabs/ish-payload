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
  TableCell,
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
  variants: Product["variants"];
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
  const [uploadErrors, setUploadErrors] = useState<BulkUploadResponse | null>(
    null
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[5]];
      const rawData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 }); // Use array of arrays

      // Find header row, value row, and width row
      const [mainHeader, valueRow, ...dataRows] = rawData; // Second row has product info and width headers
      // mainHeader: [Title, Description, Category, Variant_Thickness, ...]
      // valueRow:   [CR Coils, Flat Products, ... , '', 900, 1000, ...]

      // Find the index for thickness and width columns
      const thicknessColIdx = mainHeader.findIndex((h) =>
        String(h).toLowerCase().includes("thickness")
      );
      const widthStartIdx = thicknessColIdx + 1;
      const widthHeaders = valueRow.slice(widthStartIdx); // Use valueRow for width headers

      // Get product info from value row
      const title = valueRow[0] || "";
      const description = valueRow[1] || "";
      const category = valueRow[2] || "";

      const productMap = new Map<string, ProductDataTemp>();
      const key = `${title}||${category}`;
      productMap.set(key, {
        title,
        price: 0,
        description,
        category,
        variantList: [],
      });

      // Parse each data row (skip empty rows)
      for (const row of dataRows) {
        const thickness = (row[thicknessColIdx] ?? "").toString().trim();
        if (!thickness) continue;
        for (let i = 0; i < widthHeaders.length; i++) {
          const width = (widthHeaders[i] ?? "").toString().trim();
          if (!width) continue;
          const price = Number(row[widthStartIdx + i]) || 0;
          if (price > 0) {
            const variant = {
              thickness,
              width,
              length: "",
              grade: "",
              price,
              stock: 1000,
            };
            productMap.get(key)!.variantList.push(variant);
          }
        }
      }

      // Calculate base price as minimum variant price for each product
      productMap.forEach((product) => {
        if (product.variantList.length > 0) {
          product.price = Math.min(...product.variantList.map((v) => v.price));
        }
      });

      console.log(productMap);

      // Convert to final format
      const validProducts: ProductData[] = Array.from(productMap.values()).map(
        (product) => {
          // Collect unique, non-empty thicknesses and widths for options.values
          const thicknessSet = new Set<string>();
          const widthSet = new Set<string>();
          product.variantList.forEach((variant) => {
            const t = (variant.thickness || '').toString().trim();
            const w = (variant.width || '').toString().trim();
            if (t) thicknessSet.add(t);
            if (w) widthSet.add(w);
          });

          const thicknessValues = Array.from(thicknessSet)
            .filter((val) => val && val.length > 0)
            .map((val) => ({
              label: val,
              slug: val.toLowerCase().replace(/\s+/g, "-"),
              id: undefined,
            }));
          const widthValues = Array.from(widthSet)
            .filter((val) => val && val.length > 0)
            .map((val) => ({
              label: val,
              slug: val.toLowerCase().replace(/\s+/g, "-"),
              id: undefined,
            }));

          const options = [
            { label: "Thickness", slug: "thickness", id: null, values: thicknessValues || [] },
            { label: "Width", slug: "width", id: null, values: widthValues || [] },
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
        }
      );

      setProducts(validProducts);
      setUploadErrors(null);
      toast.success(`Parsed ${validProducts.length} products`);
    } catch (error) {
      console.error("Error parsing file:", error);
      toast.error("Error parsing file. Please check your Excel format.");
    }
  };

  // Returns Product['variants']['variants'] (array of variant objects)
  const transformVariants = (
    variantsData: any[]
  ): NonNullable<NonNullable<Product["variants"]>["variants"]> => {
    if (!Array.isArray(variantsData)) {
      throw new Error("Invalid variants data format");
    }

    return variantsData.map((variant, index) => ({
      id: index.toString(),
      options: [
        {
          label: variant.thickness,
          slug: variant.thickness
            ?.toString()
            .toLowerCase()
            .replace(/\s+/g, "-"),
          id: undefined,
        },
        {
          label: variant.width,
          slug: variant.width?.toString().toLowerCase().replace(/\s+/g, "-"),
          id: undefined,
        },
      ],
      price: Number(variant.price) || 0,
      stock: Number(variant.stock) || 1000,
      images: null,
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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Bulk Product Upload
      </h2>

      {/* Upload Controls */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center gap-4">
        <Input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileUpload}
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={() => generateProductUploadTemplate()}
          variant="outline"
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded shadow-sm px-4 py-2"
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
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700">
                    Title
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700">
                    Price
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left font-semibold text-gray-700">
                    Category
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <TableCell className="px-4 py-2">{product.title}</TableCell>
                    <TableCell className="px-4 py-2">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {product.category}
                    </TableCell>
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
            {isUploading
              ? "Uploading..."
              : `Upload ${products.length} Products`}
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
                  <p className="font-semibold">
                    Product: {validationError.product.title}
                  </p>
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
                  <p className="font-semibold">
                    Product: {error.product.title}
                  </p>
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
