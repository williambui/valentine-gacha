import { RARITY_CONFIG } from "../data/rewards";

export default function LightBeam({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const width = rarity === "legendary" ? 160 : rarity === "epic" ? 110 : 80;
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: "15%",
      width, height: "140%",
      transform: "translateX(-50%)",
      background: `linear-gradient(to top, ${config.color}dd, ${config.color}50 35%, transparent 75%)`,
      opacity: 0, animation: "beamShoot 0.7s ease-out forwards",
      filter: `blur(${rarity === "legendary" ? 18 : 12}px)`,
      pointerEvents: "none", zIndex: 2,
    }} />
  );
}
