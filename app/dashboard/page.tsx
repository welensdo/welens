"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  totalPrice: number;
  items: Array<{
    eye: string;
    type: string;
    value: number;
  }>;
  trackingNumber?: string;
  createdAt: string;
  statusHistory: Array<{
    status: string;
    date: string;
    note?: string;
  }>;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  manufacturing: "Fabricando",
  quality_check: "Control de calidad",
  packaging: "Empacando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  manufacturing: "bg-purple-100 text-purple-800",
  quality_check: "bg-indigo-100 text-indigo-800",
  packaging: "bg-pink-100 text-pink-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Check auth
      const userRes = await fetch("/api/auth/me");
      if (!userRes.ok) {
        router.push("/auth");
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      // Load orders
      const ordersRes = await fetch("/api/orders");
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders);

        // Check if there's a new order to show
        const newOrderNumber = searchParams?.get("order");
        if (newOrderNumber) {
          const newOrder = ordersData.orders.find(
            (o: Order) => o.orderNumber === newOrderNumber
          );
          if (newOrder) setSelectedOrder(newOrder);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <p className="text-slate">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />

      <div className="pt-24 pb-20 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">
                Dashboard
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-tight">
                Hola, {user?.name}
              </h1>
              <p className="text-body text-slate mt-2">
                Gestiona tus pedidos y configuración
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-studio-mist hover:bg-control-gray text-ink rounded-full font-medium transition-colors"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-ink">Tus pedidos</h2>

            {orders.length === 0 ? (
              <div className="bg-studio-mist rounded-3xl p-12 text-center">
                <p className="text-slate mb-6">Aún no tienes pedidos</p>
                <button
                  onClick={() => router.push("/configurador")}
                  className="px-8 py-4 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full font-semibold transition-colors"
                >
                  Hacer tu primer pedido
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gallery-white border border-hairline-silver rounded-3xl p-6 lg:p-8 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div>
                        <p className="text-xl font-semibold text-ink mb-1">
                          Pedido #{order.orderNumber}
                        </p>
                        <p className="text-body-small text-slate">
                          {new Date(order.createdAt).toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-4 py-2 rounded-full text-compact-control font-medium ${
                            statusColors[order.status]
                          }`}
                        >
                          {statusLabels[order.status]}
                        </span>
                        <span className="text-xl font-semibold text-ink">
                          ${order.totalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-studio-mist rounded-2xl px-4 py-2"
                        >
                          <span className="text-compact-control text-ink capitalize">
                            {item.eye === "left" ? "Izq" : "Der"}: {item.type}{" "}
                            {item.value > 0 ? "+" : ""}
                            {item.value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.trackingNumber && (
                      <div className="mt-4 pt-4 border-t border-hairline-silver">
                        <p className="text-body-small text-slate">
                          Número de rastreo:{" "}
                          <span className="font-medium text-ink">
                            {order.trackingNumber}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-gallery-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-2">
                  Pedido #{selectedOrder.orderNumber}
                </h2>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-compact-control font-medium ${
                    statusColors[selectedOrder.status]
                  }`}
                >
                  {statusLabels[selectedOrder.status]}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate hover:text-ink transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-ink mb-4">
                Estado del pedido
              </h3>
              <div className="space-y-4">
                {selectedOrder.statusHistory
                  .slice()
                  .reverse()
                  .map((history, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-pricing-blue" />
                        {idx < selectedOrder.statusHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-hairline-silver my-1" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-semibold text-ink">
                          {statusLabels[history.status]}
                        </p>
                        <p className="text-body-small text-slate">
                          {new Date(history.date).toLocaleString("es-MX")}
                        </p>
                        {history.note && (
                          <p className="text-body-small text-slate mt-1">
                            {history.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-ink mb-4">
                Detalles del pedido
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-studio-mist rounded-2xl p-4 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold text-ink capitalize">
                        Ojo {item.eye === "left" ? "izquierdo" : "derecho"}
                      </p>
                      <p className="text-body-small text-slate capitalize">
                        {item.type} •{" "}
                        {item.value > 0 ? "+" : ""}
                        {item.value.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-hairline-silver">
              <div className="flex justify-between text-xl font-semibold">
                <span className="text-ink">Total</span>
                <span className="text-ink">${selectedOrder.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
