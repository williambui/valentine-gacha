import { RARITY_CONFIG } from "../data/rewards";

export default function ScreenFlash({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const isLegendary = rarity === "legendary";
  const flashDuration = isLegendary ? 800 : rarity === "epic" ? 600 : 400;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: `radial-gradient(circle at 50% 45%, ${config.color}, transparent 65%)`,
      animation: `${isLegendary ? "screenFlashLegendary" : "screenFlash"} ${flashDuration}ms ease-out forwards`,
      "--flash-intensity": config.flashIntensity,
      pointerEvents: "none", zIndex: 100,
      willChange: "opacity",
    }} />
  );
}
