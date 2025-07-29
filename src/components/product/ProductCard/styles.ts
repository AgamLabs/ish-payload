/**
 * ProductCard styling constants and utilities
 */

export const PRODUCT_CARD_STYLES = {
  // Base styles for all product cards
  base: {
    container: "group relative",
    imageWrapper: "relative overflow-hidden rounded-xl",
    image: "object-cover transition-transform duration-300",
    hoverImage: "group-hover:scale-105",
    overlay: `
      absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center
      transition-opacity duration-300
    `,
    cartButton: `
      bg-white hover:bg-gray-100 text-black rounded-full p-3
      shadow-lg transition-all duration-200 hover:scale-110
    `,
    details: "mt-3",
    title: "text-center font-medium",
    priceWrapper: "mt-1 text-center",
    price: "text-sm font-semibold"
  },

  // Variant-specific styles
  variants: {
    section3: {
      container: "flex-shrink-0",
      imageSize: "w-[270px] h-[260px]",
      title: "text-[22px] text-grayforbottomtext"
    },
    section4: {
      container: "mx-auto",
      imageSize: "w-[155px] h-[155px] sm:w-[270px] sm:h-[260px]",
      title: "sm:text-[22px] text-grayforbottomtext"
    },
    grid: {
      container: "w-full",
      imageSize: "aspect-square w-full"
    },
    related: {
      container: "aspect-square w-full",
      imageSize: "h-full w-full"
    }
  }
};

/**
 * Animation configurations for different interactions
 */
export const PRODUCT_CARD_ANIMATIONS = {
  hover: {
    scale: "hover:scale-105",
    opacity: "hover:opacity-90",
    shadow: "hover:shadow-lg"
  },
  cart: {
    loading: "animate-pulse",
    success: "animate-bounce"
  },
  overlay: {
    show: "opacity-100",
    hide: "opacity-0"
  }
};

/**
 * Responsive breakpoints for product cards
 */
export const PRODUCT_CARD_BREAKPOINTS = {
  mobile: {
    section3: "w-[200px] h-[200px]",
    section4: "w-[155px] h-[155px]"
  },
  tablet: {
    section3: "sm:w-[270px] sm:h-[260px]",
    section4: "sm:w-[270px] sm:h-[260px]"
  },
  desktop: {
    grid: "lg:w-1/4 xl:w-1/5"
  }
};

/**
 * Accessibility attributes for product cards
 */
export const PRODUCT_CARD_A11Y = {
  cartButton: (productTitle: string) => ({
    'aria-label': `Add ${productTitle} to cart`,
    'role': 'button',
    'tabIndex': 0
  }),
  productLink: (productTitle: string) => ({
    'aria-label': `View ${productTitle} details`,
    'role': 'link'
  })
};
