"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en la solicitud");
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-ink to-slate flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-semibold text-gallery-white">
            WeLens Admin
          </span>
        </div>

        {/* Card */}
        <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-8 lg:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Panel de administración
            </Badge>
            <h1 className="text-3xl font-semibold text-ink mb-2">
              Acceso restringido
            </h1>
            <p className="text-body-small text-slate">
              Solo personal autorizado
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-body-small text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-body-small font-medium text-ink mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-body-small font-medium text-ink mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-ink hover:bg-ink/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? "Verificando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-compact-control text-gallery-white/70">
            🔒 Conexión segura y cifrada
          </p>
        </div>
      </div>
    </main>
  );
}
