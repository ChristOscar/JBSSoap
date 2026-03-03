import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/lib/emailjs";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Status = "idle" | "sending" | "success" | "error" | "rate_limited";

const INQUIRY_TYPES = [
  {
    value: "Custom Soap Order",
    label: "Custom Soap Order",
    description: "Personalized bars for gifts, events, or bulk",
  },
  {
    value: "Events",
    label: "Events",
    description: "Pop-ups, markets, vendor collaborations",
  },
  {
    value: "Content",
    label: "Content",
    description: "Press, partnerships, and brand features",
  },
];

const RATE_LIMIT_KEY = "jbs_contact_last_sent";
const RATE_LIMIT_MS = 15 * 60 * 1000; // 15 minutes

function getRemainingMinutes(): number {
  try {
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (!last) return 0;
    const remaining = RATE_LIMIT_MS - (Date.now() - parseInt(last));
    return remaining > 0 ? Math.ceil(remaining / 60000) : 0;
  } catch {
    return 0;
  }
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [inquiryType, setInquiryType] = useState("");
  const [rateLimitMinutes, setRateLimitMinutes] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Rate limiting check
    const remaining = getRemainingMinutes();
    if (remaining > 0) {
      setRateLimitMinutes(remaining);
      setStatus("rate_limited");
      return;
    }

    // Honeypot check — bots fill hidden fields, humans don't
    const honeypot = formRef.current.querySelector<HTMLInputElement>('[name="website"]');
    if (honeypot?.value) {
      // Silently succeed so bots don't know they were caught
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      // Record timestamp for rate limiting
      try {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      } catch {
        // localStorage unavailable — no rate limit enforced
      }

      setStatus("success");
      formRef.current.reset();
      setInquiryType("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <header className="text-center py-14 md:py-24 px-6 md:px-[10%] bg-[#f5f0e8]">
        <p className="text-xs uppercase tracking-[4px] text-[#8b6b14] mb-4">
          Let's Connect
        </p>
        <h1 className="font-playfair text-[clamp(2rem,5vw,4rem)] font-normal italic mb-5 text-[#2d2a26]">
          Get in Touch
        </h1>
        <p className="text-[#8a8070] max-w-md mx-auto leading-relaxed text-sm md:text-base">
          Whether you have a question, a custom request, or just want to say
          hello — we'd love to hear from you.
        </p>
      </header>

      <section className="bg-[#faf7f2] border-t border-[#e4ddd2] px-4 md:px-[10%] py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="text-center py-16 md:py-20">
              <div className="text-[#8b6b14] text-3xl mb-6">✦</div>
              <p className="font-playfair text-2xl md:text-3xl italic text-[#2d2a26] mb-4">
                Message received.
              </p>
              <p className="text-sm text-[#8a8070] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. We'll get back to you within 1–2
                business days.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">

              {/* Honeypot — hidden from real users, traps bots */}
              <input
                type="text"
                name="website"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest mb-2 text-[#2d2a26]">
                    First Name <span className="text-[#8b6b14]">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    maxLength={60}
                    className="w-full border border-[#e4ddd2] bg-white px-4 py-3 text-sm text-[#2d2a26] focus:outline-none focus:border-[#8b6b14] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest mb-2 text-[#2d2a26]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    maxLength={60}
                    className="w-full border border-[#e4ddd2] bg-white px-4 py-3 text-sm text-[#2d2a26] focus:outline-none focus:border-[#8b6b14] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-widest mb-2 text-[#2d2a26]">
                  Email <span className="text-[#8b6b14]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={100}
                  className="w-full border border-[#e4ddd2] bg-white px-4 py-3 text-sm text-[#2d2a26] focus:outline-none focus:border-[#8b6b14] transition-colors"
                />
              </div>

              {/* Inquiry type */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-widest mb-4 text-[#2d2a26]">
                  What can we help with?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INQUIRY_TYPES.map(({ value, label, description }) => {
                    const selected = inquiryType === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setInquiryType(selected ? "" : value)}
                        className={`text-left px-4 py-4 border transition-all duration-200 ${
                          selected
                            ? "border-[#8b6b14] bg-[#8b6b14] text-white"
                            : "border-[#e4ddd2] bg-white text-[#2d2a26] hover:border-[#8b6b14]"
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1">
                          {label}
                        </p>
                        <p
                          className={`text-[0.7rem] leading-snug ${
                            selected ? "text-white/80" : "text-[#8a8070]"
                          }`}
                        >
                          {description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="inquiry_type" value={inquiryType} />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[0.65rem] uppercase tracking-widest mb-2 text-[#2d2a26]">
                  Message <span className="text-[#8b6b14]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  maxLength={2000}
                  placeholder="Tell us a little about what you have in mind..."
                  className="w-full border border-[#e4ddd2] bg-white px-4 py-3 text-sm text-[#2d2a26] placeholder:text-[#c4bdb4] focus:outline-none focus:border-[#8b6b14] transition-colors resize-none"
                />
              </div>

              {/* Error states */}
              {status === "rate_limited" && (
                <p className="text-amber-700 text-xs bg-amber-50 border border-amber-200 px-4 py-3">
                  Please wait {rateLimitMinutes} more minute
                  {rateLimitMinutes !== 1 ? "s" : ""} before sending another
                  message.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-xs">
                  Something went wrong. Please email us directly at{" "}
                  <a href="mailto:Info@JBSSoap.com" className="underline">
                    Info@JBSSoap.com
                  </a>
                  .
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-3 bg-[#2d2a26] text-[#f5f0e8] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#8b6b14] transition-colors disabled:opacity-60"
                >
                  {status === "sending" && <LoadingSpinner className="w-4 h-4" />}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                <p className="text-[0.65rem] text-[#8a8070] uppercase tracking-widest text-center sm:text-right">
                  Response within 1–2 days
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
