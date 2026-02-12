import { RARITY_CONFIG } from "../data/rewards";

export default function Particles({ rarity, mode }) {
  const config = RARITY_CONFIG[rarity || "common"];

  if (mode === "swirl") {
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (360 / 28) * i + Math.random() * 15;
          const startDist = 100 + Math.random() * 120;
          const size = 2 + Math.random() * 4;
          const duration = 0.7 + Math.random() * 0.8;
          const delay = Math.random() * 0.8;
          const isStar = Math.random() > 0.6;
          return isStar ? (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                fontSize: 8 + Math.random() * 6,
                color: config.color,
                textShadow: `0 0 8px ${config.color}`,
                animation: `particleSwirl ${duration}s ease-in ${delay}s forwards`,
                "--angle": `${angle}deg`,
                "--startDist": `${startDist}px`,
                opacity: 0,
              }}
            >
              ✦
            </div>
          ) : (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                width: size,
                height: size,
                borderRadius: "50%",
                background: config.color,
                boxShadow: `0 0 ${size * 3}px ${config.color}`,
                animation: `particleSwirl ${duration}s ease-in ${delay}s forwards`,
                "--angle": `${angle}deg`,
                "--startDist": `${startDist}px`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (mode === "burst") {
    const count = rarity === "legendary" ? 50 : rarity === "epic" ? 36 : rarity === "rare" ? 22 : 14;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 15 }}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (360 / count) * i + Math.random() * 10;
          const distance = 50 + Math.random() * 200;
          const size = 2 + Math.random() * 6;
          const duration = 0.4 + Math.random() * 1;
          const delay = Math.random() * 0.2;
          const type = Math.random();
          if (type > 0.75) {
            return (
              <div key={i} style={{
                position: "absolute", left: "50%", top: "42%",
                fontSize: 8 + Math.random() * 10,
                color: config.color,
                animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
                "--angle": `${angle}deg`, "--distance": `${distance}px`,
                opacity: 0,
              }}>♥</div>
            );
          }
          if (type > 0.5) {
            return (
              <div key={i} style={{
                position: "absolute", left: "50%", top: "42%",
                fontSize: 6 + Math.random() * 8,
                color: config.color,
                textShadow: `0 0 6px ${config.color}`,
                animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
                "--angle": `${angle}deg`, "--distance": `${distance}px`,
                opacity: 0,
              }}>✦</div>
            );
          }
          return (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "42%",
              width: size, height: size,
              borderRadius: "50%",
              background: config.color,
              boxShadow: `0 0 ${size * 2}px ${config.color}`,
              animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
              "--angle": `${angle}deg`, "--distance": `${distance}px`,
              opacity: 0,
            }} />
          );
        })}
      </div>
    );
  }

  return null;
}
