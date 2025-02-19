import type { User, CartItems } from '@/payload-types'

export type CartItem = Exclude<CartItems, null>[number]

type CartType = User['cart']

type CartAction =
  | {
      payload: CartItem
      type: 'ADD_ITEM'
    }
  | {
      payload: CartType
      type: 'MERGE_CART'
    }
  | {
      payload: CartType
      type: 'SET_CART'
    }
  | {
      payload: string
      type: 'DECREMENT_QUANTITY'
    }
  | {
      payload: string
      type: 'DELETE_ITEM'
    }
  | {
      payload: string
      type: 'INCREMENT_QUANTITY'
    }
  | {
      type: 'CLEAR_CART'
    }

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case 'SET_CART': {
      return action.payload
    }

    case 'MERGE_CART': {
      const { payload: incomingCart } = action

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        // remove duplicates
        if (!item?.product) return acc
        const productId = typeof item.product === 'string' ? item.product : (typeof item.product === 'object' && 'id' in item.product ? item.product.id : null)
        if (!productId) return acc

        const indexInAcc = acc.findIndex(({ product }) => {
          if (!product) return false
          return typeof product === 'string' 
            ? product === productId 
            : (typeof product === 'object' && 'id' in product) ? product.id === productId : false
        })

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // customize the merge logic here, e.g.:
            // quantity: acc[indexInAcc].quantity + item.quantity
          }
        } else {
          const productId = typeof item.product === 'number'
            ? item.product
            : typeof item.product === 'object' && 'id' in item.product
              ? item.product.id
              : null
          if (productId) {
            acc.push({
              ...item,
              product: productId
            })
          }
        }
        return acc
      }, [])

      return {
        ...cart,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      console.log('Cart reducer: Adding item', action.payload);
      // if the item is already in the cart, increase the quantity
      const { payload } = action
      if (!payload.product) {
        console.log('Cart reducer: No product in incoming item');
        return cart;
      }

      // Get the product ID, whether it's passed as a number or a Product object
      // If product is already a full Product object, use it as is
      // Otherwise, just use the ID and let the cart provider fetch the details
      const incomingItem = {
        ...payload,
        product: typeof payload.product === 'object' && 'title' in payload.product
          ? payload.product
          : payload.product
      }

      if (!incomingItem.product) return cart

      const indexInCart = cart?.items?.findIndex(({ product, variant }) => {
        if (!product) return false
        
        // Get the ID of the item in cart
        const itemProductId = typeof product === 'number'
          ? product
          : typeof product === 'object' && 'id' in product
            ? product.id
            : null

        if (!itemProductId) return false

        // Get the ID of the incoming item
        const incomingProductId = typeof incomingItem.product === 'number'
          ? incomingItem.product
          : typeof incomingItem.product === 'object' && 'id' in incomingItem.product
            ? incomingItem.product.id
            : null
        
        if (incomingItem.variant) {
          return variant === incomingItem.variant && itemProductId === incomingProductId
        } else {
          return itemProductId === incomingProductId
        }
      })

      const withAddedItem = [...(cart?.items || [])]

      if (indexInCart === -1) {
        withAddedItem.push({
          ...incomingItem,
          product: incomingItem.product // Keep the full product object if available
        })
      }

      if (typeof indexInCart === 'number' && indexInCart > -1) {
        withAddedItem[indexInCart] = {
          ...withAddedItem[indexInCart],
          quantity:
            (incomingItem.quantity || 0) > 0
              ? (withAddedItem[indexInCart].quantity || 0) + (incomingItem.quantity || 0)
              : 0,
        }
      }

      return {
        ...cart,
        items: withAddedItem,
      }
    }

    case 'INCREMENT_QUANTITY': {
      // if the item is already in the cart, increase the quantity
      const { payload: itemId } = action

      const incrementedItems = cart?.items?.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity! + 1,
          }
        }
        return item
      })

      return {
        ...cart,
        items: incrementedItems,
      }
    }

    case 'DECREMENT_QUANTITY': {
      // if the item is already in the cart, decrease the quantity
      const { payload: itemId } = action

      const incrementedItems = cart?.items?.reduce((items, item) => {
        if (item.id === itemId) {
          // Decrement the item if it has more than 1
          if (item.quantity! > 1) {
            return [
              ...items,
              {
                ...item,
                quantity: item.quantity! - 1,
              },
            ]
          } else {
            // otherwise remove it entirely from the cart if quantity reaches 0
            return items
          }
        }
        return [...items, item]
      }, [])

      return {
        ...cart,
        items: incrementedItems,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: itemId } = action
      const withDeletedItem = { ...cart }

      const indexInCart = cart?.items?.findIndex(({ id }) => id === itemId)  

      if (typeof indexInCart === 'number' && withDeletedItem.items && indexInCart > -1)
        withDeletedItem.items.splice(indexInCart, 1)

      return withDeletedItem
    }

    case 'CLEAR_CART': {
      return {
        ...cart,
        items: [],
      }
    }

    default: {
      return cart
    }
  }
}
