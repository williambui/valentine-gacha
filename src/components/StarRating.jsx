import { RARITY_STARS, RARITY_CONFIG } from "../data/rewards";

export default function StarRating({ rarity, animated }) {
  const count = RARITY_STARS[rarity];
  const config = RARITY_CONFIG[rarity];
  return (
    <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{
          color: config.color,
          fontSize: 16,
          textShadow: `0 0 8px ${config.color}, 0 0 16px ${config.glow}`,
          ...(animated ? { animation: `starPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.12}s both` } : {}),
        }}>★</span>
      ))}
    </div>
  );
}
