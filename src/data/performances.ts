// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCES & ENGAGEMENTS  —  List your concert/recital engagements.
// ─────────────────────────────────────────────────────────────────────────────

export interface Performance {
  id: string;
  role: string;         // e.g. "Soloist", "Concertmaster", "Chamber Musician"
  venue: string;
  location: string;
  period: string;       // e.g. "2022–2023 Season" or "August 2023"
  description?: string;
  highlights: string[];
}

export const performances: Performance[] = [
  {
    id: "perf-1",
    role: "Soloist",
    venue: "[PLACEHOLDER: Concert Hall / Orchestra Name, e.g. Carnegie Hall with the New York Philharmonic]",
    location: "[PLACEHOLDER: City, Country]",
    period: "[PLACEHOLDER: e.g. March 2024]",
    description: "[PLACEHOLDER: Brief description of the engagement]",
    highlights: [
      "[PLACEHOLDER: e.g. Performed Sibelius Violin Concerto under maestro Name]",
      "[PLACEHOLDER: e.g. Received standing ovation; reviewed in The New York Times]",
    ],
  },
  {
    id: "perf-2",
    role: "[PLACEHOLDER: Role]",
    venue: "[PLACEHOLDER: Festival / Hall Name]",
    location: "[PLACEHOLDER: City, Country]",
    period: "[PLACEHOLDER: e.g. Summer 2023]",
    highlights: [
      "[PLACEHOLDER: Highlight 1]",
      "[PLACEHOLDER: Highlight 2]",
    ],
  },
  {
    id: "perf-3",
    role: "Chamber Musician",
    venue: "[PLACEHOLDER: Chamber Music Series or Venue]",
    location: "[PLACEHOLDER: City, Country]",
    period: "[PLACEHOLDER: e.g. 2022–2023 Season]",
    highlights: [
      "[PLACEHOLDER: Highlight 1]",
      "[PLACEHOLDER: Highlight 2]",
    ],
  },
  {
    id: "perf-4",
    role: "[PLACEHOLDER: Role]",
    venue: "[PLACEHOLDER: Venue]",
    location: "[PLACEHOLDER: City, Country]",
    period: "[PLACEHOLDER: Period]",
    highlights: [
      "[PLACEHOLDER: Highlight 1]",
    ],
  },
];
