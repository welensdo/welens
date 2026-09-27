"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-global-nav font-normal text-ink hover:text-slate transition-colors hidden sm:block"
                    >
                      Mi cuenta
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-global-nav font-normal text-slate hover:text-ink transition-colors hidden sm:block"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="text-global-nav font-normal text-ink hover:text-slate transition-colors hidden sm:block"
                  >
                    Iniciar sesión
                  </Link>
                )}
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
