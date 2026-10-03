"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import PayPalCheckout from "@/components/PayPalCheckout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/lib/countries";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, items, cartCount, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [shippingData, setShippingData] = useState({
    name: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "República Dominicana",
    phone: "",
  });

  useEffect(() => {
    // Don't redirect if order was just completed
    if (orderCompleted) return;
    
    // Check if cart is empty first (no cart and no items)
    if (!cart && items.length === 0) {
      router.push("/configurador");
      return;
    }

    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          // Not logged in, redirect to auth with return url
          router.push("/auth?redirect=checkout");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setShippingData(prev => ({
            ...prev,
            name: data.user.name,
          }));
        }
      })
      .catch(() => {
        router.push("/auth?redirect=checkout");
      });
  }, [cart, items, orderCompleted, router]); // Fixed dependencies

  const createWeLensOrder = useCallback(async (paymentData: any) => {
    setLoading(true);
    try {
      // Prepare all items for the order (same logic as before)
      const orderItems = [];

      // Add legacy cart items (backward compatibility)
      if (cart) {
        if (cart.leftEye.type) {
          orderItems.push({
            itemType: 'lens',
            eye: "left",
            type: cart.leftEye.type,
            value: cart.leftEye.value,
            price: cart.rightEye.type ? cart.price / 2 : cart.price,
          });
        }

        if (cart.rightEye.type) {
          orderItems.push({
            itemType: 'lens',
            eye: "right",
            type: cart.rightEye.type,
            value: cart.rightEye.value,
            price: cart.leftEye.type ? cart.price / 2 : cart.price,
          });
        }
      }

      // Add new cart items (lenses + accessories)
      items.forEach((item) => {
        if (item.type === 'lens') {
          const hasLeftEye = item.leftEye.type;
          const hasRightEye = item.rightEye.type;
          const eyeCount = (hasLeftEye ? 1 : 0) + (hasRightEye ? 1 : 0);
          const pricePerEye = eyeCount > 1 ? item.price / 2 : item.price;

          if (hasLeftEye) {
            orderItems.push({
              itemType: 'lens',
              eye: "left",
              type: item.leftEye.type,
              value: item.leftEye.value,
              price: pricePerEye,
            });
          }
          if (hasRightEye) {
            orderItems.push({
              itemType: 'lens',
              eye: "right",
              type: item.rightEye.type,
              value: item.rightEye.value,
              price: pricePerEye,
            });
          }
        } else if (item.type === 'accessory') {
          orderItems.push({
            itemType: 'accessory',
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity,
          });
        }
      });

      if (orderItems.length === 0) {
        throw new Error("El carrito está vacío");
      }

      // Create order in our database
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          totalPrice: totalPrice,
          shippingAddress: shippingData,
          paymentMethod: 'paypal',
          paymentDetails: {
            captureID: paymentData.captureID,
            payerEmail: paymentData.payerEmail,
            amount: paymentData.amount,
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el pedido");
      }

      console.log('Order created successfully:', data.order);
      console.log('Redirecting to:', `/thank-you?order=${data.order.orderNumber}`);
      
      // Mark order as completed to prevent useEffect redirect
      setOrderCompleted(true);
      
      // Clear cart and redirect
      clearCart();
      router.push(`/thank-you?order=${data.order.orderNumber}`);
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [cart, items, totalPrice, shippingData, router, clearCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare all items for the order
      const orderItems = [];

      // Add legacy cart items (backward compatibility)
      if (cart) {
        // For legacy cart, the price is for both eyes combined, so we don't divide
        if (cart.leftEye.type) {
          orderItems.push({
            itemType: 'lens',
            eye: "left",
            type: cart.leftEye.type,
            value: cart.leftEye.value,
            price: cart.rightEye.type ? cart.price / 2 : cart.price, // Only divide if both eyes exist
          });
        }

        if (cart.rightEye.type) {
          orderItems.push({
            itemType: 'lens',
            eye: "right",
            type: cart.rightEye.type,
            value: cart.rightEye.value,
            price: cart.leftEye.type ? cart.price / 2 : cart.price, // Only divide if both eyes exist
          });
        }
      }

      // Add new cart items (lenses + accessories)
      items.forEach((item) => {
        if (item.type === 'lens') {
          // For new cart items, the price should be divided only if both eyes exist
          const hasLeftEye = item.leftEye.type;
          const hasRightEye = item.rightEye.type;
          const eyeCount = (hasLeftEye ? 1 : 0) + (hasRightEye ? 1 : 0);
          const pricePerEye = eyeCount > 1 ? item.price / 2 : item.price;

          if (hasLeftEye) {
            orderItems.push({
              itemType: 'lens',
              eye: "left",
              type: item.leftEye.type,
              value: item.leftEye.value,
              price: pricePerEye,
            });
          }
          if (hasRightEye) {
            orderItems.push({
              itemType: 'lens',
              eye: "right",
              type: item.rightEye.type,
              value: item.rightEye.value,
              price: pricePerEye,
            });
          }
        } else if (item.type === 'accessory') {
          // Add accessory items
          orderItems.push({
            itemType: 'accessory',
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity, // Total price for the quantity
          });
        }
      });

      if (orderItems.length === 0) {
        throw new Error("El carrito está vacío");
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          totalPrice: totalPrice,
          shippingAddress: shippingData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el pedido");
      }

      console.log('Order created successfully:', data.order);
      console.log('Redirecting to:', `/thank-you?order=${data.order.orderNumber}`);
      
      // Mark order as completed to prevent useEffect redirect
      setOrderCompleted(true);
      
      // Redirect to thank you page
      router.push(`/thank-you?order=${data.order.orderNumber}`);
      
      // Clear cart after redirect
      setTimeout(() => {
        clearCart();
      }, 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if ((!cart && items.length === 0) || !user) {
    return <div className="min-h-screen bg-gallery-white" />;
  }

  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />

      <div className="pt-24 pb-20 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              Checkout
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-tight mb-4">
              Finaliza tu pedido
            </h1>
            <p className="text-body text-slate">
              Estás a un paso de transformar tus gafas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <div>
              <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-ink mb-6">
                  Dirección de envío
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-body-small text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={shippingData.name}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Dirección completa
                    </label>
                    <textarea
                      value={shippingData.address}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, address: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none resize-none"
                      placeholder="Calle, número, apartamento, piso, etc."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      País
                    </label>
                    <select
                      value={shippingData.country}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem'
                      }}
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Calle y número
                    </label>
                    <input
                      type="text"
                      value={shippingData.street}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, street: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-body-small font-medium text-ink mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-small font-medium text-ink mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, state: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-body-small font-medium text-ink mb-2">
                        Código postal
                      </label>
                      <input
                        type="text"
                        value={shippingData.zipCode}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, zipCode: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-body-small font-medium text-ink mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-studio-mist rounded-3xl p-8 sticky top-24">
                <h2 className="text-2xl font-semibold text-ink mb-6">
                  Resumen del pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {/* Show legacy cart items OR new cart items, not both */}
                  {cart && (cart.leftEye.type || cart.rightEye.type) ? (
                    /* Legacy cart display */
                    <>
                      {cart.leftEye.type && (
                        <div className="bg-gallery-white rounded-2xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-ink">Ojo izquierdo</p>
                              <p className="text-body-small text-slate capitalize">
                                {cart.leftEye.type}
                              </p>
                            </div>
                            <p className="font-semibold text-ink">
                              {cart.leftEye.value > 0 ? "+" : ""}
                              {cart.leftEye.value.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}

                      {cart.rightEye.type && (
                        <div className="bg-gallery-white rounded-2xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-ink">Ojo derecho</p>
                              <p className="text-body-small text-slate capitalize">
                                {cart.rightEye.type}
                              </p>
                            </div>
                            <p className="font-semibold text-ink">
                              {cart.rightEye.value > 0 ? "+" : ""}
                              {cart.rightEye.value.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* New cart items display */
                    items.map((item) => (
                      <div key={item.id} className="bg-gallery-white rounded-2xl p-4">
                        {item.type === 'lens' ? (
                          <>
                            {item.leftEye.type && (
                              <div className="flex justify-between items-start mb-3 pb-3 border-b border-hairline-silver">
                                <div>
                                  <p className="font-semibold text-ink">Ojo izquierdo</p>
                                  <p className="text-body-small text-slate capitalize">
                                    {item.leftEye.type}
                                  </p>
                                </div>
                                <p className="font-semibold text-ink">
                                  {item.leftEye.value > 0 ? "+" : ""}
                                  {item.leftEye.value.toFixed(2)}
                                </p>
                              </div>
                            )}
                            {item.rightEye.type && (
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-ink">Ojo derecho</p>
                                  <p className="text-body-small text-slate capitalize">
                                    {item.rightEye.type}
                                  </p>
                                </div>
                                <p className="font-semibold text-ink">
                                  {item.rightEye.value > 0 ? "+" : ""}
                                  {item.rightEye.value.toFixed(2)}
                                </p>
                              </div>
                            )}
                            {/* Remove price display for lens items - only show graduations */}
                          </>
                        ) : (
                          /* Only show accessories with price */
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-ink">{item.name}</p>
                              <p className="text-body-small text-slate">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-ink">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/* Additional accessories from new cart (if any exist alongside legacy cart) */}
                  {cart && (cart.leftEye.type || cart.rightEye.type) && items.filter(item => item.type === 'accessory').map((item) => (
                    <div key={item.id} className="bg-gallery-white rounded-2xl p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-ink">{item.name}</p>
                          <p className="text-body-small text-slate">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-ink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-hairline-silver pt-4 space-y-3">
                  <div className="flex justify-between text-body-small">
                    <span className="text-slate">Subtotal</span>
                    <span className="text-ink font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body-small">
                    <span className="text-slate">Envío</span>
                    <span className="text-pricing-blue font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-hairline-silver">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>



                {/* Payment Section */}
                <div className="mt-8 pt-6 border-t border-hairline-silver">
                  <h3 className="text-lg font-semibold text-ink mb-4">
                    Finalizar pago
                  </h3>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="text-body-small text-red-600">{error}</p>
                    </div>
                  )}
                  
                  {/* PayPal Checkout */}
                  <PayPalCheckout
                    totalPrice={totalPrice}
                    onSuccess={createWeLensOrder}
                    onError={setError}
                    disabled={!shippingData.name || !shippingData.address || loading}
                  />


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
