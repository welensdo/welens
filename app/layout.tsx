import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import PayPalProvider from "@/components/PayPalProvider";

export const metadata: Metadata = {
  title: "WeLens - Cualquier gafa. Tu graduación.",
  description:
    "Lentillas adhesivas de goma que transforman cualquier lente o gafa de sol en tu graduación perfecta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <PayPalProvider>
          <CartProvider>{children}</CartProvider>
        </PayPalProvider>
      </body>
    </html>
  );
}
