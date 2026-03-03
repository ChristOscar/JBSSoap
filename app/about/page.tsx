import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind JBS Soaps & Co — born of a mother's love for cleaner, safer skincare.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="text-center py-32 px-[10%] bg-[#f5f0e8]">
        <h1 className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] font-normal italic mb-6 text-[#2d2a26]">
          The Soul of the Soap
        </h1>
        <p className="max-w-2xl mx-auto text-[#8a8070] text-lg leading-relaxed">
          A journey from a family kitchen to a wellness-focused studio, driven
          by the belief that what touches your skin should be as pure as what
          you put in your body.
        </p>
      </header>

      {/* Story Section */}
      <section className="bg-[#faf7f2] py-20 px-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] bg-[#ede8e0] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"
              alt="Artisan at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ filter: "grayscale(15%) sepia(10%)" }}
            />
          </div>
          <div>
            <h2 className="font-playfair text-3xl mb-8 text-[#2d2a26]">
              Born of a Mother&apos;s Love
            </h2>
            <p className="text-sm text-[#555] leading-relaxed mb-5">
              JBS Soaps & Co. wasn&apos;t born in a boardroom. It started when
              our founder, Shana Adams, began reading the ingredient labels on
              her family&apos;s everyday soaps — and couldn&apos;t pronounce
              half of what she found.
            </p>
            <p className="text-sm text-[#555] leading-relaxed mb-5">
              She believed then what she believes now: what we put <em>on</em>{" "}
              our bodies is just as important as what we put <em>in</em> them.
              That conviction became a mission — to reclaim the daily bathing
              ritual using only earth-derived botanicals, cold-pressed plant
              oils, and rich, nourishing butters.
            </p>
            <p className="text-sm text-[#555] leading-relaxed">
              What started as a labor of love in a Dallas kitchen has grown into
              a dedicated studio where every single bar is hand-poured, cured
              for weeks, and held to an uncompromising standard of purity.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-24 px-[10%] bg-[#f5f0e8]">
        <h2 className="font-playfair text-3xl text-center mb-14 text-[#2d2a26]">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Plant-Based Purity",
              body: "Olive oil. Coconut oil. Shea butter. That's the foundation. No synthetic fragrances, no sulfates, no parabens — ever.",
            },
            {
              title: "Small-Batch Ethics",
              body: "Every bar is made by hand in small batches and cured for 4–6 weeks. Growth will never come at the cost of quality.",
            },
            {
              title: "Total Transparency",
              body: "Every ingredient is listed and explained. You deserve to know exactly what is touching your skin — no exceptions.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="text-center">
              <div className="text-[#8b6b14] text-2xl mb-4">✦</div>
              <h3 className="font-playfair text-xl mb-4 text-[#8b6b14]">
                {title}
              </h3>
              <p className="text-sm text-[#8a8070] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Quote */}
      <section className="py-24 px-[10%] text-center bg-[#faf7f2]">
        <blockquote className="font-playfair text-[1.6rem] italic max-w-3xl mx-auto mb-6 text-[#2d2a26] leading-snug">
          &ldquo;Our goal isn&apos;t just to get you clean. It&apos;s to give
          you a moment of quiet, botanical connection in a loud world.&rdquo;
        </blockquote>
        <div className="text-xs uppercase tracking-[3px] font-semibold text-[#8b6b14]">
          — Shana Adams, Founder
        </div>
      </section>
    </>
  );
}
