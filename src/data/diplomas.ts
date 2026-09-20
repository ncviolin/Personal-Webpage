// ─────────────────────────────────────────────────────────────────────────────
// DIPLOMAS & CERTIFICATES  —  Add each credential below.
//
// • featured: true  → appears in the 3-item preview on the home page.
//   Mark your most prominent credentials as featured (up to 3 shown).
//   All items always appear on the full /diplomas page regardless.
// • imageUrl        → thumbnail shown in gallery cards.
// • previewUrl      → full-size image shown in the lightbox (falls back to imageUrl).
// ─────────────────────────────────────────────────────────────────────────────

export interface Diploma {
  id: string;
  title: string;        // e.g. "Pre-College Diploma"
  institution: string;  // e.g. "The Juilliard School"
  date: string;         // e.g. "May 2024"
  description?: string; // Optional short note
  imageUrl: string;     // Thumbnail shown in gallery
  previewUrl?: string;  // Full-size image for lightbox (optional)
  featured?: boolean;   // Show in home-page preview (first 3 featured are shown)
}

export const diplomas: Diploma[] = [
  {
    id: "diploma-1",
    title: "[PLACEHOLDER: e.g. Pre-College Diploma]",
    institution: "[PLACEHOLDER: e.g. The Juilliard School]",
    date: "[PLACEHOLDER: e.g. May 2024]",
    description: "[PLACEHOLDER: Optional note — major, honours, teacher, etc.]",
    imageUrl: "",
    previewUrl: "",
    featured: true,
  },
  {
    id: "diploma-2",
    title: "[PLACEHOLDER: e.g. Certificate of Merit — State Level]",
    institution: "[PLACEHOLDER: e.g. Music Teachers' Association of California]",
    date: "[PLACEHOLDER: e.g. June 2023]",
    imageUrl: "",
    featured: true,
  },
  {
    id: "diploma-3",
    title: "[PLACEHOLDER: e.g. Certificate of Merit — State Level]",
    institution: "[PLACEHOLDER: e.g. Music Teachers' Association of California]",
    date: "[PLACEHOLDER: e.g. June 2022]",
    imageUrl: "",
    featured: true,
  },
  {
    id: "diploma-4",
    title: "[PLACEHOLDER: e.g. Summer Academy Certificate]",
    institution: "[PLACEHOLDER: e.g. Meadowmount School of Music]",
    date: "[PLACEHOLDER: e.g. August 2022]",
    imageUrl: "",
  },
];
