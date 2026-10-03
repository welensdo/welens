"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Contacto
            </h1>
            <p className="text-body-large text-slate mb-8">
              ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ti.
              Elige la forma de contacto que prefieras.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-display-small font-semibold text-ink mb-8">
                Envíanos un mensaje
              </h2>

              {submitted ? (
                <div className="bg-pricing-blue/10 border border-pricing-blue rounded-3xl p-8 text-center">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-body text-slate">
                    Te responderemos en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-body-emphasized font-semibold text-ink mb-2"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-studio-mist border border-hairline-silver rounded-2xl text-body text-ink focus:outline-none focus:ring-2 focus:ring-pricing-blue focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body-emphasized font-semibold text-ink mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-studio-mist border border-hairline-silver rounded-2xl text-body text-ink focus:outline-none focus:ring-2 focus:ring-pricing-blue focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-body-emphasized font-semibold text-ink mb-2"
                    >
                      Asunto
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-studio-mist border border-hairline-silver rounded-2xl text-body text-ink focus:outline-none focus:ring-2 focus:ring-pricing-blue focus:border-transparent"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="pedido">Consulta sobre pedido</option>
                      <option value="producto">Información de producto</option>
                      <option value="tecnico">Soporte técnico</option>
                      <option value="garantia">Garantía y devoluciones</option>
                      <option value="pro">WeLens Pro</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-body-emphasized font-semibold text-ink mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-studio-mist border border-hairline-silver rounded-2xl text-body text-ink focus:outline-none focus:ring-2 focus:ring-pricing-blue focus:border-transparent resize-none"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-display-small font-semibold text-ink mb-8">
                Otras formas de contacto
              </h2>

              <div className="space-y-6 mb-12">
                <div className="bg-studio-mist rounded-3xl p-8">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                        Email
                      </h3>
                      <p className="text-body text-slate mb-2">
                        Respuesta en menos de 24 horas
                      </p>
                      <a
                        href="mailto:hello@welens.org"
                        className="text-body-emphasized text-pricing-blue hover:text-pricing-blue/80"
                      >
                        hello@welens.org
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-studio-mist rounded-3xl p-8">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                        Teléfono
                      </h3>
                      <p className="text-body text-slate mb-2">
                        Lun-Vie: 9:00 - 18:00 CET
                      </p>
                      <a
                        href="tel:+18095042837"
                        className="text-body-emphasized text-pricing-blue hover:text-pricing-blue/80"
                      >
                        +1 809 504 2837
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-studio-mist rounded-3xl p-8">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                        Chat en vivo
                      </h3>
                      <p className="text-body text-slate mb-2">
                        Lun-Vie: 9:00 - 18:00 CET
                      </p>
                      <button className="text-body-emphasized text-pricing-blue hover:text-pricing-blue/80">
                        Iniciar chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-body-large-emphasized font-semibold text-ink mb-4">
                  Síguenos en redes
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-studio-mist hover:bg-pricing-blue hover:text-gallery-white rounded-full flex items-center justify-center text-ink transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-studio-mist hover:bg-pricing-blue hover:text-gallery-white rounded-full flex items-center justify-center text-ink transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-studio-mist hover:bg-pricing-blue hover:text-gallery-white rounded-full flex items-center justify-center text-ink transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
