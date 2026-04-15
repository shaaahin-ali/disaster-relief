"use client";

import React, { useEffect, useRef, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const headlineBottom = [
  "where",
  "calm",
  "structure",
  "and",
  "clear",
  "focus",
  "meet",
  "the",
  "moment.",
];

export default function DigitalSerenity() {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: "0px",
    top: "0px",
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const animateWords = () => {
      const words = document.querySelectorAll<HTMLElement>(".word-animate");
      words.forEach((word) => {
        const delay = Number.parseInt(word.dataset.delay || "0", 10);
        window.setTimeout(() => {
          word.style.animation = "word-appear 0.8s ease-out forwards";
        }, delay);
      });
    };

    const timeoutId = window.setTimeout(animateWords, 500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseGradientStyle({
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const ripple = { id: Date.now(), x: event.clientX, y: event.clientY };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
      }, 1000);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const wordElements = document.querySelectorAll<HTMLElement>(".word-animate");

    const handleMouseEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.style.textShadow = "0 0 20px rgba(17, 17, 17, 0.15)";
    };

    const handleMouseLeave = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.style.textShadow = "none";
    };

    wordElements.forEach((word) => {
      word.addEventListener("mouseenter", handleMouseEnter);
      word.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      wordElements.forEach((word) => {
        word.removeEventListener("mouseenter", handleMouseEnter);
        word.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLDivElement>(".floating-element-animate"),
    );
    floatingElementsRef.current = elements;

    const handleScroll = () => {
      if (scrolled) {
        return;
      }

      setScrolled(true);
      floatingElementsRef.current.forEach((element, index) => {
        window.setTimeout(() => {
          element.style.animationPlayState = "running";
          element.style.opacity = "";
        }, (Number.parseFloat(element.style.animationDelay || "0") * 1000) + index * 100);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(17, 17, 17, 0.05), rgba(17, 17, 17, 0.02), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
    }
    @keyframes word-appear { 0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes grid-draw { 0% { stroke-dashoffset: 1000; opacity: 0; } 50% { opacity: 0.24; } 100% { stroke-dashoffset: 0; opacity: 0.16; } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.12; transform: scale(1); } 50% { opacity: 0.32; transform: scale(1.1); } }
    @keyframes underline-grow { to { width: 100%; } }
    @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 25% { transform: translateY(-10px) translateX(5px); opacity: 0.5; } 50% { transform: translateY(-5px) translateX(-3px); opacity: 0.3; } 75% { transform: translateY(-15px) translateX(7px); opacity: 0.6; } }
    .word-animate { display: inline-block; opacity: 0; margin: 0 0.1em; transition: color 0.3s ease, transform 0.3s ease; }
    .word-animate:hover { color: #141414; transform: translateY(-2px); }
    .grid-line { stroke: rgba(17, 17, 17, 0.24); stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw 2s ease-out forwards; }
    .detail-dot { fill: #141414; opacity: 0; animation: pulse-glow 3s ease-in-out infinite; }
    .corner-element-animate { position: absolute; width: 40px; height: 40px; border: 1px solid rgba(17, 17, 17, 0.12); opacity: 0; animation: word-appear 1s ease-out forwards; }
    .text-decoration-animate { position: relative; }
    .text-decoration-animate::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg, transparent, #141414, transparent); animation: underline-grow 2s ease-out forwards; animation-delay: 2s; }
    .floating-element-animate { position: absolute; width: 2px; height: 2px; background: #141414; border-radius: 50%; opacity: 0; animation: float 4s ease-in-out infinite; animation-play-state: paused; }
    .ripple-effect { position: fixed; width: 4px; height: 4px; background: rgba(17, 17, 17, 0.4); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: pulse-glow 1s ease-out forwards; z-index: 9999; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="relative min-h-screen overflow-hidden bg-background font-body text-foreground">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="gridReactDarkResponsive" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(17,17,17,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridReactDarkResponsive)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
        </svg>

        <div className="corner-element-animate left-4 top-4 sm:left-6 sm:top-6 md:left-8 md:top-8" style={{ animationDelay: "4s" }} />
        <div className="corner-element-animate right-4 top-4 sm:right-6 sm:top-6 md:right-8 md:top-8" style={{ animationDelay: "4.2s" }} />
        <div className="corner-element-animate bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8" style={{ animationDelay: "4.4s" }} />
        <div className="corner-element-animate bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8" style={{ animationDelay: "4.6s" }} />

        <div className="floating-element-animate" style={{ top: "25%", left: "15%", animationDelay: "0.5s" }} />
        <div className="floating-element-animate" style={{ top: "60%", left: "85%", animationDelay: "1s" }} />
        <div className="floating-element-animate" style={{ top: "40%", left: "10%", animationDelay: "1.5s" }} />
        <div className="floating-element-animate" style={{ top: "75%", left: "90%", animationDelay: "2s" }} />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20">
          <div className="text-center">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted sm:text-sm">
              <span className="word-animate" data-delay="0">Quiet systems</span>
              <span className="word-animate" data-delay="300">clear response.</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-5xl text-center">
            <h1 className="text-decoration-animate font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              <div className="mb-4 md:mb-6">
                <span className="word-animate" data-delay="700">Find</span>
                <span className="word-animate" data-delay="850">your</span>
                <span className="word-animate" data-delay="1000">center,</span>
              </div>
              <div className="text-xl font-normal leading-relaxed tracking-wide text-text-secondary sm:text-2xl md:text-3xl lg:text-4xl">
                {headlineBottom.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="word-animate"
                    data-delay={String(1400 + index * 150)}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>
          </div>

          <div className="text-center">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted sm:text-sm">
              <span className="word-animate" data-delay="3000">Observe,</span>
              <span className="word-animate" data-delay="3200">prioritize,</span>
              <span className="word-animate" data-delay="3400">respond.</span>
            </h2>
          </div>
        </div>

        <div
          id="mouse-gradient-react"
          className="h-60 w-60 blur-xl sm:h-80 sm:w-80 sm:blur-2xl md:h-96 md:w-96 md:blur-3xl"
          style={mouseGradientStyle}
        />

        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </div>
    </>
  );
}
