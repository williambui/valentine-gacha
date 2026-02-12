import { RARITY_CONFIG } from "../data/rewards";

// Pre-generate stable particle layouts at max count
// Swirl: continuous orbiting particles that fade in smoothly
const SWIRL_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  angle: (360 / 60) * i + Math.random() * 12,
  radius: 40 + Math.random() * 80,
  orbitDuration: 1.8 + Math.random() * 1.4,
  size: 2 + Math.random() * 4,
  isStar: Math.random() > 0.5,
  starSize: 7 + Math.random() * 7,
  targetOpacity: 0.4 + Math.random() * 0.5,
  fadeDelay: Math.random() * 0.6,
}));

const BURST_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  angle: (360 / 60) * i + Math.random() * 10,
  distBase: 50 + Math.random() * 180,
  distExtra: Math.random() * 100,
  size: 2 + Math.random() * 6,
  durationFactor: 0.5 + Math.random() * 0.8,
  delayFactor: Math.random() * 0.15,
  type: Math.random(),
  heartSize: 8 + Math.random() * 10,
  starSize: 6 + Math.random() * 8,
}));

export default function Particles({ rarity, mode }) {
  const config = RARITY_CONFIG[rarity || "common"];
  const cfg = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;

  if (mode === "swirl") {
    const count = cfg.particleCount;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
        {SWIRL_PARTICLES.map((p, i) => {
          const visible = i < count;
          const shared = {
            position: "absolute",
            left: "50%",
            top: "42%",
            "--angle": `${p.angle}deg`,
            "--radius": `${p.radius}px`,
            "--target-opacity": p.targetOpacity,
            animation: visible
              ? `particleOrbit ${p.orbitDuration}s linear infinite, particleFadeIn 0.5s ease ${p.fadeDelay}s forwards`
              : undefined,
            opacity: 0,
            willChange: "transform, opacity",
            transition: "color 0.5s ease, background 0.5s ease, box-shadow 0.5s ease, text-shadow 0.5s ease",
          };
          return p.isStar ? (
            <div key={i} style={{
              ...shared,
              fontSize: visible ? p.starSize : 0,
              color: config.color,
              textShadow: `0 0 8px ${config.color}`,
            }}>✦</div>
          ) : (
            <div key={i} style={{
              ...shared,
              width: visible ? p.size : 0,
              height: visible ? p.size : 0,
              borderRadius: "50%",
              background: config.color,
              boxShadow: visible ? `0 0 ${p.size * 3}px ${config.color}` : "none",
            }} />
          );
        })}
      </div>
    );
  }

  if (mode === "burst") {
    const count = cfg.particleCount;
    const burstMs = cfg.burstMs;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 15 }}>
        {BURST_PARTICLES.slice(0, count).map((p, i) => {
          const distance = p.distBase + (rarity === "legendary" ? p.distExtra : rarity === "epic" ? p.distExtra * 0.6 : 0);
          const duration = (burstMs * p.durationFactor) / 1000;
          const delay = (burstMs * p.delayFactor) / 1000;
          const shared = {
            position: "absolute",
            left: "50%",
            top: "42%",
            animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
            "--angle": `${p.angle}deg`,
            "--distance": `${distance}px`,
            opacity: 0,
            willChange: "transform, opacity",
          };
          if (p.type > 0.75) {
            return (
              <div key={i} style={{
                ...shared,
                fontSize: p.heartSize,
                color: config.color,
              }}>♥</div>
            );
          }
          if (p.type > 0.5) {
            return (
              <div key={i} style={{
                ...shared,
                fontSize: p.starSize,
                color: config.color,
                textShadow: `0 0 6px ${config.color}`,
              }}>✦</div>
            );
          }
          return (
            <div key={i} style={{
              ...shared,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: config.color,
              boxShadow: `0 0 ${p.size * 2}px ${config.color}`,
            }} />
          );
        })}
      </div>
    );
  }

  return null;
}
