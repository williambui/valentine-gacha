export const REWARDS = [
  { id: 1, name: "Forehead Kiss", rarity: "common", emoji: "\u{1F618}", category: "Affection", description: "Redeemable anytime, anywhere" },
  { id: 2, name: "Movie Night Pick", rarity: "common", emoji: "\u{1F3AC}", category: "Date", description: "You choose the movie, no complaints" },
  { id: 3, name: "Breakfast in Bed", rarity: "common", emoji: "\u{1F95E}", category: "Food", description: "Chef William at your service" },
  { id: 4, name: "10 Min Massage", rarity: "common", emoji: "\u{1F486}", category: "Affection", description: "Guaranteed no stopping early" },
  { id: 5, name: "Love Letter", rarity: "common", emoji: "\u{1F48C}", category: "Affection", description: "Handwritten with extra cheesiness" },
  { id: 6, name: "Bao Cuddle Session", rarity: "common", emoji: "\u{1F436}", category: "Affection", description: "Mandatory group hug with Bao" },
  { id: 7, name: "Dessert Run", rarity: "common", emoji: "\u{1F370}", category: "Food", description: "Any dessert, any time, no questions" },
  { id: 8, name: "Playlist Dedication", rarity: "common", emoji: "\u{1F3B5}", category: "Affection", description: "A custom playlist just for you" },
  { id: 9, name: "Homemade Steak Dinner", rarity: "rare", emoji: "\u{1F969}", category: "Food", description: "Reverse sear, your preferred doneness" },
  { id: 10, name: "Spa Night", rarity: "rare", emoji: "\u{1F9D6}", category: "Date", description: "Face masks, candles, the whole vibe" },
  { id: 11, name: "Shopping Spree", rarity: "rare", emoji: "\u{1F6CD}\uFE0F", category: "Gift", description: "A surprise shopping trip on me" },
  { id: 12, name: "Picnic Date", rarity: "rare", emoji: "\u{1F9FA}", category: "Date", description: "A curated picnic at a scenic spot" },
  { id: 13, name: "30 Min Massage", rarity: "rare", emoji: "\u2728", category: "Affection", description: "The deluxe edition, with oils" },
  { id: 14, name: "Cook Together Night", rarity: "rare", emoji: "\u{1F469}\u200D\u{1F373}", category: "Food", description: "We pick a new recipe and tackle it together" },
  { id: 15, name: "Fancy Dinner Out", rarity: "epic", emoji: "\u{1F377}", category: "Date", description: "A proper restaurant, dress up, the works" },
  { id: 16, name: "Day Trip Adventure", rarity: "epic", emoji: "\u{1F5FA}\uFE0F", category: "Date", description: "A surprise day trip to somewhere new" },
  { id: 17, name: "Full Day of Pampering", rarity: "epic", emoji: "\u{1F451}", category: "Affection", description: "An entire day dedicated to spoiling you" },
  { id: 18, name: "Custom Gift", rarity: "epic", emoji: "\u{1F381}", category: "Gift", description: "Something special I know you've been wanting" },
  { id: 19, name: "Weekend Getaway", rarity: "legendary", emoji: "\u2708\uFE0F", category: "Date", description: "A surprise weekend trip, bags packed" },
  { id: 20, name: "Unlimited Wish", rarity: "legendary", emoji: "\u{1F31F}", category: "Gift", description: "Name it. It's yours. No limits." },
];

export const RARITY_CONFIG = {
  common: { label: "Common", color: "#9ca3af", bg: "#1f2937", glow: "rgba(156,163,175,0.3)", chance: 50 },
  rare: { label: "Rare", color: "#60a5fa", bg: "#1e3a5f", glow: "rgba(96,165,250,0.4)", chance: 30 },
  epic: { label: "Epic", color: "#c084fc", bg: "#3b1f6e", glow: "rgba(192,132,252,0.5)", chance: 15 },
  legendary: { label: "Legendary", color: "#fbbf24", bg: "#5c3d0e", glow: "rgba(251,191,36,0.6)", chance: 5 },
};

export const RARITY_STARS = { common: 3, rare: 4, epic: 5, legendary: 5 };

export const BG_STARS = Array.from({ length: 55 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 2,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 4,
}));

export function getRandomReward() {
  const roll = Math.random() * 100;
  let rarity;
  if (roll < 5) rarity = "legendary";
  else if (roll < 20) rarity = "epic";
  else if (roll < 50) rarity = "rare";
  else rarity = "common";
  const pool = REWARDS.filter((r) => r.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
