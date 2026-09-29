"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  benefit: {
    title: string;
    description: string;
    icon: React.ReactNode;
    fullDescription: string;
    features: string[];
    image?: string;
  };
}

export default function BenefitModal({ isOpen, onClose, benefit }: BenefitModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" />
      
      {/* Modal Container */}
      <div className="relative h-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
          <div 
            className="relative w-full max-w-4xl bg-gallery-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-studio-mist/80 backdrop-blur hover:bg-control-gray transition-colors group"
              aria-label="Cerrar"
            >
              <svg 
                className="w-6 h-6 text-ink group-hover:rotate-90 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8 sm:p-12 lg:p-16">
              {/* Icon & Badge */}
              <div className="mb-6 flex items-center gap-4">
                <div className="text-pricing-blue">{benefit.icon}</div>
                <Badge variant="secondary" className="text-xs">Beneficio WeLens</Badge>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-6">
                {benefit.title}
              </h2>

              {/* Full Description */}
              <p className="text-lg sm:text-xl text-slate leading-relaxed mb-10">
                {benefit.fullDescription}
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {benefit.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pricing-blue/10 flex items-center justify-center mt-1 group-hover:bg-pricing-blue/20 transition-colors">
                      <svg 
                        className="w-4 h-4 text-pricing-blue" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-body text-ink flex-1">{feature}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Empezar ahora
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-studio-mist hover:bg-control-gray text-ink rounded-full font-semibold transition-all"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
