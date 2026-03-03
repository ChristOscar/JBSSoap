import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JBS Soaps & Co. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactClient />;
}
