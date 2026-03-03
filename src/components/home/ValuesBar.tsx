const values = [
  {
    icon: "✦",
    title: "Clean Ingredients Only",
    body: "No sulfates, no parabens, no synthetic fragrances. Every ingredient is plant-derived and purposeful.",
  },
  {
    icon: "✦",
    title: "Small-Batch Crafted",
    body: "Made by hand in small batches in Dallas, TX. Cured for 4–6 weeks so every bar is at peak quality.",
  },
  {
    icon: "✦",
    title: "Skin-First Formula",
    body: "pH-balanced and formulated for sensitive skin. What you put on your body matters as much as what you put in it.",
  },
];

export default function ValuesBar() {
  return (
    <section className="bg-[#faf7f2] border-y border-[#e4ddd2] py-12 md:py-20 px-6 md:px-[10%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
        {values.map(({ icon, title, body }) => (
          <div key={title}>
            <div className="text-[#8b6b14] text-2xl mb-4">{icon}</div>
            <h3 className="font-playfair text-xl mb-3 text-[#2d2a26]">{title}</h3>
            <p className="text-[#8a8070] text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
