// ─────────────────────────────────────────────────────────────────────────────
// AWARDS & RECOGNITIONS  —  Competition prizes, fellowships, grants, honors.
// ─────────────────────────────────────────────────────────────────────────────

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  month?: string;
  description?: string;
}

export const awards: Award[] = [
  {
    id: "award-1",
    title: "Gold Medal",
    organization: "New York Global Music Competition",
    year: 2023,
    month: "November",
  },
  {
    id: "award-2",
    title: "Platinum Medal — Highest Prize",
    organization: "North American Virtuoso International Music Competition",
    year: 2023,
    month: "May",
  },
  {
    id: "award-3",
    title: "Gold Medal",
    organization: "Singapore Raffles International Music Festival — Violin Competition",
    year: 2022,
    month: "August",
  },
  {
    id: "award-4",
    title: "Gold Medal",
    organization: "North American Virtuoso International Music Competition",
    year: 2022,
    month: "July",
  },
  {
    id: "award-5",
    title: "First Prize",
    organization: "Vienna Virtuoso Music Competition",
    year: 2022,
    month: "June",
  },
  {
    id: "award-6",
    title: "First Prize",
    organization: "Taipei City Music Competition",
    year: 2021,
    month: "November",
  },
  {
    id: "award-7",
    title: "First Prize",
    organization: "Taipei Philharmonic Youth Ensemble (TPYE) Concerto Contest",
    year: 2020,
    month: "August",
  },
];
