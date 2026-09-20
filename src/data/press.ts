// ─────────────────────────────────────────────────────────────────────────────
// PRESS & MEDIA  —  Reviews, interviews, features, radio, TV appearances.
// ─────────────────────────────────────────────────────────────────────────────

export type PressType = "review" | "interview" | "feature" | "radio" | "tv";

export interface PressItem {
  id: string;
  title: string;
  type: PressType;
  publication: string;
  date: string;         // e.g. "March 2024" or "2024-03-15"
  url?: string;
  quote?: string;       // Pull quote to highlight — keep under 200 characters
}

export const press: PressItem[] = [
  {
    id: "press-1",
    title: "[PLACEHOLDER: Article/Review Title]",
    type: "review",
    publication: "[PLACEHOLDER: e.g. The Guardian]",
    date: "[PLACEHOLDER: e.g. March 2024]",
    url: "https://[PLACEHOLDER]",
    quote: "[PLACEHOLDER: Compelling excerpt, e.g. 'Her tone is luminous and her technique flawless — a major talent of her generation.']",
  },
  {
    id: "press-2",
    title: "[PLACEHOLDER: Article/Interview Title]",
    type: "interview",
    publication: "[PLACEHOLDER: e.g. Gramophone Magazine]",
    date: "[PLACEHOLDER: e.g. January 2024]",
    url: "https://[PLACEHOLDER]",
    quote: "[PLACEHOLDER: Interview pull quote]",
  },
  {
    id: "press-3",
    title: "[PLACEHOLDER: Program/Episode Title]",
    type: "radio",
    publication: "[PLACEHOLDER: e.g. BBC Radio 3]",
    date: "[PLACEHOLDER: e.g. November 2023]",
    url: "https://[PLACEHOLDER]",
  },
  {
    id: "press-4",
    title: "[PLACEHOLDER: Article Title]",
    type: "feature",
    publication: "[PLACEHOLDER: e.g. Strad Magazine]",
    date: "[PLACEHOLDER: e.g. September 2023]",
    url: "https://[PLACEHOLDER]",
    quote: "[PLACEHOLDER: Feature pull quote]",
  },
  {
    id: "press-5",
    title: "[PLACEHOLDER: Title]",
    type: "review",
    publication: "[PLACEHOLDER: Publication]",
    date: "[PLACEHOLDER: Date]",
    url: "https://[PLACEHOLDER]",
  },
];
