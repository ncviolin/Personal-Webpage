import { performances } from "../../data/performances";
import { SectionHeader } from "../ui/SectionHeader";
import { TimelineItem } from "../ui/TimelineItem";

export function Performances() {
  return (
    <section
      id="performances"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#F4F3F0" }}
      aria-labelledby="performances-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <SectionHeader
              label="On Stage"
              heading="Performances"
            />
          </div>
          <div className="lg:col-span-9">
            {performances.map((perf, i) => (
              <TimelineItem
                key={perf.id}
                period={perf.period}
                title={perf.role}
                subtitle={perf.venue}
                location={perf.location}
                description={perf.description}
                highlights={perf.highlights}
                isLast={i === performances.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
