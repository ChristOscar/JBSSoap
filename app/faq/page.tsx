import FAQClient from "./FAQClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about JBS Soaps & Co ingredients, shipping, skin types, and returns.",
};

export default function FAQPage() {
  return <FAQClient />;
}
