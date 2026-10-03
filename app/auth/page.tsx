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
    <main className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Image Gallery */}
      <div className="hidden lg:block lg:w-3/5 xl:w-2/3 relative">
        {/* Main Hero Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Floating Image Cards */}
        <div className="absolute top-16 right-16 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl rotate-6 hover:rotate-3 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80" 
            alt="WeLens Product" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-32 left-16 w-80 h-52 rounded-2xl overflow-hidden shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" 
            alt="Lifestyle" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-56 h-36 rounded-2xl overflow-hidden shadow-2xl rotate-12 hover:rotate-6 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&q=80" 
            alt="Technology" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Logo Overlay */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="text-white/90 text-2xl font-light tracking-wider">
            WeLens
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-8">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-12">
            <div className="text-3xl font-light tracking-wider text-gray-900">
              WeLens
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-gray-900 mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm text-gray-500">
              {isLogin 
                ? "Enter your credentials below to sign in" 
                : "Enter your information to create an account"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="Nombre completo"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 ${
                  emailError ? 'focus:ring-red-200 bg-red-50' : 'focus:ring-gray-200'
                } focus:outline-none transition-all`}
                placeholder="Username or email"
                required
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 ${
                  passwordError ? 'focus:ring-red-200 bg-red-50' : 'focus:ring-gray-200'
                } focus:outline-none transition-all`}
                placeholder="Password"
                required
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !!emailError || !!passwordError}
              className="w-full py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
            >
              {loading ? "..." : isLogin ? "Next" : "Create account"}
            </button>
          </form>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          {/* Toggle */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmailError("");
                setPasswordError("");
                setFormData({ email: "", password: "", name: "" });
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isLogin ? (
                <>Don't have an account? <span className="font-medium">Sign up</span></>
              ) : (
                <>Already have an account? <span className="font-medium">Sign in</span></>
              )}
            </button>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to home
            </Link>
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