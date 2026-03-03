export default function GetToKnowMe() {
  return (
    <>
      <header className="text-center py-16 md:py-32 px-6 md:px-[10%] bg-[#f5f0e8]">
        <h1 className="font-playfair text-[clamp(2.2rem,6vw,4.5rem)] font-normal italic mb-6 text-[#2d2a26]">
          Our Story
        </h1>
        <p className="max-w-xl mx-auto text-[#8a8070] text-base md:text-lg">
          The woman who started it all — and why she did.
        </p>
      </header>

      <section className="bg-[#faf7f2] py-12 md:py-16 px-6 md:px-[10%]">
        <div className="max-w-3xl mx-auto space-y-7 text-sm text-[#555] leading-relaxed">
          <p>
            Hi, I&apos;m{" "}
            <strong className="text-[#2d2a26]">Shana Adams</strong> — a
            Dallas-based mom, skin health advocate, and the founder of JBS Soaps
            & Co. Before any of that, I was just someone standing in a grocery
            store aisle, reading labels, and feeling increasingly unsettled by
            what I found.
          </p>

          <p>
            Growing up, I was taught that what we eat shapes our health. But
            nobody talked about what we <em>put on</em> our skin — the largest
            organ in the body, absorbing everything it touches. When my kids
            developed sensitivities to commercial soaps, I started asking
            harder questions.
          </p>

          <p>
            I started making soap at home — messy, imperfect, endlessly
            absorbing. My kitchen became a small lab. My family became willing
            test subjects. What started as weekend batches slowly became
            something more: a genuine calling to create products that support
            skin health without any compromise on what goes inside them.
          </p>

          <p>
            JBS stands for{" "}
            <strong className="text-[#2d2a26]">Just Be Simple</strong>. Three
            words that guide every formula I create. Simple ingredients. Simple
            rituals. Simple honesty about what&apos;s in every bar and why.
          </p>

          <p>
            I cure every bar for 4–6 weeks. I test every batch on my own skin.
            I will never sell a product I would not give my children. That
            commitment has never wavered — and it never will.
          </p>

          <p>
            Thank you for finding your way here. Whether you&apos;re seeking
            cleaner skincare for your family, healing sensitive skin, or simply
            reclaiming a small daily ritual for yourself — you belong here.
          </p>

          <div className="pt-10 border-t border-[#e4ddd2]">
            <p className="font-playfair text-xl italic text-[#8b6b14]">
              With gratitude,
            </p>
            <p className="text-xs uppercase tracking-[3px] font-semibold mt-2 text-[#2d2a26]">
              Shana Adams
            </p>
            <p className="text-xs text-[#8a8070] mt-1">
              Founder, JBS Soaps & Co — Dallas, TX
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
