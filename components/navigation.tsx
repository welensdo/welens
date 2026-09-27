"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gallery-white/80 backdrop-blur-xl border-b border-hairline-silver">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-3">
          {/* Logo */}
          <Link href="/" className="text-global-nav font-semibold text-ink hover:text-slate transition-colors">
            WeLens
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#producto"
              className="text-global-nav text-ink hover:text-slate transition-colors"
            >
              Producto
            </Link>
            <Link
              href="#caracteristicas"
              className="text-global-nav text-ink hover:text-slate transition-colors"
            >
              Características
            </Link>
            <Link
              href="#como-funciona"
              className="text-global-nav text-ink hover:text-slate transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="/selector"
              className="text-global-nav text-ink hover:text-slate transition-colors"
            >
              Selector
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="text-ink hover:text-slate transition-colors">
              <ShoppingBagIcon className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-ink hover:text-slate transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper-frost border-t border-hairline-silver">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="#producto"
              className="block text-body-small text-ink hover:text-slate transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Producto
            </Link>
            <Link
              href="#caracteristicas"
              className="block text-body-small text-ink hover:text-slate transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Características
            </Link>
            <Link
              href="#como-funciona"
              className="block text-body-small text-ink hover:text-slate transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cómo Funciona
            </Link>
            <Link
              href="/selector"
              className="block text-body-small text-ink hover:text-slate transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Selector
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
