"use client";

import { useEffect, useState } from "react";
import { Star } from "../types/types";

export default function Background() {
  const [activeScene, setActiveScene] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);

  // Detect which snap section is active
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index")
            );

            setActiveScene(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => {
      const layer = Math.random();

      return {
        x: Math.random() * 100,
        y: Math.random() * 100,

        size:
          layer < 0.6
            ? Math.random() * 1.2 + 0.5
            : layer < 0.9
            ? Math.random() * 1.8 + 1
            : Math.random() * 2.5 + 1.5,

        opacity:
          layer < 0.6
            ? Math.random() * 0.3 + 0.15
            : layer < 0.9
            ? Math.random() * 0.4 + 0.2
            : Math.random() * 0.6 + 0.3,

        duration: Math.random() * 4 + 2,
        delay: 0,
        layer,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">

      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-[1800ms] ease-out"
        style={{
          transform: `translateY(${activeScene * -30}px)`,
        }}
      >
        <div className="absolute w-[700px] h-[700px] bg-blue-500/10 blur-[140px] rounded-full" />

        <div
          className="absolute w-[500px] h-[500px]
                     bg-purple-500/10 blur-[160px]
                     rounded-full translate-x-16 translate-y-12"
        />

        <div
          className="absolute w-[300px] h-[300px]
                     bg-cyan-400/10 blur-[120px]
                     rounded-full -translate-x-16"
        />
      </div>

      <div
        className="absolute inset-0 transition-transform duration-[1600ms] ease-out"
        style={{
          transform: `translateY(${activeScene * -12}px) scale(${
            1 + activeScene * 0.015
          })`,
        }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              star.layer > 0.85
                ? "bg-blue-100/80"
                : "bg-white"
            }`}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow:
                star.layer > 0.85
                  ? "0 0 10px rgba(255,255,255,0.9)"
                  : "0 0 6px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}