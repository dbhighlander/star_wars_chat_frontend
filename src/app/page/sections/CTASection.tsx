'use client';
import { useInView } from "@/app/hooks/useInView";

export default function CTASection() {
  const { ref, inView } = useInView(0.6);

  return (
    <section
      data-index="3"
      ref={ref}
      className="h-screen snap-start flex items-center justify-center"
    >
      <div
        className={`
          text-center transition-all duration-700 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >

        <h2 className="text-3xl font-semibold">Try the Chat</h2>
        <p className="opacity-60 mt-2">
          Use the assistant in the bottom-right corner
        </p>
      </div>
    </section>
  )
}