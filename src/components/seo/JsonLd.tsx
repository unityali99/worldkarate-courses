import React from "react";

interface JsonLdProps {
  /** A schema.org object, or an array of them (multi-entity graph). */
  data: object | object[];
}

/**
 * Renders server-side JSON-LD structured data. Used inside Server Components
 * (layouts and pages) so crawlers receive fully-rendered markup.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
