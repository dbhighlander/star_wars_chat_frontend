'use client';
import { useInView } from "@/app/hooks/useInView";

export default function HeroSection() {
  const { ref, inView } = useInView(0.6);

  return (
    <section
      data-index="1"
      ref={ref}
      className="h-dvh snap-start flex items-center justify-center"
    >
      <div
        className={`
          text-center transition-all duration-700 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          AI Chatbot Personality Demo
        </h1>

        <p className="mt-6 text-white/60">
          Star Wars themed system prompt switching
        </p>
      </div>
    </section>
  )
}