import React from "react";

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * Reusable component for injecting structured data (JSON-LD) into the page
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      type="application/ld+json"
    />
  );
}
