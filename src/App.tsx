import { useState } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";

import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { SEOHead } from "./components/layout/SEOHead";

import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Recordings } from "./components/sections/Recordings";
import { Awards } from "./components/sections/Awards";
import { Diplomas } from "./components/sections/Diplomas";
import { Press } from "./components/sections/Press";
import { Contact } from "./components/sections/Contact";

import { DiplomasPage } from "./components/pages/DiplomasPage";

type Page = "home" | "diplomas";

function HomePage({ onViewAllDiplomas }: { onViewAllDiplomas: () => void }) {
  useScrollReveal();
  return (
    <>
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}
      <Navigation />
      <main id="main-content">
        <Hero />
        {/* z-index: 2 on the page body so sections slide UP and COVER the sticky Hero */}
        <div style={{ position: "relative", zIndex: 2, backgroundColor: "var(--color-background)", boxShadow: "0 -12px 40px rgba(0,0,0,0.35)" }}>
          <About />
          <Recordings />
          <Awards />
          <Diplomas onViewAll={onViewAllDiplomas} />
          <Press />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      <SEOHead />
      {page === "home" ? (
        <HomePage onViewAllDiplomas={() => setPage("diplomas")} />
      ) : (
        <DiplomasPage onBack={() => { setPage("home"); setTimeout(() => { document.getElementById("diplomas")?.scrollIntoView({ behavior: "instant" }); }, 0); }} />
      )}
    </>
  );
}
