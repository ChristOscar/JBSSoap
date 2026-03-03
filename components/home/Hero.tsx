import Link from "next/link";

export default function Hero() {
  return (
    <header
      className="h-[85vh] flex items-center justify-center text-center px-6"
      style={{
        background: `linear-gradient(rgba(245,240,232,0.55), rgba(245,240,232,0.55)), url('https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat`,
      }}
    >
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[4px] text-[#8b6b14] mb-6">
          Est. in Dallas, Texas
        </p>
        <h1 className="font-playfair text-[clamp(2.8rem,5.5vw,4.5rem)] font-normal italic leading-tight mb-6 text-[#2d2a26]">
          Your skin deserves<br />better ingredients.
        </h1>
        <p className="text-[#8a8070] text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          Small-batch, botanically-crafted soaps made with plant-based oils and zero compromise.
          Because what touches your skin matters.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#2d2a26] text-[#f5f0e8] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#8b6b14] transition-colors duration-300"
        >
          Shop the Collection
        </Link>
      </div>
    </header>
  );
}
