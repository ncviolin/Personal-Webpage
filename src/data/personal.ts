// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL DATA  —  Update every field marked [PLACEHOLDER] with your own info
// ─────────────────────────────────────────────────────────────────────────────

export const personal = {
  name: "Nathan Chen",
  firstName: "Nathan",
  instrument: "Violinist & Music Producer",
  tagline: "",
  bio: [
    "Nathan is a Taiwanese-American violinist, currently studying at The Juilliard School with Joseph Lin. He is the recipient of the Gold Medal at the Singapore Raffles International Music Festival and had been invited to performed in the YST Concert Hall.",
    "Over time, a defining moment came when I performed at the National Concert Hall in Taiwan. The energy of the audience and the stillness as they listened showed me that music is a universal language. I realized that, like identity, the only real limit in music is the imagination we bring to it.",
    "Today, I perform with a sense of wonder, always aiming to connect across boundaries. Each note is an invitation—to slow down, to dream, and to feel. As I look to the future, I aspire to keep pushing creative limits, always inviting my audience into a shared, limitless world.",
  ],
  pullQuote: "[PLACEHOLDER: A compelling press quote or personal artistic statement. e.g. 'Her playing is marked by an intelligence and emotional depth rare among performers of her generation.' — Publication Name]",
  location: "New York, United States",
  email: "n.chen.violin@gmail.com",
  profilePhoto: "", // managed via About.tsx import
  pressKitUrl: "", // [PLACEHOLDER: URL to downloadable press kit / CV PDF]

  // Social platforms — fill in your actual URLs
  social: [
    {
      platform: "YouTube",
      label: "YouTube Channel",
      handle: "@ncviolinist",
      url: "https://youtube.com/@ncviolinist?si=z_5fw3pcs5R8xckt",
      color: "#FF0000",
    },
    {
      platform: "Instagram",
      label: "Instagram",
      handle: "@ncviolin",
      url: "https://www.instagram.com/ncviolin?igsh=aHF4NzhweHBpd2xw&utm_source=qr",
      color: "#E1306C",
    },
    {
      platform: "Facebook",
      label: "Facebook",
      handle: "Nathania Chen",
      url: "https://www.facebook.com/profile.php?id=61575432530100",
      color: "#1877F2",
    },
    // Optional — uncomment and fill in:
    // { platform: "Spotify", label: "Spotify", handle: "[PLACEHOLDER]", url: "https://open.spotify.com/artist/[PLACEHOLDER]", color: "#1DB954" },
    // { platform: "Twitter", label: "Twitter / X", handle: "@[PLACEHOLDER]", url: "https://x.com/[PLACEHOLDER]", color: "#000000" },
  ],

  // SEO metadata
  seo: {
    title: "[PLACEHOLDER: Full Name] — Violinist",
    description: "[PLACEHOLDER: 150-char bio excerpt for search engines. e.g. 'International concert violinist based in Vienna, performing with leading orchestras and ensembles worldwide.']",
    ogImage: "", // [PLACEHOLDER: URL to a 1200×630 open-graph image]
    canonicalUrl: "https://[PLACEHOLDER: your-domain.com]",
  },
} as const;

export type Social = typeof personal.social[number];
