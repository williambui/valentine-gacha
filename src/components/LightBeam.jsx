import { RARITY_CONFIG } from "../data/rewards";

export default function LightBeam({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const isIntense = rarity === "legendary" || rarity === "epic";
  const width = rarity === "legendary" ? 180 : rarity === "epic" ? 130 : rarity === "rare" ? 90 : 70;
  const blur = rarity === "legendary" ? 22 : rarity === "epic" ? 16 : 12;
  const shootDuration = config.burstMs * 0.6;

  return (
    <>
      <div style={{
        position: "absolute", left: "50%", bottom: "15%",
        width, height: "140%",
        transform: "translateX(-50%)",
        background: `linear-gradient(to top, ${config.color}dd, ${config.color}50 35%, transparent 75%)`,
        opacity: 0,
        animation: `${isIntense ? "beamShootIntense" : "beamShoot"} ${shootDuration}ms ease-out forwards`,
        filter: `blur(${blur}px)`,
        pointerEvents: "none", zIndex: 2,
        willChange: "transform, opacity",
      }} />
      {/* Sustained pulse for legendary/epic */}
      {isIntense && (
        <div style={{
          position: "absolute", left: "50%", bottom: "15%",
          width: width * 0.7, height: "140%",
          transform: "translateX(-50%)",
          background: `linear-gradient(to top, ${config.color}99, ${config.color}30 40%, transparent 70%)`,
          opacity: 0,
          animation: `beamPulse 1.2s ease-in-out ${shootDuration}ms infinite`,
          filter: `blur(${blur + 6}px)`,
          pointerEvents: "none", zIndex: 2,
        }} />
      )}
    </>
  );
}
