import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SiteShell from "@/components/layout/SiteShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JBS Soaps & Co | Cleanse with Intention",
    template: "%s | JBS Soaps & Co",
  },
  description:
    "Handcrafted, small-batch soaps formulated with plant-based botanicals for a ritualistic bathing experience. Est. in Texas.",
  keywords: [
    "natural soap",
    "botanical soap",
    "small batch soap",
    "Dallas soap",
    "artisan soap",
    "JBS Soaps",
  ],
  openGraph: {
    title: "JBS Soaps & Co | Cleanse with Intention",
    description:
      "Handcrafted, small-batch soaps formulated with plant-based botanicals.",
    siteName: "JBS Soaps & Co",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
