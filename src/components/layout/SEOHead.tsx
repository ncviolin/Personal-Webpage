import { useEffect } from "react";
import { personal } from "../../data/personal";

// Injects SEO metadata into document.head at runtime.
// When deploying to production, move these tags into index.html
// and add server-side rendering or a static site generator for
// full crawler/bot discoverability.
export function SEOHead() {
  useEffect(() => {
    // Title
    document.title = personal.seo.title;

    const setMeta = (attrs: Record<string, string>) => {
      const selector = Object.entries(attrs)
        .filter(([k]) => k !== "content")
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("");
      let el = document.querySelector<HTMLMetaElement>(`meta${selector}`);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => { if (k !== "content") el!.setAttribute(k, v); });
        document.head.appendChild(el);
      }
      el.setAttribute("content", attrs.content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    const setJsonLd = () => {
      let el = document.getElementById("schema-person");
      if (!el) {
        el = document.createElement("script");
        el.id = "schema-person";
        el.setAttribute("type", "application/ld+json");
        document.head.appendChild(el);
      }
      const sameAs = personal.social.map((s) => s.url).filter((u) => !u.includes("[PLACEHOLDER]"));
      el.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: personal.name,
        jobTitle: personal.instrument,
        description: personal.seo.description,
        url: personal.seo.canonicalUrl,
        email: `mailto:${personal.email}`,
        sameAs,
      });
    };

    // Primary
    setMeta({ name: "description", content: personal.seo.description });
    setMeta({ name: "robots", content: "index, follow" });

    // Canonical
    if (!personal.seo.canonicalUrl.includes("[PLACEHOLDER]")) {
      setLink("canonical", personal.seo.canonicalUrl);
    }

    // Open Graph
    setMeta({ property: "og:type", content: "website" });
    setMeta({ property: "og:title", content: personal.seo.title });
    setMeta({ property: "og:description", content: personal.seo.description });
    if (personal.seo.ogImage) setMeta({ property: "og:image", content: personal.seo.ogImage });
    if (!personal.seo.canonicalUrl.includes("[PLACEHOLDER]")) {
      setMeta({ property: "og:url", content: personal.seo.canonicalUrl });
    }

    // Twitter Card
    setMeta({ name: "twitter:card", content: "summary_large_image" });
    setMeta({ name: "twitter:title", content: personal.seo.title });
    setMeta({ name: "twitter:description", content: personal.seo.description });
    if (personal.seo.ogImage) setMeta({ name: "twitter:image", content: personal.seo.ogImage });

    // Schema.org JSON-LD
    setJsonLd();
  }, []);

  return null;
}
