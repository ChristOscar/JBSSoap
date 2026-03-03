"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/lib/emailjs";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <header className="text-center py-24 px-[10%] bg-[#fdfbf7]">
        <h1 className="font-playfair text-5xl font-normal italic mb-4 text-[#2d3436]">
          Get in Touch
        </h1>
        <p className="text-[#95a5a6]">
          We&apos;d love to hear from you.
        </p>
      </header>

      <section className="px-[10%] pb-24 max-w-2xl mx-auto">
        {status === "success" ? (
          <div className="text-center py-16">
            <p className="font-playfair text-2xl italic text-[#6b8e23] mb-3">
              Message sent!
            </p>
            <p className="text-sm text-[#95a5a6]">
              Thank you for reaching out. We&apos;ll respond within 1–2 business days.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:border-[#2d3436] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:border-[#2d3436] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:border-[#2d3436] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:border-[#2d3436] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                required
                className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#2d3436] focus:outline-none focus:border-[#2d3436] transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-xs">
                Something went wrong. Please try emailing us directly at{" "}
                <a
                  href="mailto:Info@JBSSoap.com"
                  className="underline"
                >
                  Info@JBSSoap.com
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-3 bg-[#2d3436] text-white px-10 py-4 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-60"
            >
              {status === "sending" && <LoadingSpinner className="w-4 h-4" />}
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
