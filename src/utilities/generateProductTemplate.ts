import * as XLSX from 'xlsx';

export function generateProductUploadTemplate() {
    const templateData = [
        {
            title: 'Sample Product',
            price: 19.99,
            description: 'A detailed product description',
            category: 'Electronics',
            variant_thickness: '2mm',
            variant_width: '100mm',
            variant_length: '200mm',
            variant_grade: 'A',
            variant_price: 19.99,
            variant_stock: 100,
            variant_images: 'image1.jpg;image2.jpg'
        },
        {
            title: 'Sample Product',
            price: 19.99,
            description: 'A detailed product description',
            category: 'Electronics',
            variant_thickness: '3mm',
            variant_width: '120mm',
            variant_length: '250mm',
            variant_grade: 'B',
            variant_price: 21.99,
            variant_stock: 50,
            variant_images: 'image3.jpg'
        },
        {
            title: 'Another Product',
            price: 29.99,
            description: 'Another example product',
            category: 'Appliances',
            variant_thickness: '1.5mm',
            variant_width: '80mm',
            variant_length: '150mm',
            variant_grade: 'C',
            variant_price: 29.99,
            variant_stock: 20,
            variant_images: 'image4.jpg'
        },
        {
            title: 'Another Product',
            price: 29.99,
            description: 'Another example product',
            category: 'Appliances',
            variant_thickness: '2.5mm',
            variant_width: '110mm',
            variant_length: '220mm',
            variant_grade: 'A',
            variant_price: 31.99,
            variant_stock: 5,
            variant_images: 'image5.jpg'
        }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'product_upload_template.xlsx');
}
