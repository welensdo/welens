"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/ui/animated-section";

export default function UltrathinVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [lockedScrollPosition, setLockedScrollPosition] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!video || !container || !isVideoReady) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get the absolute position of the video container
      const containerRect = container.getBoundingClientRect();
      const containerTop = scrollPosition + containerRect.top;
      
      // Define when video animation should start and end
      const videoTriggerStart = containerTop - (windowHeight * 0.8);
      const videoTriggerEnd = containerTop - (windowHeight * 0.2);
      
      // Check if we're in the video animation zone
      const isInVideoZone = scrollPosition >= videoTriggerStart && scrollPosition <= videoTriggerEnd;
      
      if (isInVideoZone && !isScrollLocked && !isVideoComplete) {
        // Lock scroll when entering video zone
        setIsScrollLocked(true);
        setLockedScrollPosition(scrollPosition);
      }

      // Calculate video progress when in locked mode
      if (isScrollLocked && !isVideoComplete) {
        // Use scroll delta from locked position to control video
        const scrollDelta = scrollPosition - lockedScrollPosition;
        const maxScrollForVideo = windowHeight * 1.5; // How much scroll needed to complete video
        
        const videoProgress = Math.max(0, Math.min(1, scrollDelta / maxScrollForVideo));
        
        // Update video time
        if (video.duration && isFinite(video.duration) && video.readyState >= 2) {
          const newTime = videoProgress * video.duration;
          try {
            video.currentTime = newTime;
          } catch (error) {
            console.error("Error updating video time:", error);
          }
        }
        
        // Check if video is complete
        if (videoProgress >= 0.95) {
          setIsVideoComplete(true);
          setIsScrollLocked(false);
        }
        
        // Prevent actual scroll when locked (reset to locked position)
        if (scrollPosition !== lockedScrollPosition && videoProgress < 0.95) {
          window.scrollTo(0, lockedScrollPosition);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();
    
    // Add scroll listeners
    window.addEventListener("scroll", onScroll, { passive: false });
    window.addEventListener("touchmove", onScroll, { passive: false });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Video event handlers
    const handleLoadedMetadata = () => {
      console.log("Ultrathin video metadata loaded");
      setIsVideoReady(true);
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleLoadedData = () => {
      console.log("Ultrathin video data loaded");
      setIsVideoReady(true);
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleCanPlay = () => {
      console.log("Ultrathin video can play");
      setIsVideoReady(true);
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleError = (e: Event) => {
      console.error("Ultrathin video error:", e);
      setIsVideoReady(false);
    };

    // Add video event listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Force load the video and set initial time
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
      window.removeEventListener("resize", handleScroll);
    };
  }, [isVideoReady, isScrollLocked, lockedScrollPosition, isVideoComplete]);

  return (
    <div className="w-full py-20 lg:py-40 bg-gallery-white" id="como-funciona">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="flex flex-col gap-4">
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
        
        <AnimatedSection animation="fade-up" delay={300} className="pt-12 w-full">
          <div 
            ref={containerRef}
            className="relative aspect-video w-full h-full overflow-hidden rounded-3xl select-none bg-studio-mist"
          >
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
            {isScrollLocked && !isVideoComplete && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-pricing-blue/90 backdrop-blur-sm px-6 py-3 rounded-full z-10">
                <p className="text-compact-control font-semibold text-gallery-white">
                  🎬 Sigue scrolleando para animar
                </p>
              </div>
            )}

            {/* Initial instruction */}
            {!isScrollLocked && !isVideoComplete && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gallery-white/90 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                <p className="text-compact-control font-semibold text-ink">
                  Desliza para ver la transformación
                </p>
              </div>
            )}

            {/* Completion indicator */}
            {isVideoComplete && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-pricing-blue/90 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                <p className="text-compact-control font-semibold text-gallery-white">
                  ✨ Transformación completa
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}