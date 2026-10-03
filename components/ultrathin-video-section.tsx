"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/ui/animated-section";

export default function UltrathinVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!video || !container || !isVideoReady) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get the absolute position of the video container (EXACT same logic as hero)
      const containerRect = container.getBoundingClientRect();
      const containerTop = scrollPosition + containerRect.top;
      
      // START ANIMATION EARLIER so video reaches frame 0 sooner (EXACT same as hero)
      const animationStart = Math.max(0, containerTop - (windowHeight * 1.5));
      const animationEnd = containerTop + (windowHeight * 2);
      const animationRange = animationEnd - animationStart;
      
      // ALWAYS calculate progress based on current scroll position (not conditional)
      let scrollProgress = 0;
      if (animationRange > 0) {
        scrollProgress = (scrollPosition - animationStart) / animationRange;
      }

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // ALWAYS update video time regardless of direction (up or down scroll)
      if (video.duration && isFinite(video.duration) && video.readyState >= 2) {
        const newTime = clampedProgress * video.duration;
        try {
          video.currentTime = newTime;
        } catch (error) {
          console.error("Error updating video time:", error);
        }
      }

      // Check if video animation is complete (at 95% to allow smooth transition)
      if (clampedProgress >= 0.95) {
        setIsVideoComplete(true);
      } else {
        setIsVideoComplete(false);
      }

      ticking = false;
    };

    // Use requestAnimationFrame for smoother updates AND ensure scroll always works
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // MULTIPLE scroll event listeners to ensure it never loses reception (EXACT same as hero)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true }); // For mobile
    document.addEventListener("scroll", onScroll, { passive: true }); // Backup
    window.addEventListener("resize", handleScroll, { passive: true });

    // Load video metadata and data (copied exactly from hero video)
    const handleLoadedMetadata = () => {
      console.log("Ultrathin video metadata loaded");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleLoadedData = () => {
      console.log("Ultrathin video data loaded");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleCanPlay = () => {
      console.log("Ultrathin video can play");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleError = (e: Event) => {
      console.error("Ultrathin video error:", e);
      setIsVideoReady(false);
    };

    // Add all event listeners (same as hero video)
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Force load the video and set initial time (same as hero video)
    video.load();
    video.addEventListener('loadstart', () => {
      console.log("Ultrathin video load started");
      video.currentTime = 0;
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isVideoReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gallery-white"
      style={{ height: "300vh" }}
      id="como-funciona"
    >
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <AnimatedSection animation="fade-up" className="flex flex-col gap-4 mb-8">
            <div>
              <Badge variant="secondary">Ultra Delgado</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl sm:text-5xl tracking-tight lg:max-w-xl font-semibold text-ink">
                Tecnología invisible, resultados visibles
              </h2>
              <p className="text-body max-w-xl lg:max-w-xl leading-relaxed text-slate">
                Descubre la revolución en lentes. Nuestra tecnología ultra delgada 
                transforma cualquier gafa en tu graduación perfecta, sin comprometer el estilo.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-up" delay={300} className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl select-none bg-studio-mist">
              {/* Video Container */}
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-3xl"
                crossOrigin="anonymous"
              >
                <source src="/ultrathin.MP4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
              </video>

              {/* Progress indicator */}
              {!isVideoComplete && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gallery-white/80 backdrop-blur-sm px-2 py-1 rounded-full z-10">
                  <p className="text-[10px] font-normal text-ink">
                    Desliza para ver la transformación
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}