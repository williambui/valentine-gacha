export const REWARDS = [
  // Common
  { id: 1, name: "A Kiss", rarity: "common", emoji: "😘", category: "Affection", description: "Redeemable anytime, anywhere" },
  { id: 2, name: "A Dance for You", rarity: "common", emoji: "🕺", category: "Affection", description: "A quick little dance, all for you" },
  { id: 3, name: "Squat Her ×3", rarity: "common", emoji: "🏋️", category: "Affection", description: "Three full squats with you in my arms" },
  { id: 4, name: "One Compliment", rarity: "common", emoji: "💬", category: "Affection", description: "A genuine, heartfelt compliment on the spot" },
  { id: 5, name: "One Reason I Love You", rarity: "common", emoji: "💕", category: "Affection", description: "I'll tell you one reason why I love you" },
  { id: 6, name: "Group Hug with Bao", rarity: "common", emoji: "🐶", category: "Affection", description: "Mandatory group hug, Bao included" },
  // Rare
  { id: 7, name: "Prank Call Someone", rarity: "rare", emoji: "📞", category: "Chaos", description: "Pick anyone, I'll make the call" },
  { id: 8, name: "Cook a Meal for You", rarity: "epic", emoji: "👨‍🍳", category: "Food", description: "Your choice of dish, chef William on duty" },
  { id: 9, name: "10-Min Back Massage", rarity: "rare", emoji: "💆", category: "Affection", description: "Ten full minutes, no slacking. Save for whenever" },
  { id: 10, name: "Dessert of Your Choice", rarity: "rare", emoji: "🍰", category: "Food", description: "Any dessert you want, no questions asked" },
  // Epic
  { id: 11, name: "Spa Trip", rarity: "epic", emoji: "🧖", category: "Date", description: "A full spa day, relax and be pampered" },
  { id: 12, name: "Facial Treatment", rarity: "epic", emoji: "✨", category: "Gift", description: "Any facial treatment of your choice, on me" },
  { id: 13, name: "Shopping Spree", rarity: "epic", emoji: "🛍️", category: "Gift", description: "A surprise shopping trip, fully covered" },
  { id: 14, name: "A Song for You", rarity: "rare", emoji: "🎤", category: "Affection", description: "I'll sing any song you pick, no backing out" },
  // Legendary
  { id: 15, name: "Anything You Want", rarity: "legendary", emoji: "🌟", category: "Gift", description: "Name it. It's yours. No limits." },
  { id: 16, name: "Her Own Holiday", rarity: "legendary", emoji: "👑", category: "Date", description: "A whole day dedicated to celebrating her. Pick any date" },
];

export const RARITY_CONFIG = {
  common: { label: "Common", color: "#9ca3af", bg: "#1f2937", glow: "rgba(156,163,175,0.3)", chance: 60, openingMs: 1200, burstMs: 600, shakeIntensity: 1, particleCount: 14, flashIntensity: 0.08 },
  rare: { label: "Rare", color: "#60a5fa", bg: "#1e3a5f", glow: "rgba(96,165,250,0.4)", chance: 27, openingMs: 1800, burstMs: 800, shakeIntensity: 1.3, particleCount: 26, flashIntensity: 0.2 },
  epic: { label: "Epic", color: "#c084fc", bg: "#3b1f6e", glow: "rgba(192,132,252,0.5)", chance: 10, openingMs: 2500, burstMs: 1000, shakeIntensity: 1.8, particleCount: 42, flashIntensity: 0.4 },
  legendary: { label: "Legendary", color: "#fbbf24", bg: "#5c3d0e", glow: "rgba(251,191,36,0.6)", chance: 3, openingMs: 3200, burstMs: 1400, shakeIntensity: 2.5, particleCount: 60, flashIntensity: 0.55 },
};

export const RARITY_STARS = { common: 2, rare: 3, epic: 4, legendary: 5 };

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
  // legendary: 0-3 (3%), epic: 3-13 (10%), rare: 13-40 (27%), common: 40-100 (60%)
  const legCutoff = RARITY_CONFIG.legendary.chance;
  const epicCutoff = legCutoff + RARITY_CONFIG.epic.chance;
  const rareCutoff = epicCutoff + RARITY_CONFIG.rare.chance;
  if (roll < legCutoff) rarity = "legendary";
  else if (roll < epicCutoff) rarity = "epic";
  else if (roll < rareCutoff) rarity = "rare";
  else rarity = "common";
  const pool = REWARDS.filter((r) => r.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
