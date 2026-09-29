"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

// Utilidades de validación y sanitización
const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant regex (simplified version)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input: string): string => {
  // Remove potential XSS vectors
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove inline event handlers
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
    
    // Validación en tiempo real (solo si el usuario ha empezado a escribir)
    if (email.length > 0 && !validateEmail(email)) {
      setEmailError("Ingresa un correo electrónico válido");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordError("");
    
    // Validación en tiempo real para registro
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
      // Validar email
      if (!validateEmail(formData.email)) {
        throw new Error("Por favor ingresa un correo electrónico válido");
      }

      // Validar contraseña
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.error);
      }

      // Sanitizar inputs
      const sanitizedData = {
        email: sanitizeInput(formData.email.toLowerCase()),
        password: formData.password, // La contraseña no se sanitiza para mantener caracteres especiales
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
    <main className="min-h-screen bg-gallery-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <span className="text-3xl font-semibold text-ink group-hover:text-pricing-blue transition-colors">
              WeLens
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-8 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-ink mb-2">
              {isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </h1>
            <p className="text-body-small text-slate">
              {isLogin 
                ? "Accede a tu cuenta de WeLens" 
                : "Únete a miles de usuarios que ya transforman sus gafas"}
            </p>
          </div>

          {/* Redirect Alert */}
          {redirect === "checkout" && (
            <div className="mb-6 p-4 bg-pricing-blue/5 border border-pricing-blue/20 rounded-2xl">
              <p className="text-compact-control text-ink text-center">
                Inicia sesión para completar tu compra
              </p>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-body-small text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-body-small font-medium text-ink mb-2">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-hairline-silver focus:border-pricing-blue focus:ring-2 focus:ring-pricing-blue/20 focus:outline-none bg-gallery-white text-ink transition-all"
                  placeholder="Juan Pérez"
                  required={!isLogin}
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-body-small font-medium text-ink mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-hairline-silver focus:border-pricing-blue focus:ring-pricing-blue/20'
                } focus:ring-2 focus:outline-none bg-gallery-white text-ink transition-all`}
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
              {emailError && (
                <p className="mt-2 text-compact-control text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-body-small font-medium text-ink mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-hairline-silver focus:border-pricing-blue focus:ring-pricing-blue/20'
                } focus:ring-2 focus:outline-none bg-gallery-white text-ink transition-all`}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              {passwordError && (
                <p className="mt-2 text-compact-control text-red-600">{passwordError}</p>
              )}
              {!isLogin && !passwordError && (
                <p className="mt-2 text-compact-control text-slate">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !!emailError || !!passwordError}
              className="w-full py-3.5 bg-pricing-blue hover:bg-pricing-blue/90 disabled:bg-studio-mist disabled:text-slate text-gallery-white rounded-xl font-semibold transition-all hover:shadow-md active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading
                ? "Procesando..."
                : isLogin
                ? "Iniciar sesión"
                : "Crear cuenta"}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmailError("");
                setPasswordError("");
                setFormData({ email: "", password: "", name: "" });
              }}
              className="text-body-small text-slate hover:text-ink transition-colors"
            >
              {isLogin ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <span className="text-pricing-blue font-semibold">
                    Crear cuenta
                  </span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <span className="text-pricing-blue font-semibold">
                    Iniciar sesión
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-body-small text-slate hover:text-ink transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
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
