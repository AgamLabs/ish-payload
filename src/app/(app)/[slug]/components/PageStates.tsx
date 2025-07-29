import React from "react";

interface PageLoadingProps {
  isHome?: boolean;
}

export function PageLoading({ isHome = false }: PageLoadingProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="mb-8">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        {/* Products/Posts Skeleton (for home page) */}
        {isHome && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PageErrorProps {
  error?: string;
  retry?: () => void;
}

export function PageError({ error = "Something went wrong", retry }: PageErrorProps) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        {retry && (
          <button
            onClick={retry}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
