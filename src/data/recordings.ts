// ─────────────────────────────────────────────────────────────────────────────
// RECORDINGS  —  Add your recordings, each linking to YouTube and optionally
//                to streaming platforms. Replace all [PLACEHOLDER] fields.
// ─────────────────────────────────────────────────────────────────────────────

export interface Recording {
  id: string;
  composer: string;
  work: string;
  movement?: string;
  ensemble?: string;
  conductor?: string;
  year: number;
  thumbnailUrl: string; // YouTube thumbnail or custom image URL
  youtubeUrl: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  description?: string;
  featured?: boolean;
}

export const recordings: Recording[] = [
  {
    id: "rec-1",
    composer: "W.A.Mozart",
    work: "Violin Concerto No. 1 in B-flat Major, K. 207",
    year: 2025,
    thumbnailUrl: "https://img.youtube.com/vi/8HrD_kp0jc0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=8HrD_kp0jc0",
    featured: true,
  },
  {
    id: "rec-2",
    composer: "Jean Sibelius",
    work: "Violin Concerto in D minor, Op. 47",
    year: 2023,
    thumbnailUrl: "https://img.youtube.com/vi/roaMtYfS5u0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=roaMtYfS5u0&t=1438s",
    featured: true,
  },
  {
    id: "rec-3",
    composer: "Antonín Dvořák",
    work: "Violin Concerto in A minor, Op. 53",
    year: 2025,
    thumbnailUrl: "https://img.youtube.com/vi/x-D7OWDmqV0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=x-D7OWDmqV0",
    featured: true,
  },
];
