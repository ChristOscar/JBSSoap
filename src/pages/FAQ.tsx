import { useState } from "react";

const faqs = [
  {
    q: "Are all your products truly natural?",
    a: "Yes. Every JBS soap and scrub is formulated exclusively with plant-derived ingredients — botanical oils, butters, essential oils, and natural colorants. We never use synthetic fragrances, parabens, sulfates, or petrochemicals.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Absolutely. Our formulas are pH-balanced and free from common irritants. Many of our customers with eczema, psoriasis, and skin allergies have found relief using our bars. That said, we always recommend patch-testing any new product.",
  },
  {
    q: "How long does a bar last?",
    a: "With daily use, each bar lasts approximately 4–6 weeks. Allowing your bar to dry between uses on a well-drained soap dish significantly extends its life.",
  },
  {
    q: "What are your shipping times?",
    a: "Orders are hand-packed and shipped within 2 business days from our Dallas, TX studio. Standard domestic shipping takes 3–5 business days. Expedited options are available at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "We stand behind every bar we make. If you are unsatisfied for any reason, contact us within 14 days of delivery at Info@JBSSoap.com. We offer full refunds or replacements — no questions asked.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes! We work with select spas, boutiques, and wellness studios. Send us a message through our Contact page and we'll respond within 48 hours.",
  },
  {
    q: "How are the products cured?",
    a: "Each bar is cold-processed and cured for a minimum of 4–6 weeks. This curing process allows excess water to evaporate, resulting in a harder, longer-lasting bar with a smoother lather.",
  },
  {
    q: "Can I use your soaps on my face?",
    a: "Our Eucalyptus Face Scrub and Aloe Vera Botanical Bar are specifically formulated for facial use. The remaining bars are body-focused but gentle enough for many face types. We recommend consulting a dermatologist if you have specific skin concerns.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <header className="text-center py-14 md:py-24 px-6 md:px-[10%] bg-[#fdfbf7]">
        <h1 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] font-normal italic mb-4 text-[#2d3436]">
          Frequently Asked Questions
        </h1>
        <p className="text-[#95a5a6] text-sm md:text-base">
          Everything you need to know before you lather up.
        </p>
      </header>

      <section className="px-4 md:px-[10%] pb-16 md:pb-24 max-w-3xl mx-auto">
        <div className="space-y-0 border-t border-[#e0e0e0]">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#e0e0e0]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left text-sm font-semibold text-[#2d3436] hover:text-[#6b8e23] transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4">{faq.q}</span>
                <span className="text-xl leading-none flex-shrink-0 text-[#95a5a6]">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5 text-sm text-[#555] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
