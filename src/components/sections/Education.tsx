import { education } from "../../data/education";
import { SectionHeader } from "../ui/SectionHeader";
import { TimelineItem } from "../ui/TimelineItem";

export function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#FAFAF9" }}
      aria-labelledby="education-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <SectionHeader
              label="Training"
              heading="Education"
            />
          </div>
          <div className="lg:col-span-9">
            {education.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                period={edu.period}
                title={`${edu.degree} in ${edu.field}`}
                subtitle={edu.institution}
                location={edu.location}
                description={edu.description}
                highlights={[
                  ...(edu.teachers && edu.teachers.length > 0
                    ? [`Studies with: ${edu.teachers.join(", ")}`]
                    : []),
                  ...(edu.honors ? [edu.honors] : []),
                ]}
                isLast={i === education.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
