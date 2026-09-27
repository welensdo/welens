import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-studio-mist border-t border-hairline-silver">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-compact-control font-semibold text-ink mb-4">
              Comprar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/selector" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Selector de Producto
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-compact-control font-semibold text-ink mb-4">
              Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ayuda" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Garantía
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-compact-control font-semibold text-ink mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre-nosotros" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/tecnologia" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Tecnología
                </Link>
              </li>
              <li>
                <Link href="/sostenibilidad" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-compact-control font-semibold text-ink mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacidad" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-compact-control text-slate hover:text-ink transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hairline-silver pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-compact-control text-slate">
              © 2026 WeLens. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-compact-control text-slate hover:text-ink transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-compact-control text-slate hover:text-ink transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-compact-control text-slate hover:text-ink transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
