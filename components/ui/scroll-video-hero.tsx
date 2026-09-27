"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    // Ensure video is loaded
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleScroll = () => {
      if (!video || !container || !isVideoLoaded) return;

      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      );

      // Map scroll progress to video time
      if (video.duration) {
        const targetTime = scrollProgress * video.duration;
        
        // Only update if the difference is significant to avoid jank
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isVideoLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gallery-white"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Hero Text */}
        <div className="absolute top-24 sm:top-32 left-0 right-0 z-10 text-center px-4">
          <p className="text-product-kicker font-semibold text-ink mb-2 sm:mb-3">
            Presentamos
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-hero-display font-semibold text-ink mb-4 sm:mb-6 tracking-tight">
            WeLens
          </h1>
          <p className="text-feature-copy text-slate max-w-2xl mx-auto">
            Lentillas adhesivas de goma que transforman cualquier gafa en tus gafas graduadas.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            preload="auto"
            muted
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <source src="/lensvideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Floating CTA - appears as video progresses */}
        <div className="absolute bottom-20 sm:bottom-32 left-0 right-0 z-10 flex justify-center px-4">
          <div className="bg-gallery-white rounded-full px-6 py-3 shadow-subtle flex items-center gap-4">
            <div className="text-center">
              <p className="text-body-small font-semibold text-ink">
                Desde €29.99
              </p>
              <p className="text-compact-control text-slate">
                Envío gratis
              </p>
            </div>
            <button className="bg-pricing-blue hover:bg-pricing-blue/90 text-white font-medium px-6 py-2 rounded-full text-compact-control transition-colors">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
