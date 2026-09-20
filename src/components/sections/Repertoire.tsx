import { repertoire } from "../../data/repertoire";
import { SectionHeader } from "../ui/SectionHeader";

export function Repertoire() {
  return (
    <section
      id="repertoire"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#1C3557" }}
      aria-labelledby="repertoire-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Active Repertoire"
          heading="Repertoire"
          description="A selection of works in current performance rotation."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {repertoire.map((category) => (
            <div key={category.category}>
              <h3
                className="font-mono text-xs uppercase tracking-[0.18em] mb-5 pb-3 border-b"
                style={{ color: "#B8965A", borderColor: "rgba(255,255,255,0.12)" }}
              >
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <p
                      className="font-mono text-xs mb-0.5"
                      style={{ color: "rgba(250,250,249,0.5)", letterSpacing: "0.04em" }}
                    >
                      {item.composer}
                    </p>
                    <p
                      className="font-serif leading-snug"
                      style={{ fontSize: "0.9375rem", color: "#FAFAF9", fontStyle: "italic" }}
                    >
                      {item.work}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
