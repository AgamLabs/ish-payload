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
}

interface ProductData {
  title: string;
  price: number;
  description?: string;
  category?: string;
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
      const worksheet = workbook.Sheets[workbook.SheetNames[2]];
      const rawData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 }); // Use array of arrays

      // Detect sheet structure - check if second row has grade info or product info
      const [mainHeader, secondRow, thirdRow, ...dataRows] = rawData;
      
      // Find the index for thickness and width columns
      const thicknessColIdx = mainHeader.findIndex((h) =>
        String(h).toLowerCase().includes("thickness")
      );
      const widthColIdx = mainHeader.findIndex((h) =>
        String(h).toLowerCase().includes("width")
      );
      const gradeStartIdx = Math.max(thicknessColIdx, widthColIdx) + 1;

      // Determine sheet structure by checking different patterns
      const hasGradeRow = secondRow && secondRow.slice(gradeStartIdx).some((cell: any) => 
        cell && String(cell).match(/\d+\s*GSM|Grade|[A-Z]+\d*/i)
      );

      // Check if this is a "Grade in Header" format where mainHeader has "Grade" columns
      const hasGradeInHeader = mainHeader.slice(gradeStartIdx).some((h: any) =>
        h && String(h).toLowerCase().includes("grade")
      );

      let baseTitle, description, category, gradeHeaders, widthHeaders, actualDataRows;

      if (hasGradeInHeader) {
        // Structure: Header with Grade columns -> Product Info Row -> Data Rows
        // Row 1: [Title, Description, Category, Variant_Thickness, Variant_Width, Grade, Grade, ...]
        // Row 2: [Zero Spangles, '', Flat Products, In MM, 1270, 120, 180, 275, ...]
        gradeHeaders = secondRow.slice(gradeStartIdx); // Grade values from product info row
        widthHeaders = []; // No separate width row, width is in product info
        baseTitle = secondRow[0] || "";
        description = secondRow[1] || "";
        category = secondRow[2] || "";
        actualDataRows = [thirdRow, ...dataRows].filter(row => row && row.length > 0);
      } else if (hasGradeRow) {
        // Structure: Header -> Grade Row -> Width Row -> Data Rows
        gradeHeaders = secondRow.slice(gradeStartIdx);
        widthHeaders = thirdRow ? thirdRow.slice(gradeStartIdx) : [];
        baseTitle = thirdRow[0] || "";
        description = thirdRow[1] || "";
        category = thirdRow[2] || "";
        actualDataRows = dataRows;
      } else {
        // Structure: Header -> Product Info/Width Row -> Data Rows
        widthHeaders = secondRow ? secondRow.slice(gradeStartIdx) : [];
        gradeHeaders = []; // No separate grade row
        baseTitle = secondRow[0] || "";
        description = secondRow[1] || "";
        category = secondRow[2] || "";
        actualDataRows = [thirdRow, ...dataRows].filter(row => row && row.length > 0);
      }

      const productsList: ProductDataTemp[] = [];

      // Parse each data row (skip empty rows)
      for (const row of actualDataRows) {
        if (!row || row.length === 0) continue;
        const thickness = (row[thicknessColIdx] ?? "").toString().trim();
        if (!thickness) continue;
        
        if (hasGradeInHeader) {
          // Format 3: Grade columns in header, single width value in product row
          for (let i = 0; i < gradeHeaders.length; i++) {
            const grade = (gradeHeaders[i] ?? "").toString().trim();
            if (!grade) continue;
            const price = Number(row[gradeStartIdx + i]) || 0;
            if (price > 0) {
              // For this format, there's no separate width - use the width from product info row
              const productWidth = secondRow[widthColIdx] || "";
              
              // Add GSM suffix to grade if it's just a number
              const formattedGrade = /^\d+$/.test(grade) ? `${grade} GSM` : grade;
              
              // Create title with thickness and grade
              const title = `${baseTitle} - T:${thickness} - W:${productWidth} - Grade:${formattedGrade}`;
                
              productsList.push({
                title,
                price,
                description,
                category,
              });
            }
          }
        } else {
          // Format 1 & 2: Width-based columns
          for (let i = 0; i < widthHeaders.length; i++) {
            const width = (widthHeaders[i] ?? "").toString().trim();
            const grade = gradeHeaders[i] ? (gradeHeaders[i] ?? "").toString().trim() : "";
            if (!width) continue;
            const price = Number(row[gradeStartIdx + i]) || 0;
            if (price > 0) {
              // Create title based on available data
              let title;
              if (grade) {
                // Has separate grade information
                title = `${baseTitle} - T:${thickness} x W:${width} - Grade:${grade}`;
              } else {
                // Check if width contains grade info (fallback for sheets without separate grade row)
                const gradeMatch = width.match(/(\d+\s*GSM|Grade\s*\w+|[A-Z]+\d*)/i);
                if (gradeMatch) {
                  const extractedGrade = gradeMatch[1];
                  const cleanWidth = width.replace(gradeMatch[0], '').trim();
                  title = `${baseTitle} - T:${thickness} x W:${cleanWidth} - Grade:${extractedGrade}`;
                } else {
                  title = `${baseTitle} - T:${thickness} x W:${width}`;
                }
              }
                
              productsList.push({
                title,
                price,
                description,
                category,
              });
            }
          }
        }
      }

      console.log(productsList);

      // Convert to final format
      const validProducts: ProductData[] = productsList.map((product) => ({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      }));

      setProducts(validProducts);
      setUploadErrors(null);
      toast.success(`Parsed ${validProducts.length} products`);
    } catch (error) {
      console.error("Error parsing file:", error);
      toast.error("Error parsing file. Please check your Excel format.");
    }
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
                      ₹{product.price.toFixed(2)}
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
