"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const dynamic = 'force-dynamic';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    const redirectParam = searchParams?.get("redirect");
    if (redirectParam) {
      setRedirect(redirectParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en la solicitud");
      }

      if (isLogin) {
        if (redirect === "checkout") {
          router.push("/checkout");
        } else {
          router.push("/dashboard");
        }
      } else {
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          if (redirect === "checkout") {
            router.push("/checkout");
          } else {
            router.push("/dashboard");
          }
        } else {
          setIsLogin(true);
          setFormData({ ...formData, password: "" });
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gallery-white flex">
      {/* Left Side - Hero Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-studio-mist">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pricing-blue/10 via-transparent to-ink/5"></div>
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1d1d1f 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }}
          ></div>
        </div>

        {/* Floating Lens Graphics */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-pricing-blue/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-ink/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full">
          <div>
            <Link href="/" className="inline-block mb-12 group">
              <span className="text-3xl font-semibold text-ink group-hover:text-pricing-blue transition-colors">WeLens</span>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight text-ink">
                Tus gafas.
                <br />
                Tu visión.
              </h1>
              <p className="text-xl text-slate max-w-md leading-relaxed">
                Lentillas adhesivas que se adaptan a cualquier montura con tu graduación exacta.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-hairline-silver">
              <div>
                <p className="text-3xl font-semibold mb-2 text-ink">10k+</p>
                <p className="text-sm text-slate">Usuarios activos</p>
              </div>
              <div>
                <p className="text-3xl font-semibold mb-2 text-ink">98%</p>
                <p className="text-sm text-slate">Recomiendan</p>
              </div>
              <div>
                <p className="text-3xl font-semibold mb-2 text-ink">4.9★</p>
                <p className="text-sm text-slate">Valoración</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gallery-white/80 backdrop-blur-sm rounded-2xl p-6 border border-hairline-silver">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pricing-blue to-ink flex items-center justify-center">
                    <svg className="w-6 h-6 text-gallery-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-ink mb-1">Proceso simple y rápido</p>
                  <p className="text-sm text-slate">Configura, compra y recibe en 1-2 semanas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-semibold text-ink">WeLens</span>
            </Link>
          </div>

          {/* Form Container */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-compact-control">
                  {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                </Badge>
                {redirect === "checkout" && (
                  <span className="text-compact-control text-pricing-blue font-medium">
                    • Paso final
                  </span>
                )}
              </div>
              
              <div>
                <h2 className="text-4xl font-semibold text-ink tracking-tight mb-3">
                  {isLogin ? "Bienvenido de nuevo" : "Comienza tu viaje"}
                </h2>
                <p className="text-body text-slate">
                  {redirect === "checkout" 
                    ? "Inicia sesión para completar tu compra"
                    : isLogin
                    ? "Accede a tu cuenta de WeLens"
                    : "Crea tu cuenta y descubre una nueva forma de ver"}
                </p>
              </div>
            </div>

            {/* Alert Messages */}
            {redirect === "checkout" && (
              <div className="bg-pricing-blue/5 border-l-4 border-pricing-blue rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-pricing-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <div>
                    <p className="text-body-small font-medium text-ink">Tu configuración está guardada</p>
                    <p className="text-compact-control text-slate mt-1">Completa el registro para finalizar tu pedido</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-body-small text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-body-small font-medium text-ink">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-4 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-all hover:border-steel"
                    placeholder="Juan Pérez"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-body-small font-medium text-ink">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-all hover:border-steel"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-body-small font-medium text-ink">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-all hover:border-steel"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                {!isLogin && (
                  <p className="text-compact-control text-slate">
                    Mínimo 6 caracteres
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pricing-blue hover:bg-pricing-blue/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-full font-semibold text-body transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
              >
                {loading
                  ? "Procesando..."
                  : isLogin
                  ? "Iniciar sesión"
                  : "Crear cuenta"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-hairline-silver"></div>
              </div>
              <div className="relative flex justify-center text-compact-control">
                <span className="px-4 bg-gallery-white text-slate">o</span>
              </div>
            </div>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-body-small text-slate hover:text-ink transition-colors"
              >
                {isLogin ? (
                  <>
                    ¿No tienes cuenta?{" "}
                    <span className="text-pricing-blue font-semibold">
                      Regístrate gratis
                    </span>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <span className="text-pricing-blue font-semibold">
                      Inicia sesión
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Back to Home */}
            <div className="pt-8 text-center border-t border-hairline-silver">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-body-small text-slate hover:text-ink transition-colors group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-studio-mist flex items-center justify-center"><div className="text-ink">Cargando...</div></div>}>
      <AuthContent />
    </Suspense>
  );
}
