/**
 * Valentine Week — Soulmate + Free Love Report path
 * Main product includes FREE Love Report; add-ons are optional paid readings.
 */

export const VALENTINE_MAIN_PRODUCT = {
  id: "soulmate-sketch",
  title: "Soulmate Sketch + FREE Love Report",
  img: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
  price: 199,
  compareAt: 998,
  includes: [
    "Personalized hand-drawn soulmate sketch",
    "FREE Love Report — romantic patterns, emotional needs & the partner you're meant for",
    "Private delivery within 24–48 hours",
  ],
};

/** FREE readings (shown on landing — included when they get the main product / lead magnets) */
export const FREE_READINGS = [
  {
    id: "free-impress-crush",
    title: "How to Impress Your Crush (FREE)",
    description:
      "Wondering what actually makes your crush notice you? This personalised reading reveals how your energy comes across, what naturally attracts people to you, and how to show up confidently without pretending to be someone else.",
    tagline: "Perfect for singles who want to feel seen, desired, and remembered this Valentine week 💗",
    icon: "🎁",
  },
  {
    id: "free-psychic",
    title: "Psychic Reading (FREE)",
    description:
      "There's more happening in your love life than you realise. This psychic reading taps into your current love energy and reveals hidden emotions, signs, or connections influencing your romantic life right now.",
    tagline: "A gentle, intuitive insight designed to give clarity and reassurance — especially during Valentine week ✨",
    icon: "🔮",
  },
  {
    id: "free-love-report",
    title: "Love Report (FREE)",
    description:
      "Your love story is written in your energy — you just haven't read it yet. This love report highlights your romantic patterns, emotional needs, and the kind of partner you're truly meant for.",
    tagline: "A perfect starting point for singles who want clarity before stepping into new love 💫",
    icon: "💞",
  },
];

/** Add-on readings (paid bumps on cart) */
export type ValentineBump = {
  id: string;
  title: string;
  blurb: string;
  price: number;
  compareAt?: number;
  features?: string[];
};

export const VALENTINE_ADDONS: ValentineBump[] = [
  {
    id: "addon-soulmate-spot",
    title: "🌍 Soulmate Spot (Add-On)",
    blurb:
      "What if you already know where love finds you? This reading reveals the location, setting, or situation where you're most likely to meet your soulmate — online, through friends, travel, work, or an unexpected moment.",
    price: 99,
    compareAt: 299,
    features: [
      "Where you're most likely to meet your soulmate",
      "Online, friends, travel, work or unexpected moments",
      "Ideal for singles who believe timing and place matter in love",
    ],
  },
  {
    id: "addon-love-magnet",
    title: "💖 Love Magnet Ritual (Add-On)",
    blurb:
      "This Valentine week, stop waiting for love — attract it. Your Love Magnet Ritual is personalised using your birth details to activate attraction energy, remove love blocks, and align you with romantic opportunities.",
    price: 99,
    compareAt: 299,
    features: [
      "Personalised using your birth details",
      "Activates attraction energy & removes love blocks",
      "Aligns you with romantic opportunities",
      "For singles ready to feel confident, magnetic & emotionally aligned",
    ],
  },
  {
    id: "addon-move-on",
    title: "💔 How to Move On (Add-On)",
    blurb:
      "Still carrying feelings that hold you back? This reading helps you understand what's keeping you emotionally stuck, why moving on feels hard, and how to release old attachments that block new love.",
    price: 99,
    compareAt: 299,
    features: [
      "Understand what's keeping you emotionally stuck",
      "Why moving on feels hard",
      "How to release old attachments that block new love",
      "Perfect for a fresh start this Valentine week",
    ],
  },
];
