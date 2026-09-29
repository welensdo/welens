"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const animations = {
    "fade-up": "opacity-0 translate-y-8",
    "fade-in": "opacity-0",
    "fade-left": "opacity-0 -translate-x-8",
    "fade-right": "opacity-0 translate-x-8",
    "scale-up": "opacity-0 scale-95",
  };

  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClass : animations[animation]
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
