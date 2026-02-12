import { RARITY_CONFIG } from "../data/rewards";

export default function ScreenFlash({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const intensity = rarity === "legendary" ? 0.55 : rarity === "epic" ? 0.4 : rarity === "rare" ? 0.2 : 0.1;
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: `radial-gradient(circle at 50% 45%, ${config.color}, transparent 65%)`,
      animation: "screenFlash 0.6s ease-out forwards",
      "--flash-intensity": intensity,
      pointerEvents: "none", zIndex: 100,
    }} />
  );
}
