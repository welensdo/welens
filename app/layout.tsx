import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import PayPalProvider from "@/components/PayPalProvider";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "WeLens - Cualquier gafa. Adaptada a ti.",
  description: "Lentillas adhesivas de goma ultra fina que transforman cualquier lente o gafa de sol en tu graduación de vista.",
  keywords: [
    "gafas graduadas",
    "lentes adhesivos",
    "graduación",
    "gafas de sol graduadas",
    "WeLens",
    "lentes de contacto",
    "visión perfecta"
  ],
  authors: [{ name: "WeLens" }],
  creator: "WeLens",
  publisher: "WeLens",
  robots: "index, follow",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://welens.org",
    siteName: "WeLens",
    title: "WeLens - Cualquier gafa, adaptada a ti.",
    description: "🥽 Transforma cualquier gafa en tu graduación de vista. Lentes adhesivos de alta calidad que se adaptan a cualquier montura.",
    images: [
      {
        url: "https://welens.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "WeLens - Lentes adhesivos para cualquier gafa",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@welens",
    creator: "@welens",
    title: "WeLens - Cualquier gafa. Adaptada a ti.",
    description: "🥽 Transforma cualquier gafa en tu graduación de vista. Lentes adhesivos de alta calidad que se adaptan a cualquier montura.",
    images: ["https://welens.org/og-image.png"],
  },
  
  // Additional Meta Tags
  other: {
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "WeLens",
    // WhatsApp specific meta tags
    "og:image": "https://welens.org/og-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  
  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <PayPalProvider>
          <CartProvider>{children}</CartProvider>
        </PayPalProvider>
      </body>
    </html>
  );
}
