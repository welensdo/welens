"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export default function PayPalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
        components: "buttons,funding-eligibility",
        "disable-funding": "", // Don't disable any funding sources
        "enable-funding": "venmo,paylater,card", // Enable card payments
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}