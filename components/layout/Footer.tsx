import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2d2a26] text-[#f5f0e8] px-[10%] pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 mb-12">
        <div>
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="JBS Soaps & Co"
              width={64}
              height={64}
              className="w-14 h-14 object-contain brightness-0 invert"
            />
          </div>
          <p className="text-[#8a8070] text-sm max-w-xs leading-relaxed">
            Handcrafted in Dallas, TX. Botanical soaps made with intention,
            so your skin gets exactly what it deserves.
          </p>
        </div>

        <div>
          <h5 className="text-xs uppercase tracking-widest font-semibold mb-6 text-[#f5f0e8]">
            Explore
          </h5>
          <ul className="space-y-2">
            {[
              { label: "Shop", href: "/shop" },
              { label: "FAQs", href: "/faq" },
              { label: "About", href: "/about" },
              { label: "Our Story", href: "/get-to-know-me" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#8a8070] hover:text-[#f5f0e8] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-xs uppercase tracking-widest font-semibold mb-6 text-[#f5f0e8]">
            Contact
          </h5>
          <ul className="space-y-2 text-sm text-[#8a8070]">
            <li>Dallas / Fort Worth, TX</li>
            <li>
              <a
                href="mailto:Info@JBSSoap.com"
                className="hover:text-[#f5f0e8] transition-colors"
              >
                Info@JBSSoap.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-white/10 pt-8 text-[0.65rem] tracking-widest text-[#8a8070] uppercase">
        &copy; {new Date().getFullYear()} JBS SOAPS & CO. ALL RIGHTS RESERVED. — Made with ❤️🎧 NITPTech
      </div>
    </footer>
  );
}
