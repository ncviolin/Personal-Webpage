// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION  —  Include conservatory training and significant masterclasses.
// ─────────────────────────────────────────────────────────────────────────────

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  teachers?: string[];   // Important in classical music — pedagogical lineage
  honors?: string;
  description?: string;
}

export const education: EducationEntry[] = [
  {
    id: "edu-1",
    institution: "[PLACEHOLDER: e.g. The Juilliard School]",
    degree: "[PLACEHOLDER: e.g. Master of Music]",
    field: "[PLACEHOLDER: e.g. Violin Performance]",
    period: "[PLACEHOLDER: e.g. 2020–2022]",
    location: "[PLACEHOLDER: City, Country]",
    teachers: ["[PLACEHOLDER: Professor / Teacher Name]"],
    honors: "[PLACEHOLDER: e.g. Full scholarship; Graduated with distinction]",
    description: "[PLACEHOLDER: Brief description of your studies and focus]",
  },
  {
    id: "edu-2",
    institution: "[PLACEHOLDER: e.g. Royal College of Music]",
    degree: "[PLACEHOLDER: e.g. Bachelor of Music]",
    field: "[PLACEHOLDER: e.g. Violin Performance]",
    period: "[PLACEHOLDER: e.g. 2016–2020]",
    location: "[PLACEHOLDER: City, Country]",
    teachers: ["[PLACEHOLDER: Teacher Name]", "[PLACEHOLDER: Teacher Name]"],
    honors: "[PLACEHOLDER: e.g. First Class Honours]",
  },
  {
    id: "edu-3",
    institution: "[PLACEHOLDER: e.g. Menuhin School / Youth Academy / Pre-college]",
    degree: "Pre-College Diploma",
    field: "Violin",
    period: "[PLACEHOLDER: e.g. 2012–2016]",
    location: "[PLACEHOLDER: City, Country]",
    teachers: ["[PLACEHOLDER: Teacher Name]"],
  },
];
