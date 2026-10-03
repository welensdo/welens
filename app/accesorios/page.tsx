"use client";

import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";

export default function AccesoriosPage() {
  const { addAccessory } = useCart();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const products = [
    {
      name: "Kit de limpieza profesional",
      price: 19.99,
      description: "Kit completo con spray limpiador, paño de microfibra y estuche protector",
    },
    {
      name: "Estuche premium",
      price: 14.99,
      description: "Estuche rígido con protección UV para guardar tus lentillas WeLens",
    },
    {
      name: "Paños de microfibra (pack 3)",
      price: 9.99,
      description: "Pack de 3 paños de microfibra de alta calidad para limpieza diaria",
    },
    {
      name: "Cordón de seguridad",
      price: 12.99,
      description: "Cordón ajustable para mantener tus gafas siempre seguras",
    },
    {
      name: "Solución adhesiva extra",
      price: 8.99,
      description: "Botella adicional de solución adhesiva hipoalergénica (30ml)",
    },
    {
      name: "Aplicador de precisión",
      price: 16.99,
      description: "Herramienta de precisión para aplicar tus lentillas WeLens perfectamente",
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addAccessory({
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    setAddedProduct(product.name);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  const handleAddBundle = () => {
    addAccessory({
      name: "Pack Completo",
      price: 62.95,
      quantity: 1,
    });
    setAddedProduct("Pack Completo");
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Accesorios WeLens
            </h1>
            <p className="text-body-large text-slate mb-8">
              Complementa tu experiencia WeLens con nuestros accesorios premium diseñados
              para el cuidado y mantenimiento óptimo de tus lentillas.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  {product.name}
                </h3>
                <p className="text-compact text-slate mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-hairline-silver">
                  <span className="text-body-emphasized font-semibold text-ink">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-5 py-2 rounded-full transition-colors"
                  >
                    {addedProduct === product.name ? "✓ Añadido" : "Añadir"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bundles Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              Pack Completo
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-6">
              Todos los accesorios esenciales en un solo pack con{" "}
              <span className="font-semibold">25% de descuento</span>
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-body-large text-gallery-white/70 line-through">$83.94</span>
              <span className="text-display-medium font-semibold text-gallery-white">$62.95</span>
            </div>
            <button
              onClick={handleAddBundle}
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              {addedProduct === "Pack Completo" ? "✓ Añadido al carrito" : "Comprar Pack Completo"}
            </button>
          </div>
        </section>

        {/* Care Tips */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Consejos de cuidado
          </h2>
          <div className="space-y-6">
            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Limpieza diaria
              </h3>
              <p className="text-body text-slate">
                Limpia tus lentillas WeLens diariamente con un paño de microfibra seco.
                Evita productos químicos agresivos que puedan dañar el adhesivo.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Almacenamiento
              </h3>
              <p className="text-body text-slate">
                Guarda tus gafas con WeLens en un estuche rígido cuando no las uses.
                Evita la exposición prolongada a temperaturas extremas.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Reemplazo recomendado
              </h3>
              <p className="text-body text-slate">
                Las lentillas WeLens duran hasta 12 meses con el cuidado adecuado.
                Te avisaremos cuando sea momento de renovarlas.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
