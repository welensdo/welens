export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WeLens",
    "description": "Lentillas adhesivas de goma que transforman cualquier lente o gafa de sol en tu graduación perfecta",
    "url": "https://welens.com",
    "logo": "https://welens.com/favicon.png",
    "sameAs": [
      "https://www.instagram.com/welens",
      "https://www.facebook.com/welens",
      "https://twitter.com/welens"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WeLens Products",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "Lentes Adhesivos WeLens",
          "description": "Lentes adhesivos de silicona médica que transforman cualquier gafa en graduada",
          "brand": {
            "@type": "Brand",
            "name": "WeLens"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "50.00",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "WeLens"
            }
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}