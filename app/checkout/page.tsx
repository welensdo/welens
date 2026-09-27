"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  const [shippingData, setShippingData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México",
    phone: "",
  });

  useEffect(() => {
    // Check if cart is empty first
    if (!cart) {
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
          setShippingData({
            ...shippingData,
            name: data.user.name,
          });
        }
      })
      .catch(() => {
        router.push("/auth?redirect=checkout");
      });
  }, [cart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!cart) throw new Error("El carrito está vacío");

      const items = [];

      if (cart.leftEye.type) {
        items.push({
          eye: "left",
          type: cart.leftEye.type,
          value: cart.leftEye.value,
          price: cart.price / 2, // Split price
        });
      }

      if (cart.rightEye.type) {
        items.push({
          eye: "right",
          type: cart.rightEye.type,
          value: cart.rightEye.value,
          price: cart.price / 2,
        });
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalPrice: cart.price,
          shippingAddress: shippingData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el pedido");
      }

      clearCart();
      router.push(`/dashboard?order=${data.order.orderNumber}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !user) {
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-pricing-blue hover:bg-pricing-blue/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Procesando..." : `Confirmar pedido • $${cart.price}`}
                  </button>
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
                </div>

                <div className="border-t border-hairline-silver pt-4 space-y-3">
                  <div className="flex justify-between text-body-small">
                    <span className="text-slate">Subtotal</span>
                    <span className="text-ink font-medium">${cart.price}</span>
                  </div>
                  <div className="flex justify-between text-body-small">
                    <span className="text-slate">Envío</span>
                    <span className="text-pricing-blue font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-hairline-silver">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">${cart.price}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-pricing-blue/10 rounded-2xl">
                  <p className="text-compact-control text-ink">
                    ✓ Envío gratuito a todo México
                  </p>
                  <p className="text-compact-control text-ink">
                    ✓ Garantía de satisfacción de 30 días
                  </p>
                  <p className="text-compact-control text-ink">
                    ✓ Tiempo estimado: 4-6 semanas
                  </p>
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
