"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart, items, cartCount, totalPrice, removeItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathname]); // Re-check when pathname changes

  const handleNavClick = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gallery-white/80 backdrop-blur-xl border-b border-hairline-silver shadow-sm py-4"
          : "bg-transparent py-6 sm:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-product-nav-title font-semibold text-ink">
              WeLens
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick("caracteristicas")}
              className="text-global-nav font-normal text-ink hover:text-slate transition-colors"
            >
              Características
            </button>
            <button
              onClick={() => handleNavClick("como-funciona")}
              className="text-global-nav font-normal text-ink hover:text-slate transition-colors"
            >
              Cómo funciona
            </button>
            <button
              onClick={() => handleNavClick("precios")}
              className="text-global-nav font-normal text-ink hover:text-slate transition-colors"
            >
              Precios
            </button>
            <Link
              href="/configurador"
              className="text-global-nav font-normal text-ink hover:text-slate transition-colors"
            >
              Configurador
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {!loading && (
              <>
                {/* User Cart Icon with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowCartDropdown(!showCartDropdown)}
                    className="relative p-2 text-ink hover:text-slate transition-colors"
                    aria-label="Carrito y perfil"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pricing-blue text-gallery-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  {showCartDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-gallery-white rounded-2xl shadow-xl border border-hairline-silver overflow-hidden z-50">
                      {/* User Section */}
                      <div className="p-4 border-b border-hairline-silver">
                        {user ? (
                          <div>
                            <p className="text-sm font-semibold text-ink mb-1">{user.name}</p>
                            <p className="text-xs text-slate mb-3">{user.email}</p>
                            <div className="flex gap-2">
                              <Link
                                href="/dashboard"
                                onClick={() => setShowCartDropdown(false)}
                                className="flex-1 text-center px-3 py-2 bg-studio-mist hover:bg-control-gray rounded-lg text-xs font-medium text-ink transition-colors"
                              >
                                Ir al panel
                              </Link>
                              <button
                                onClick={() => {
                                  handleLogout();
                                  setShowCartDropdown(false);
                                }}
                                className="px-3 py-2 text-xs text-slate hover:text-ink transition-colors"
                              >
                                Salir
                              </button>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href="/auth"
                            onClick={() => setShowCartDropdown(false)}
                            className="block text-center px-4 py-2 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Iniciar sesión
                          </Link>
                        )}
                      </div>

                      {/* Cart Items */}
                      <div className="max-h-64 overflow-y-auto">
                        {cartCount === 0 ? (
                          <div className="p-6 text-center">
                            <p className="text-sm text-slate">Tu carrito está vacío</p>
                          </div>
                        ) : (
                          <div className="p-4 space-y-3">
                            {cart && (
                              <div className="bg-studio-mist rounded-lg p-3">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="text-xs font-semibold text-ink">Lentillas WeLens</p>
                                  <p className="text-xs font-semibold text-ink">${cart.price}</p>
                                </div>
                                <p className="text-[10px] text-slate">
                                  {cart.leftEye.type && `Izq: ${cart.leftEye.value.toFixed(2)}`}
                                  {cart.leftEye.type && cart.rightEye.type && " • "}
                                  {cart.rightEye.type && `Der: ${cart.rightEye.value.toFixed(2)}`}
                                </p>
                              </div>
                            )}
                            {items.map((item) => (
                              <div key={item.id} className="bg-studio-mist rounded-lg p-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-ink">
                                      {item.type === 'accessory' ? item.name : 'Lentes graduados'}
                                    </p>
                                    <p className="text-[10px] text-slate">Cantidad: {item.quantity}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-semibold text-ink">
                                      €{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="text-slate hover:text-red-500 transition-colors"
                                      aria-label="Eliminar"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer with Total and Checkout */}
                      {cartCount > 0 && (
                        <div className="p-4 border-t border-hairline-silver">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-ink">Total:</span>
                            <span className="text-lg font-semibold text-ink">${totalPrice.toFixed(2)}</span>
                          </div>
                          <Link
                            href="/checkout"
                            onClick={() => setShowCartDropdown(false)}
                            className="block w-full text-center px-4 py-3 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full text-sm font-semibold transition-colors"
                          >
                            Ir a checkout
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Link
                  href="/configurador"
                  className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-colors"
                >
                  Comprar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
