"use client";

import { useInView } from "@/app/hooks/useInView";
import Image from "next/image";
import { getImageFromBotSlug } from "@/app/utils/getImageFromBotSlug";

export default function InfoSection() {
  const { ref, inView } = useInView(0.6);

  const bots = ["yoda", "darth_vader", "dark_helmet"];

  return (
    <section
      ref={ref}
      className="h-screen snap-start flex items-center justify-center"
    >
      <div className="text-center max-w-3xl px-6">

        <div className="flex justify-center gap-10 mb-12">
          {bots.map((slug, i) => (
            <div
              key={slug}
              className={`
                transition-all duration-1000 ease-out
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{
                transitionDelay: inView ? `${200 + i * 250}ms` : "0ms",
              }}
            >
              <Image
                src={getImageFromBotSlug(slug)}
                alt="bot avatar"
                className="
                  w-32 h-32 md:w-40 md:h-40
                  rounded-full object-cover
                  border border-white/20
                  shadow-[0_0_30px_rgba(255,255,255,0.08)]
                "
              />
            </div>
          ))}
        </div>

        <div
          className={`
            transition-all duration-1000 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{
            transitionDelay: inView ? "1100ms" : "0ms",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            What is this?
          </h2>

          <p className="text-white/60 leading-relaxed">
            A frontend demo showing how system prompts change chatbot personality.
            <br />
            Talk to Yoda, Darth Vader, or Dark Helmet.
          </p>
        </div>

      </div>
    </section>
  );
}