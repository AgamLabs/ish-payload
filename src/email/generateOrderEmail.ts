import type { Order } from '../payload-types'
import { generateEmailHTML } from './generateEmailHTML'

export const generateOrderConfirmationEmail = async (order: Order): Promise<string> => {
  const content = `
    <p>Thank you for your order!</p>
    <p>Your order has been successfully placed and is being processed. Here are your order details:</p>
  `

  return generateEmailHTML({
    title: 'Order Confirmation',
    content,
    orderDetails: {
      items: (order.items || []).map(item => ({
        product: {
          title: typeof item.product === 'object' ? item.product.title || 'Product' : 'Product',
        },
        quantity: item.quantity || 0,
        price: order.total / (order.items?.length || 1),
      })),
      total: order.total,
    },
    cta: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${order.id}`,
      label: 'View Order Details',
    },
  })
}

export const generateAdminOrderNotificationEmail = async (order: Order): Promise<string> => {
  const content = `
    <p>A new order has been placed!</p>
    <p>Order ID: ${order.id}</p>
    <p>Customer: ${(order as any).customer?.email || 'Guest Order'}</p>
  `

  return generateEmailHTML({
    title: 'New Order Received',
    content,
    orderDetails: {
      items: (order.items || []).map(item => ({
        product: {
          title: typeof item.product === 'object' ? item.product.title || 'Product' : 'Product',
        },
        quantity: item.quantity || 0,
        price: order.total / (order.items?.length || 1),
      })),
      total: order.total,
    },
    cta: {
      url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/collections/orders/${order.id}`,
      label: 'View Order in Admin',
    },
  })
}
