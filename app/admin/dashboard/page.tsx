"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

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
  userId: {
    name: string;
    email: string;
  };
  shippingAddress: {
    name: string;
    address?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  statusHistory: Array<{
    status: string;
    date: string;
    note?: string;
  }>;
}

const statusOptions = [
  { value: "pending", label: "Pendiente" },
  { value: "processing", label: "En proceso" },
  { value: "manufacturing", label: "Fabricando" },
  { value: "quality_check", label: "Control de calidad" },
  { value: "packaging", label: "Empacando" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

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

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [updateForm, setUpdateForm] = useState({
    status: "",
    trackingNumber: "",
    note: "",
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) {
        router.push("/admin/login");
        return;
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error loading orders:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setUpdateLoading(true);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder._id,
          status: updateForm.status,
          trackingNumber: updateForm.trackingNumber || undefined,
          note: updateForm.note || undefined,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      await loadOrders();
      setSelectedOrder(null);
      setUpdateForm({ status: "", trackingNumber: "", note: "" });
    } catch (error) {
      alert("Error al actualizar el pedido");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => ['processing', 'manufacturing', 'quality_check', 'packaging'].includes(o.status)).length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
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
      <div className="border-b border-hairline-silver bg-gallery-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-semibold text-ink">WeLens Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-studio-mist hover:bg-control-gray text-ink rounded-full font-medium transition-colors text-compact-control"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">
            Dashboard
          </Badge>
          <h1 className="text-4xl font-semibold text-ink mb-8">
            Panel de control
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6">
              <p className="text-body-small text-slate mb-1">Total</p>
              <p className="text-3xl font-semibold text-ink">{stats.total}</p>
            </div>
            <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6">
              <p className="text-body-small text-slate mb-1">Pendientes</p>
              <p className="text-3xl font-semibold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6">
              <p className="text-body-small text-slate mb-1">En proceso</p>
              <p className="text-3xl font-semibold text-blue-600">{stats.processing}</p>
            </div>
            <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6">
              <p className="text-body-small text-slate mb-1">Enviados</p>
              <p className="text-3xl font-semibold text-green-600">{stats.shipped}</p>
            </div>
            <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6">
              <p className="text-body-small text-slate mb-1">Entregados</p>
              <p className="text-3xl font-semibold text-green-800">{stats.delivered}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-full text-compact-control font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-ink text-gallery-white"
                  : "bg-studio-mist text-ink hover:bg-control-gray"
              }`}
            >
              Todos ({orders.length})
            </button>
            {statusOptions.map((status) => {
              const count = orders.filter(o => o.status === status.value).length;
              return (
                <button
                  key={status.value}
                  onClick={() => setFilterStatus(status.value)}
                  className={`px-4 py-2 rounded-full text-compact-control font-medium transition-colors ${
                    filterStatus === status.value
                      ? "bg-ink text-gallery-white"
                      : "bg-studio-mist text-ink hover:bg-control-gray"
                  }`}
                >
                  {status.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gallery-white border border-hairline-silver rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-studio-mist">
                <tr>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Pedido
                  </th>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Cliente
                  </th>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Estado
                  </th>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Fecha
                  </th>
                  <th className="text-left px-6 py-4 text-body-small font-semibold text-ink">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline-silver">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate">
                      No hay pedidos con este filtro
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-studio-mist/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-ink">#{order.orderNumber}</p>
                        {order.trackingNumber && (
                          <p className="text-compact-control text-slate">
                            📦 {order.trackingNumber}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-ink">{order.userId.name}</p>
                        <p className="text-compact-control text-slate">{order.userId.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-compact-control font-medium ${statusColors[order.status]}`}>
                          {statusOptions.find(s => s.value === order.status)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-ink">${order.totalPrice}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-ink">
                          {new Date(order.createdAt).toLocaleDateString("es-MX")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setUpdateForm({
                              status: order.status,
                              trackingNumber: order.trackingNumber || "",
                              note: "",
                            });
                          }}
                          className="px-4 py-2 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full text-compact-control font-medium transition-colors"
                        >
                          Ver / Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Order Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-gallery-white rounded-3xl p-8 max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-2">
                  Pedido #{selectedOrder.orderNumber}
                </h2>
                <p className="text-body-small text-slate">
                  Cliente: {selectedOrder.userId.name} ({selectedOrder.userId.email})
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate hover:text-ink transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Details */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-4">Detalles del pedido</h3>
                
                <div className="space-y-3 mb-6">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="bg-studio-mist rounded-2xl p-4">
                      <p className="font-semibold text-ink capitalize">
                        Ojo {item.eye === "left" ? "izquierdo" : "derecho"}
                      </p>
                      <p className="text-body-small text-slate capitalize">
                        {item.type} • {item.value > 0 ? "+" : ""}{item.value.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-studio-mist rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-ink mb-2">Dirección de envío</h4>
                  <p className="text-body-small text-ink">{selectedOrder.shippingAddress.name}</p>
                  {selectedOrder.shippingAddress.address && (
                    <p className="text-body-small text-slate mb-1">{selectedOrder.shippingAddress.address}</p>
                  )}
                  <p className="text-body-small text-slate">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-body-small text-slate">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-body-small text-slate">{selectedOrder.shippingAddress.country}</p>
                  <p className="text-body-small text-slate">{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="flex justify-between text-xl font-semibold pt-4 border-t border-hairline-silver">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">${selectedOrder.totalPrice}</span>
                </div>
              </div>

              {/* Update Form */}
              <div>
                <h3 className="text-xl font-semibold text-ink mb-4">Actualizar estado</h3>
                
                <form onSubmit={handleUpdateOrder} className="space-y-5">
                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Estado
                    </label>
                    <select
                      value={updateForm.status}
                      onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                      required
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Número de rastreo (opcional)
                    </label>
                    <input
                      type="text"
                      value={updateForm.trackingNumber}
                      onChange={(e) => setUpdateForm({ ...updateForm, trackingNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none"
                      placeholder="Ej: 1234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-ink mb-2">
                      Nota (opcional)
                    </label>
                    <textarea
                      value={updateForm.note}
                      onChange={(e) => setUpdateForm({ ...updateForm, note: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none resize-none"
                      rows={3}
                      placeholder="Información adicional..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="w-full py-4 bg-pricing-blue hover:bg-pricing-blue/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-full font-semibold transition-all shadow-lg"
                  >
                    {updateLoading ? "Actualizando..." : "Actualizar pedido"}
                  </button>
                </form>

                {/* Status History */}
                <div className="mt-8">
                  <h4 className="font-semibold text-ink mb-3">Historial</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedOrder.statusHistory.slice().reverse().map((history, idx) => (
                      <div key={idx} className="bg-studio-mist rounded-2xl p-3">
                        <p className="font-medium text-ink text-body-small">
                          {statusOptions.find(s => s.value === history.status)?.label}
                        </p>
                        <p className="text-compact-control text-slate">
                          {new Date(history.date).toLocaleString("es-MX")}
                        </p>
                        {history.note && (
                          <p className="text-compact-control text-slate mt-1">{history.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
