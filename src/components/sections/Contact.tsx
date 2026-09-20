import { useState, useEffect, useRef } from "react";
import { personal } from "../../data/personal";
import { SocialIconLink } from "../ui/SocialLink";

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(22px)",
  transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
};

// ─── Email sending ───────────────────────────────────────────────────────────
// Uses Web3Forms (https://web3forms.com) — free, no backend required.
// 1. Go to https://web3forms.com and enter n.chen.violin@gmail.com
// 2. Copy the access key they email you
// 3. Add it to your project: VITE_WEB3FORMS_KEY=your-key-here  (in .env or Figma Make env vars)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) => {
            const delay = Number(child.dataset.delay ?? 0);
            setTimeout(() => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            }, delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "Booking Inquiry",
    customSubject: "",
    message: "",
    honeypot: "",
  });

  const isOther = fields.subject === "Other";
  const finalSubject = isOther ? fields.customSubject.trim() || "Other" : fields.subject;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fields.honeypot) return;

    setFormState("submitting");
    setErrorMsg("");

    if (!WEB3FORMS_KEY) {
      // No API key configured — show a clear error rather than silently failing
      setErrorMsg(
        "Email sending is not configured yet. Please add your VITE_WEB3FORMS_KEY environment variable. " +
        "Get a free key at web3forms.com using the address " + personal.email
      );
      setFormState("error");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: fields.name,
          email: fields.email,
          subject: `[${finalSubject}] from ${fields.name}`,
          message: fields.message,
          // tells Web3Forms to redirect back here instead of their thank-you page
          redirect: "false",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormState("success");
      } else {
        throw new Error(data.message ?? "Submission failed");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#FAFAF9",
    border: "1px solid #E2E0DC",
    borderRadius: "2px",
    fontSize: "0.9375rem",
    color: "#141414",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6B6863",
    marginBottom: "6px",
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "#1C3557");
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "#E2E0DC");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#F4F3F0" }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left: Info ──────────────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <p
              data-reveal data-delay="0"
              className="font-mono text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: "#B8965A", ...HIDDEN }}
            >
              Get in Touch
            </p>
            <h2
              id="contact-heading"
              data-reveal data-delay="100"
              className="font-serif leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, color: "#141414", ...HIDDEN }}
            >
              Contact
            </h2>
            <p data-reveal data-delay="180" className="leading-relaxed mb-8" style={{ color: "#6B6863", fontSize: "0.9375rem", ...HIDDEN }}>
              For booking inquiries, press requests, collaborations, or general correspondence, please reach out.
            </p>

            <dl data-reveal data-delay="260" className="space-y-6 mb-10" style={HIDDEN}>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "#B8965A" }}>Email</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="transition-colors duration-200 hover:text-[#1C3557]"
                    style={{ color: "#141414", fontSize: "0.9375rem" }}
                  >
                    {personal.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "#B8965A" }}>Location</dt>
                <dd style={{ color: "#141414", fontSize: "0.9375rem" }}>{personal.location}</dd>
              </div>
            </dl>

            <div data-reveal data-delay="340" className="flex gap-4" style={HIDDEN}>
              {personal.social.map((s) => (
                <SocialIconLink key={s.platform} social={s} />
              ))}
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────────────────────────── */}
          <div data-reveal data-delay="160" className="lg:col-span-8" style={HIDDEN}>
            {formState === "success" ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                style={{ backgroundColor: "#FAFAF9", borderRadius: "2px", border: "1px solid #E2E0DC" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#1C3557", borderRadius: "50%" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10L8 14L16 6" stroke="#FAFAF9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold mb-2" style={{ fontSize: "1.25rem", color: "#141414" }}>
                  Message sent
                </h3>
                <p className="text-sm mb-6" style={{ color: "#6B6863" }}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setFormState("idle");
                    setFields({ name: "", email: "", subject: "Booking Inquiry", customSubject: "", message: "", honeypot: "" });
                  }}
                  className="font-mono text-xs tracking-wider uppercase border px-5 py-2.5 transition-colors duration-200 hover:bg-[#F0EFED]"
                  style={{ borderColor: "#E2E0DC", color: "#6B6863", borderRadius: "2px" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ backgroundColor: "#FAFAF9", padding: "40px", borderRadius: "2px", border: "1px solid #E2E0DC" }}
              >
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label htmlFor="hp-field">Leave this field empty</label>
                  <input id="hp-field" type="text" name="honeypot" value={fields.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Name</label>
                    <input
                      id="contact-name" type="text" name="name" required autoComplete="name"
                      value={fields.name} onChange={handleChange} style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>Your Email</label>
                    <input
                      id="contact-email" type="email" name="email" required autoComplete="email"
                      value={fields.email} onChange={handleChange} style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </div>
                </div>

                {/* Subject dropdown */}
                <div className="mb-5">
                  <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
                  <select
                    id="contact-subject" name="subject"
                    value={fields.subject} onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  >
                    <option>Booking Inquiry</option>
                    <option>Press &amp; Media</option>
                    <option>Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Custom subject — shown only when "Other" is selected */}
                {isOther && (
                  <div
                    className="mb-5"
                    style={{
                      opacity: 1,
                      animation: "fadeSlideDown 0.22s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <style>{`
                      @keyframes fadeSlideDown {
                        from { opacity: 0; transform: translateY(-6px); }
                        to   { opacity: 1; transform: translateY(0); }
                      }
                    `}</style>
                    <label htmlFor="contact-custom-subject" style={labelStyle}>
                      Custom Subject
                    </label>
                    <input
                      id="contact-custom-subject" type="text" name="customSubject"
                      placeholder="What's this about?"
                      value={fields.customSubject} onChange={handleChange}
                      style={inputStyle}
                      onFocus={focusBorder} onBlur={blurBorder}
                      autoFocus
                    />
                  </div>
                )}

                <div className="mb-7">
                  <label htmlFor="contact-message" style={labelStyle}>Message</label>
                  <textarea
                    id="contact-message" name="message" required rows={6}
                    value={fields.message} onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                </div>

                {/* Error message */}
                {formState === "error" && (
                  <div
                    className="mb-5 px-4 py-3 text-sm"
                    style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "2px", color: "#B91C1C", fontFamily: "var(--font-sans)" }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full py-4 font-mono text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundColor: "#1C3557",
                    color: "#FAFAF9",
                    borderRadius: "2px",
                    letterSpacing: "0.14em",
                    cursor: formState === "submitting" ? "wait" : "pointer",
                  }}
                >
                  {formState === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
