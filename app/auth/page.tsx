"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

// Utilidades de validación y sanitización
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};

const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }
  return { valid: true };
};

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setEmailError("");
    
    if (email.length > 0 && !validateEmail(email)) {
      setEmailError("Ingresa un correo electrónico válido");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordError("");
    
    if (!isLogin && password.length > 0) {
      const validation = validatePassword(password);
      if (!validation.valid) {
        setPasswordError(validation.error!);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");

    try {
      if (!validateEmail(formData.email)) {
        throw new Error("Por favor ingresa un correo electrónico válido");
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.error);
      }

      const sanitizedData = {
        email: sanitizeInput(formData.email.toLowerCase()),
        password: formData.password,
        name: formData.name ? sanitizeInput(formData.name) : "",
      };

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(sanitizedData),
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
          credentials: "same-origin",
          body: JSON.stringify({
            email: sanitizedData.email,
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
      {/* Left Side - Elegant Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pricing-blue via-pricing-blue/90 to-pricing-blue/70"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gallery-white/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-gallery-white/15 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full text-gallery-white">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block group">
              <span className="text-4xl font-semibold group-hover:opacity-80 transition-opacity">WeLens</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]">
                Tus gafas.
                <br />
                <span className="text-gallery-white/80">Tu visión perfecta.</span>
              </h1>
              <p className="text-xl leading-relaxed text-gallery-white/90 max-w-md">
                Lentillas adhesivas que transforman cualquier montura en tu graduación exacta.
              </p>
            </div>

            {/* Feature Highlight */}
            <div className="bg-gallery-white/10 backdrop-blur-sm rounded-3xl p-8 border border-gallery-white/20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gallery-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gallery-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proceso revolucionario</h3>
                  <p className="text-gallery-white/80 leading-relaxed">
                    Configura, ordena y recibe en 1-2 semanas. 
                    <br />
                    Instalación en 30 segundos, sin herramientas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="border-t border-gallery-white/20 pt-8">
            <blockquote className="text-lg text-gallery-white/90 italic">
              "La manera más inteligente de usar cualquier gafa que ames."
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-semibold text-ink">WeLens</span>
            </Link>
          </div>

          {/* Form Section */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-semibold text-ink tracking-tight">
                {isLogin ? "Bienvenido" : "Crear cuenta"}
              </h2>
              <p className="text-body text-slate">
                {redirect === "checkout" 
                  ? "Inicia sesión para completar tu compra"
                  : isLogin
                  ? "Accede a tu cuenta de WeLens"
                  : "Únete a la revolución de la visión"}
              </p>
            </div>

            {/* Redirect Alert */}
            {redirect === "checkout" && (
              <div className="bg-pricing-blue/5 border-l-4 border-pricing-blue rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-pricing-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-ink">Tu configuración está guardada</p>
                    <p className="text-xs text-slate mt-1">Solo necesitas iniciar sesión para continuar</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-ink">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value) })}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-hairline-silver focus:border-pricing-blue focus:outline-none bg-gallery-white text-ink transition-all hover:border-steel"
                    placeholder="Juan Pérez"
                    required={!isLogin}
                    autoComplete="name"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-ink">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${
                    emailError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-hairline-silver focus:border-pricing-blue hover:border-steel'
                  } focus:outline-none bg-gallery-white text-ink transition-all`}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-sm text-red-600">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-ink">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${
                    passwordError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-hairline-silver focus:border-pricing-blue hover:border-steel'
                  } focus:outline-none bg-gallery-white text-ink transition-all`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}
                {!isLogin && !passwordError && (
                  <p className="text-sm text-slate">Mínimo 6 caracteres</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !!emailError || !!passwordError}
                className="w-full py-4 bg-pricing-blue hover:bg-pricing-blue/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-2xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed"
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
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gallery-white text-slate">o</span>
              </div>
            </div>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setEmailError("");
                  setPasswordError("");
                  setFormData({ email: "", password: "", name: "" });
                }}
                className="text-sm text-slate hover:text-ink transition-colors"
              >
                {isLogin ? (
                  <>
                    ¿No tienes cuenta?{" "}
                    <span className="text-pricing-blue font-semibold hover:underline">
                      Crear cuenta
                    </span>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <span className="text-pricing-blue font-semibold hover:underline">
                      Iniciar sesión
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Back to Home */}
            <div className="pt-6 text-center border-t border-hairline-silver">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate hover:text-ink transition-colors group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
    <Suspense fallback={
      <div className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-ink">Cargando...</div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}