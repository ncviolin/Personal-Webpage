// ─────────────────────────────────────────────────────────────────────────────
// REPERTOIRE  —  Grouped by category. Replace placeholders with your actual
//                active repertoire. Remove categories you don't perform.
// ─────────────────────────────────────────────────────────────────────────────

export interface RepertoireWork {
  composer: string;
  work: string;
}

export interface RepertoireCategory {
  category: string;
  items: RepertoireWork[];
}

export const repertoire: RepertoireCategory[] = [
  {
    category: "Concertos",
    items: [
      { composer: "[PLACEHOLDER: e.g. Beethoven]", work: "[PLACEHOLDER: e.g. Violin Concerto in D major, Op. 61]" },
      { composer: "[PLACEHOLDER: e.g. Brahms]", work: "[PLACEHOLDER: e.g. Violin Concerto in D major, Op. 77]" },
      { composer: "[PLACEHOLDER: e.g. Sibelius]", work: "[PLACEHOLDER: e.g. Violin Concerto in D minor, Op. 47]" },
      { composer: "[PLACEHOLDER: e.g. Mendelssohn]", work: "[PLACEHOLDER: e.g. Violin Concerto in E minor, Op. 64]" },
      { composer: "[PLACEHOLDER: e.g. Prokofiev]", work: "[PLACEHOLDER: e.g. Violin Concerto No. 2 in G minor, Op. 63]" },
    ],
  },
  {
    category: "Sonatas",
    items: [
      { composer: "[PLACEHOLDER: e.g. Bach]", work: "[PLACEHOLDER: e.g. Sonatas and Partitas for Solo Violin, BWV 1001–1006]" },
      { composer: "[PLACEHOLDER: e.g. Beethoven]", work: "[PLACEHOLDER: e.g. Violin Sonata No. 9 'Kreutzer', Op. 47]" },
      { composer: "[PLACEHOLDER: e.g. Brahms]", work: "[PLACEHOLDER: e.g. Violin Sonata No. 1 in G major, Op. 78]" },
      { composer: "[PLACEHOLDER: e.g. Franck]", work: "[PLACEHOLDER: e.g. Violin Sonata in A major]" },
    ],
  },
  {
    category: "Chamber Music",
    items: [
      { composer: "[PLACEHOLDER: e.g. Schubert]", work: "[PLACEHOLDER: e.g. Piano Quintet in A major 'Trout', D. 667]" },
      { composer: "[PLACEHOLDER: e.g. Brahms]", work: "[PLACEHOLDER: e.g. Piano Quartet No. 1 in G minor, Op. 25]" },
      { composer: "[PLACEHOLDER: e.g. Ravel]", work: "[PLACEHOLDER: e.g. String Quartet in F major]" },
      { composer: "[PLACEHOLDER: e.g. Schumann]", work: "[PLACEHOLDER: e.g. Piano Quintet in E-flat major, Op. 44]" },
    ],
  },
  {
    category: "Contemporary",
    items: [
      { composer: "[PLACEHOLDER: e.g. Pärt]", work: "[PLACEHOLDER: e.g. Fratres for Violin and Piano]" },
      { composer: "[PLACEHOLDER: e.g. Gubaidulina]", work: "[PLACEHOLDER: e.g. Offertorium]" },
      { composer: "[PLACEHOLDER: e.g. Schnittke]", work: "[PLACEHOLDER: e.g. Violin Concerto No. 4]" },
    ],
  },
];
