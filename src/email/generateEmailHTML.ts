import ejs from 'ejs'
import fs from 'fs'
import juice from 'juice'
import path from 'path'

export type EmailData = {
  title: string
  content: string
  storeName?: string
  logo?: string
  cta?: {
    url: string
    label: string
  }
  orderDetails?: {
    items: Array<{
      product: {
        title: string
      }
      quantity: number
      price: number
    }>
    total: number
  }
  unsubscribe?: string
}

export const generateEmailHTML = async (data: EmailData): Promise<string> => {
  const templatePath = path.join(process.cwd(), 'src/email/template.ejs')
  const templateContent = fs.readFileSync(templatePath, 'utf8')

  // Set default values
  const emailData = {
    storeName: 'India Steel Hub',
    ...data,
  }

  // Compile and render the template with EJS
  const preInlinedCSS = ejs.render(templateContent, emailData)

  // Inline CSS for better email client compatibility
  const html = juice(preInlinedCSS)

  return Promise.resolve(html)
}
