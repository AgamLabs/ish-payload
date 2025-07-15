'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends ImageProps {
  src: string
  fallbackSrc?: string
  lowQualitySrc?: string
}

export function OptimizedImage({
  src,
  fallbackSrc,
  lowQualitySrc,
  alt,
  className,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false)
    onLoad?.(event)
  }

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true)
    setIsLoading(false)
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(false)
    } else {
      onError?.(event)
    }
  }

  return (
    <>
      {/* Loading skeleton - only show if no low quality src and still loading */}
      {isLoading && !lowQualitySrc && !props.fill && (
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse w-full h-full" />
      )}
      
      {/* Low quality placeholder */}
      {lowQualitySrc && isLoading && !hasError && (
        <Image
          src={lowQualitySrc}
          alt={alt}
          className={`blur-sm ${className || ''}`}
          onLoad={() => {}} // Prevent this from triggering main onLoad
          {...props}
        />
      )}
      
      {/* Main image */}
      {!hasError && (
        <Image
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className || ''}`}
          {...props}
        />
      )}
      
      {/* Error fallback */}
      {hasError && !fallbackSrc && !props.fill && (
        <div className="flex items-center justify-center bg-gray-100 text-gray-500 text-sm w-full h-full">
          Failed to load image
        </div>
      )}
    </>
  )
}

export default OptimizedImage
