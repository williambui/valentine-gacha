import { useState, useEffect } from "react";

// === DATA (unchanged) ===

const REWARDS = [
  { id: 1, name: "Forehead Kiss", rarity: "common", emoji: "😘", category: "Affection", description: "Redeemable anytime, anywhere" },
  { id: 2, name: "Movie Night Pick", rarity: "common", emoji: "🎬", category: "Date", description: "You choose the movie, no complaints" },
  { id: 3, name: "Breakfast in Bed", rarity: "common", emoji: "🥞", category: "Food", description: "Chef William at your service" },
  { id: 4, name: "10 Min Massage", rarity: "common", emoji: "💆", category: "Affection", description: "Guaranteed no stopping early" },
  { id: 5, name: "Love Letter", rarity: "common", emoji: "💌", category: "Affection", description: "Handwritten with extra cheesiness" },
  { id: 6, name: "Bao Cuddle Session", rarity: "common", emoji: "🐶", category: "Affection", description: "Mandatory group hug with Bao" },
  { id: 7, name: "Dessert Run", rarity: "common", emoji: "🍰", category: "Food", description: "Any dessert, any time, no questions" },
  { id: 8, name: "Playlist Dedication", rarity: "common", emoji: "🎵", category: "Affection", description: "A custom playlist just for you" },
  { id: 9, name: "Homemade Steak Dinner", rarity: "rare", emoji: "🥩", category: "Food", description: "Reverse sear, your preferred doneness" },
  { id: 10, name: "Spa Night", rarity: "rare", emoji: "🧖", category: "Date", description: "Face masks, candles, the whole vibe" },
  { id: 11, name: "Shopping Spree", rarity: "rare", emoji: "🛍️", category: "Gift", description: "A surprise shopping trip on me" },
  { id: 12, name: "Picnic Date", rarity: "rare", emoji: "🧺", category: "Date", description: "A curated picnic at a scenic spot" },
  { id: 13, name: "30 Min Massage", rarity: "rare", emoji: "✨", category: "Affection", description: "The deluxe edition, with oils" },
  { id: 14, name: "Cook Together Night", rarity: "rare", emoji: "👩‍🍳", category: "Food", description: "We pick a new recipe and tackle it together" },
  { id: 15, name: "Fancy Dinner Out", rarity: "epic", emoji: "🍷", category: "Date", description: "A proper restaurant, dress up, the works" },
  { id: 16, name: "Day Trip Adventure", rarity: "epic", emoji: "🗺️", category: "Date", description: "A surprise day trip to somewhere new" },
  { id: 17, name: "Full Day of Pampering", rarity: "epic", emoji: "👑", category: "Affection", description: "An entire day dedicated to spoiling you" },
  { id: 18, name: "Custom Gift", rarity: "epic", emoji: "🎁", category: "Gift", description: "Something special I know you've been wanting" },
  { id: 19, name: "Weekend Getaway", rarity: "legendary", emoji: "✈️", category: "Date", description: "A surprise weekend trip, bags packed" },
  { id: 20, name: "Unlimited Wish", rarity: "legendary", emoji: "🌟", category: "Gift", description: "Name it. It's yours. No limits." },
];

const RARITY_CONFIG = {
  common: { label: "Common", color: "#9ca3af", bg: "#1f2937", glow: "rgba(156,163,175,0.3)", chance: 50 },
  rare: { label: "Rare", color: "#60a5fa", bg: "#1e3a5f", glow: "rgba(96,165,250,0.4)", chance: 30 },
  epic: { label: "Epic", color: "#c084fc", bg: "#3b1f6e", glow: "rgba(192,132,252,0.5)", chance: 15 },
  legendary: { label: "Legendary", color: "#fbbf24", bg: "#5c3d0e", glow: "rgba(251,191,36,0.6)", chance: 5 },
};

function getRandomReward() {
  const roll = Math.random() * 100;
  let rarity;
  if (roll < 5) rarity = "legendary";
  else if (roll < 20) rarity = "epic";
  else if (roll < 50) rarity = "rare";
  else rarity = "common";
  const pool = REWARDS.filter((r) => r.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

// === VISUAL CONSTANTS ===

const RARITY_STARS = { common: 3, rare: 4, epic: 5, legendary: 5 };

// Pre-computed starfield (stable across renders)
const BG_STARS = Array.from({ length: 55 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 2,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 4,
}));

// === ANIMATION COMPONENTS ===

function Particles({ rarity, mode }) {
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

function GiftBox({ phase, rarity }) {
  const rarityColor = rarity ? RARITY_CONFIG[rarity].color : "#ff6b9d";
  const rarityGlow = rarity ? RARITY_CONFIG[rarity].glow : "rgba(255,107,157,0.4)";

  const wrapperAnim =
    phase === "opening"
      ? "boxShake 1.5s ease-in-out"
      : phase === "idle"
        ? "idleFloat 3s ease-in-out infinite"
        : undefined;

  return (
    <div style={{ position: "relative", height: 240, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      {/* Glow pool */}
      <div style={{
        position: "absolute",
        bottom: -15,
        left: "50%",
        transform: "translateX(-50%)",
        width: 220,
        height: 70,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${phase === "opening" ? rarityGlow : "rgba(255,107,157,0.2)"}, transparent 70%)`,
        filter: "blur(18px)",
        animation: phase === "opening" ? "glowBuild 1.5s ease-in forwards" : "idleGlowPulse 2.5s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Sparkle stars (idle) */}
      {phase === "idle" && Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${12 + i * 11}%`,
          top: `${6 + (i % 4) * 22}%`,
          fontSize: 7 + (i % 3) * 3,
          color: "#ffd54f",
          textShadow: "0 0 8px rgba(255,213,79,0.6)",
          animation: `twinkle ${1 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
          opacity: 0,
          pointerEvents: "none",
        }}>✦</div>
      ))}

      {/* Shake/float wrapper */}
      <div style={{ position: "relative", width: 170, animation: wrapperAnim, zIndex: 1 }}>
        {/* Box body */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 15,
          width: 140,
          height: 110,
          background: "linear-gradient(160deg, #ff8ab5 0%, #ff6b9d 35%, #ff4d8d 100%)",
          borderRadius: "6px 6px 10px 10px",
          boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(255,107,157,0.15)",
          animation: phase === "burst" ? "boxBodyFade 0.5s ease-out forwards" : undefined,
          overflow: "hidden",
        }}>
          {/* Subtle diagonal pattern */}
          <div style={{
            position: "absolute", inset: 0,
            background: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.03) 12px, rgba(255,255,255,0.03) 13px)",
            borderRadius: "inherit",
          }} />
          {/* Vertical ribbon */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 24,
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #d4a017, #ffd54f 25%, #fff59d 50%, #ffd54f 75%, #d4a017)",
            boxShadow: "0 0 12px rgba(255,213,79,0.3)",
          }} />
          {/* Horizontal ribbon */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 24,
            transform: "translateY(-50%)",
            background: "linear-gradient(180deg, #d4a017, #ffd54f 25%, #fff59d 50%, #ffd54f 75%, #d4a017)",
            boxShadow: "0 0 12px rgba(255,213,79,0.3)",
          }} />
          {/* Center gem */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 20, height: 20,
            transform: "translate(-50%, -50%) rotate(45deg)",
            background: "linear-gradient(135deg, #fff59d, #ffd54f, #ffb300)",
            boxShadow: "0 0 14px rgba(255,213,79,0.6)",
            zIndex: 2, borderRadius: 3,
          }} />
        </div>

        {/* Seam glow */}
        {phase === "opening" && (
          <div style={{
            position: "absolute", bottom: 108, left: 8, right: 8, height: 8,
            background: rarityColor, filter: "blur(6px)",
            animation: "seamGlow 1.5s ease-in forwards",
            opacity: 0, zIndex: 4, borderRadius: 4,
          }} />
        )}

        {/* Lid */}
        <div style={{
          position: "absolute", bottom: 110, left: 3, width: 164, height: 32,
          background: "linear-gradient(160deg, #ffadc9, #ff8ab5 40%, #ff6b9d)",
          borderRadius: "8px 8px 3px 3px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.3)",
          animation: phase === "burst" ? "lidFlyOff 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards" : undefined,
          zIndex: 3, overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 24,
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #d4a017, #ffd54f 25%, #fff59d 50%, #ffd54f 75%, #d4a017)",
          }} />
        </div>

        {/* Bow */}
        <div style={{
          position: "absolute", bottom: 140, left: "50%",
          transform: "translateX(-50%)", width: 70, height: 45, zIndex: 4,
          animation: phase === "burst" ? "lidFlyOff 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards" : undefined,
        }}>
          <div style={{
            position: "absolute", left: -2, top: 8, width: 32, height: 26, borderRadius: "50%",
            background: "linear-gradient(135deg, #fff59d, #ffd54f, #d4a017)",
            transform: "rotate(-30deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
          }} />
          <div style={{
            position: "absolute", right: -2, top: 8, width: 32, height: 26, borderRadius: "50%",
            background: "linear-gradient(225deg, #fff59d, #ffd54f, #d4a017)",
            transform: "rotate(30deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
          }} />
          <div style={{
            position: "absolute", left: 10, bottom: -4, width: 12, height: 20,
            background: "linear-gradient(180deg, #ffd54f, #d4a017)",
            borderRadius: "0 0 3px 8px", transform: "rotate(15deg) skewX(-10deg)",
          }} />
          <div style={{
            position: "absolute", right: 10, bottom: -4, width: 12, height: 20,
            background: "linear-gradient(180deg, #ffd54f, #d4a017)",
            borderRadius: "0 0 8px 3px", transform: "rotate(-15deg) skewX(10deg)",
          }} />
          <div style={{
            position: "absolute", left: "50%", top: 12, width: 20, height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fff59d, #ffd54f, #f59e0b)",
            transform: "translateX(-50%)",
            boxShadow: "0 2px 10px rgba(255,213,79,0.5)", zIndex: 1,
          }} />
        </div>
      </div>
    </div>
  );
}

function LightBeam({ rarity, active }) {
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

function ScreenFlash({ rarity, active }) {
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

function StarRating({ rarity, animated }) {
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

function RewardCard({ reward, isNew }) {
  const config = RARITY_CONFIG[reward.rarity];
  const isHighRarity = reward.rarity === "legendary" || reward.rarity === "epic";

  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 320, margin: "0 auto",
      animation: "cardReveal 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      opacity: 0,
    }}>
      <Particles rarity={reward.rarity} mode="burst" />

      {/* Holographic border for epic/legendary */}
      {isHighRarity && (
        <div className="holo-border" style={{
          position: "absolute", inset: -3, borderRadius: 26,
          zIndex: 5, pointerEvents: "none",
        }} />
      )}

      <div style={{
        position: "relative", zIndex: 10,
        background: `linear-gradient(145deg, ${config.bg}, #0a0a15, ${config.bg}40)`,
        border: `2px solid ${config.color}60`,
        borderRadius: 22,
        padding: "28px 24px 24px",
        textAlign: "center",
        boxShadow: `0 0 40px ${config.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
        "--glow": config.glow,
        backdropFilter: "blur(20px)",
        animation: isHighRarity ? "shimmer 2s ease-in-out infinite" : undefined,
      }}>
        {isNew && (
          <div style={{
            position: "absolute", top: -12, right: -8,
            background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
            color: "white", fontSize: 11, fontWeight: 800,
            padding: "4px 14px", borderRadius: 20,
            fontFamily: "'Nunito', sans-serif", letterSpacing: "0.08em",
            animation: "pulse 1.5s ease-in-out infinite",
            boxShadow: "0 2px 12px rgba(238,90,36,0.4)",
          }}>
            NEW!
          </div>
        )}

        <StarRating rarity={reward.rarity} animated={true} />

        <div style={{
          fontSize: 60, lineHeight: 1, marginTop: 12, marginBottom: 12,
          filter: `drop-shadow(0 0 16px ${config.glow})`,
          animation: "emojiPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
        }}>
          {reward.emoji}
        </div>

        <div style={{
          fontSize: 12, fontWeight: 700, color: config.color,
          textTransform: "uppercase", letterSpacing: "0.2em",
          fontFamily: "'Nunito', sans-serif", marginBottom: 6, opacity: 0.9,
        }}>
          {config.label}
        </div>

        <div style={{
          fontSize: 22, fontWeight: 900, color: "#fff",
          fontFamily: "'Cinzel', serif", marginBottom: 6, letterSpacing: "0.03em",
        }}>
          {reward.name}
        </div>

        <div style={{
          fontSize: 12, color: "rgba(255,255,255,0.45)",
          fontFamily: "'Nunito', sans-serif", marginBottom: 10,
          textTransform: "uppercase", letterSpacing: "0.12em",
        }}>
          {reward.category}
        </div>

        <div style={{
          fontSize: 14, color: "rgba(255,255,255,0.7)",
          fontFamily: "'Nunito', sans-serif", fontStyle: "italic", lineHeight: 1.5,
        }}>
          "{reward.description}"
        </div>
      </div>
    </div>
  );
}

function CollectionGrid({ collection }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.8)",
        fontFamily: "'Cinzel', serif", marginBottom: 14,
        textAlign: "center", letterSpacing: "0.1em",
      }}>
        Collection — {collection.length}/{REWARDS.length}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
        gap: 8,
      }}>
        {REWARDS.map((reward) => {
          const owned = collection.find((c) => c.id === reward.id);
          const config = RARITY_CONFIG[reward.rarity];
          return (
            <div key={reward.id} title={owned ? `${reward.name} — ${reward.description}` : "???"} style={{
              aspectRatio: "1",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              fontSize: 26, borderRadius: 14,
              background: owned
                ? `linear-gradient(145deg, ${config.bg}cc, rgba(10,10,20,0.8))`
                : "rgba(255,255,255,0.02)",
              border: owned
                ? `1.5px solid ${config.color}50`
                : "1.5px solid rgba(255,255,255,0.04)",
              opacity: owned ? 1 : 0.2,
              transition: "all 0.3s",
              position: "relative",
              backdropFilter: owned ? "blur(10px)" : undefined,
              boxShadow: owned ? `0 0 12px ${config.glow}` : "none",
            }}>
              {owned ? reward.emoji : "?"}
              {owned && (
                <div style={{ display: "flex", gap: 1, marginTop: 2 }}>
                  {Array.from({ length: RARITY_STARS[reward.rarity] }).map((_, si) => (
                    <span key={si} style={{ fontSize: 5, color: config.color, opacity: 0.8 }}>★</span>
                  ))}
                </div>
              )}
              {owned && owned.count > 1 && (
                <div style={{
                  position: "absolute", top: 2, right: 4,
                  fontSize: 9, color: config.color, fontWeight: 800,
                  fontFamily: "'Nunito', sans-serif",
                }}>
                  ×{owned.count}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === MAIN COMPONENT ===

export default function ValentineGacha() {
  const [pulls, setPulls] = useState(10);
  const [collection, setCollection] = useState([]);
  const [currentReward, setCurrentReward] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [isNewReward, setIsNewReward] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [history, setHistory] = useState([]);

  function handlePull() {
    if (pulls <= 0 || phase !== "idle") return;
    const reward = getRandomReward();
    setCurrentReward(reward);
    setPhase("opening");
    setPulls((p) => p - 1);

    setTimeout(() => {
      setPhase("burst");
      setTimeout(() => {
        const isNew = !collection.find((c) => c.id === reward.id);
        setIsNewReward(isNew);
        setCollection((prev) => {
          const existing = prev.find((c) => c.id === reward.id);
          if (existing) return prev.map((c) => (c.id === reward.id ? { ...c, count: c.count + 1 } : c));
          return [...prev, { ...reward, count: 1 }];
        });
        setHistory((prev) => [reward, ...prev]);
        setPhase("reveal");
      }, 700);
    }, 1500);
  }

  function handleContinue() {
    setPhase("idle");
    setCurrentReward(null);
    setIsNewReward(false);
  }

  const rarityStats = {
    common: collection.filter((c) => c.rarity === "common").length,
    rare: collection.filter((c) => c.rarity === "rare").length,
    epic: collection.filter((c) => c.rarity === "epic").length,
    legendary: collection.filter((c) => c.rarity === "legendary").length,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .holo-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(90deg, #ff6b9d, #60a5fa, #c084fc, #fbbf24, #ff6b9d, #60a5fa);
          background-size: 300% 100%;
          animation: holoSlide 3s ease-in-out infinite alternate;
          opacity: 0.6;
          filter: blur(1px);
        }

        @keyframes holoSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(20deg); }
        }

        @keyframes starPop {
          0% { opacity: 0; transform: scale(0) rotate(-30deg); }
          60% { transform: scale(1.4) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes idleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes idleGlowPulse {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.2); }
        }

        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.08; }
          50% { transform: translateY(-35px) rotate(12deg); opacity: 0.18; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.08; }
        }

        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,157,0.3), 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15); }
          50% { box-shadow: 0 0 35px rgba(255,107,157,0.5), 0 0 60px rgba(255,107,157,0.2), 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15); }
        }

        @keyframes boxShake {
          0% { transform: translate(0, 0) rotate(0deg); }
          3% { transform: translate(-1px, 0) rotate(-0.3deg); }
          6% { transform: translate(1px, 0) rotate(0.3deg); }
          9% { transform: translate(0, -1px) rotate(0deg); }
          12% { transform: translate(-1px, 0) rotate(-0.3deg); }
          15% { transform: translate(1px, 1px) rotate(0.2deg); }
          18% { transform: translate(0, 0) rotate(0deg); }
          21% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          24% { transform: translate(2px, -1px) rotate(0.6deg); }
          27% { transform: translate(-2px, 0) rotate(-0.4deg); }
          30% { transform: translate(2px, 1px) rotate(0.5deg); }
          33% { transform: translate(-3px, -1px) rotate(-0.6deg); }
          36% { transform: translate(2px, 0) rotate(0.4deg); }
          39% { transform: translate(-2px, 1px) rotate(-0.3deg); }
          42% { transform: translate(3px, 0) rotate(0.5deg); }
          45% { transform: translate(-2px, -1px) rotate(-0.4deg); }
          48% { transform: translate(0, 0) rotate(0deg); }
          51% { transform: translate(-3px, 1px) rotate(-0.8deg); }
          54% { transform: translate(4px, -1px) rotate(0.9deg); }
          57% { transform: translate(-3px, -1px) rotate(-0.7deg); }
          60% { transform: translate(4px, 1px) rotate(0.8deg); }
          63% { transform: translate(-4px, 0) rotate(-0.9deg); }
          66% { transform: translate(3px, -1px) rotate(0.7deg); }
          69% { transform: translate(-5px, 2px) rotate(-1.2deg); }
          72% { transform: translate(6px, -1px) rotate(1.3deg); }
          75% { transform: translate(-5px, -2px) rotate(-1deg); }
          78% { transform: translate(6px, 1px) rotate(1.2deg); }
          81% { transform: translate(-6px, 0) rotate(-1.3deg); }
          84% { transform: translate(7px, -2px) rotate(1.5deg); }
          87% { transform: translate(-6px, 2px) rotate(-1.2deg); }
          90% { transform: translate(7px, -1px) rotate(1.4deg); }
          93% { transform: translate(-7px, 1px) rotate(-1.5deg); }
          96% { transform: translate(6px, -2px) rotate(1.3deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes glowBuild {
          0% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          100% { opacity: 1; transform: translateX(-50%) scale(1.8); }
        }

        @keyframes seamGlow {
          0% { opacity: 0; }
          30% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        @keyframes particleSwirl {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--startDist) * -1));
          }
          15% { opacity: 1; }
          100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) rotate(calc(var(--angle) + 270deg)) translateY(0);
          }
        }

        @keyframes lidFlyOff {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          35% { opacity: 1; }
          100% { transform: translateY(-240px) rotate(20deg); opacity: 0; }
        }

        @keyframes boxBodyFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.6) translateY(25px); }
        }

        @keyframes beamShoot {
          0% { opacity: 0; transform: translateX(-50%) scaleY(0); transform-origin: bottom; }
          25% { opacity: 0.95; }
          100% { opacity: 0.6; transform: translateX(-50%) scaleY(1); transform-origin: bottom; }
        }

        @keyframes screenFlash {
          0% { opacity: var(--flash-intensity); }
          100% { opacity: 0; }
        }

        @keyframes particleBurst {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)); }
        }

        @keyframes cardReveal {
          0% { opacity: 0; transform: scale(0.1) translateY(70px); }
          45% { opacity: 1; transform: scale(1.08) translateY(-10px); }
          70% { transform: scale(0.96) translateY(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes emojiPop {
          0% { transform: scale(0) rotate(-15deg); }
          70% { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes shimmer {
          0%, 100% { box-shadow: 0 0 30px var(--glow), inset 0 1px 0 rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 55px var(--glow), 0 0 90px var(--glow), inset 0 1px 0 rgba(255,255,255,0.2); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #080613 0%, #12082a 25%, #0d0620 50%, #0a0418 75%, #080613 100%)",
        color: "#fff",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Nebula overlays */}
        <div style={{
          position: "fixed", inset: 0,
          background: "radial-gradient(ellipse at 20% 50%, rgba(255,107,157,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(96,165,250,0.04) 0%, transparent 50%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Starfield */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {BG_STARS.map((star, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${star.x}%`, top: `${star.y}%`,
              width: star.size, height: star.size,
              borderRadius: "50%", background: "#fff",
              boxShadow: star.size > 1.5 ? `0 0 ${star.size * 3}px rgba(255,255,255,0.3)` : undefined,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              opacity: 0,
            }} />
          ))}
        </div>

        {/* Floating cosmic elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            position: "fixed",
            fontSize: 14 + i * 3,
            left: `${8 + i * 16}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `floatHeart ${5 + i * 0.6}s ease-in-out ${i * 0.5}s infinite`,
            opacity: 0.06, pointerEvents: "none", zIndex: 0,
          }}>
            {["\u{2728}", "\u{1F497}", "\u2726", "\u{1F496}", "\u2727", "\u{1F49D}"][i]}
          </div>
        ))}

        <ScreenFlash rarity={currentReward?.rarity} active={phase === "burst"} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto", padding: "36px 20px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10,
            }}>
              <span style={{ color: "#ffd54f", fontSize: 10, letterSpacing: "0.3em", opacity: 0.5 }}>✦ ━━━</span>
              <span style={{
                fontSize: 12, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "#ff6b9d", fontWeight: 800,
              }}>
                Happy Valentine's Day
              </span>
              <span style={{ color: "#ffd54f", fontSize: 10, letterSpacing: "0.3em", opacity: 0.5 }}>━━━ ✦</span>
            </div>
            <h1 style={{
              fontSize: 40, fontWeight: 900, fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #ffb3d0, #ff6b9d, #ff4d8d, #ff6b9d)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.2, marginBottom: 6, letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 20px rgba(255,107,157,0.3))",
            }}>
              Love Gacha
            </h1>
            <div style={{
              fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.15em",
            }}>
              Star Warp — Valentine's Edition
            </div>
          </div>

          {/* Rarity guide with stars */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 14, marginBottom: 24, fontSize: 11, fontWeight: 700,
          }}>
            {Object.entries(RARITY_CONFIG).map(([key, cfg]) => (
              <div key={key} style={{ color: cfg.color, opacity: 0.6, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 7 }}>
                  {Array.from({ length: RARITY_STARS[key] }).map((_, i) => <span key={i}>★</span>)}
                </span>
                <span>{rarityStats[key]}/{REWARDS.filter((r) => r.rarity === key).length}</span>
              </div>
            ))}
          </div>

          {/* === MAIN GLASS PANEL === */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 24,
            padding: "28px 20px 24px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 20,
          }}>
            {/* Corner accents */}
            {[{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }].map((pos, i) => (
              <div key={i} style={{
                position: "absolute", ...pos,
                width: 6, height: 6, borderRadius: 1,
                background: "rgba(255,213,79,0.2)",
                transform: "rotate(45deg)", pointerEvents: "none",
              }} />
            ))}

            {/* IDLE */}
            {phase === "idle" && (
              <div style={{ animation: "fadeIn 0.4s ease-out" }}>
                <GiftBox phase="idle" rarity={null} />
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={handlePull}
                    disabled={pulls <= 0}
                    style={{
                      padding: "16px 48px", fontSize: 16, fontWeight: 800,
                      fontFamily: "'Nunito', sans-serif", color: "#fff",
                      background: pulls <= 0
                        ? "rgba(255,255,255,0.06)"
                        : "linear-gradient(135deg, #ff6b9d, #ff4d8d, #e8356d)",
                      border: pulls <= 0
                        ? "2px solid rgba(255,255,255,0.06)"
                        : "2px solid rgba(255,107,157,0.5)",
                      borderRadius: 50,
                      cursor: pulls <= 0 ? "not-allowed" : "pointer",
                      letterSpacing: "0.06em",
                      animation: pulls > 0 ? "buttonGlow 2s ease-in-out infinite" : undefined,
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => { if (pulls > 0) e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    ✦ Make a Wish ✦
                  </button>
                  <div style={{
                    marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.35)",
                    fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <span style={{
                      background: "linear-gradient(135deg, #c084fc, #818cf8)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 15,
                    }}>💎</span>
                    <span>×{pulls} remaining</span>
                  </div>
                  {pulls <= 0 && (
                    <div style={{ marginTop: 10, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                      All wishes used! Check your collection ✦
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OPENING */}
            {phase === "opening" && currentReward && (
              <div style={{ position: "relative" }}>
                <GiftBox phase="opening" rarity={currentReward.rarity} />
                <Particles rarity={currentReward.rarity} mode="swirl" />
                <div style={{
                  textAlign: "center", marginTop: 16, fontSize: 13,
                  color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.1em",
                }}>
                  ✦ Wishing... ✦
                </div>
              </div>
            )}

            {/* BURST */}
            {phase === "burst" && currentReward && (
              <div style={{ position: "relative" }}>
                <LightBeam rarity={currentReward.rarity} active={true} />
                <GiftBox phase="burst" rarity={currentReward.rarity} />
                <Particles rarity={currentReward.rarity} mode="burst" />
              </div>
            )}

            {/* REVEAL */}
            {phase === "reveal" && currentReward && (
              <div style={{ animation: "fadeIn 0.3s ease-out" }}>
                <RewardCard reward={currentReward} isNew={isNewReward} />
                <div style={{ marginTop: 24, textAlign: "center" }}>
                  <button
                    onClick={handleContinue}
                    style={{
                      padding: "14px 40px", fontSize: 15, fontWeight: 800,
                      fontFamily: "'Nunito', sans-serif", color: "#fff",
                      background: pulls > 0
                        ? "linear-gradient(135deg, #ff6b9d, #ff4d8d)"
                        : "rgba(255,255,255,0.05)",
                      border: pulls > 0
                        ? "2px solid rgba(255,107,157,0.4)"
                        : "1.5px solid rgba(255,255,255,0.08)",
                      borderRadius: 50, cursor: "pointer",
                      transition: "transform 0.2s", letterSpacing: "0.04em",
                      boxShadow: pulls > 0 ? "0 0 20px rgba(255,107,157,0.25)" : "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {pulls > 0 ? "✦ Wish Again" : "View Collection"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Collection panel */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: 20, overflow: "hidden",
          }}>
            <button
              onClick={() => setShowCollection((s) => !s)}
              style={{
                width: "100%", padding: "14px", fontSize: 13, fontWeight: 700,
                fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.45)",
                background: "transparent", border: "none", cursor: "pointer",
                letterSpacing: "0.08em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <span style={{ fontSize: 10, color: "#ffd54f", opacity: 0.4 }}>✦</span>
              {showCollection ? "Hide Collection" : "View Collection"}
              <span style={{ fontSize: 10, color: "#ffd54f", opacity: 0.4 }}>✦</span>
            </button>
            {showCollection && (
              <div style={{ padding: "0 16px 16px" }}>
                <CollectionGrid collection={collection} />
              </div>
            )}
          </div>

          {/* Recent wishes */}
          {history.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center",
                marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700,
              }}>
                ✦ Recent Wishes ✦
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                {history.slice(0, 10).map((r, i) => {
                  const cfg = RARITY_CONFIG[r.rarity];
                  return (
                    <div key={i} title={r.name} style={{
                      fontSize: 20, width: 38, height: 38,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 10,
                      background: `${cfg.bg}60`,
                      border: `1px solid ${cfg.color}20`,
                      boxShadow: `0 0 8px ${cfg.glow}`,
                      backdropFilter: "blur(8px)",
                    }}>
                      {r.emoji}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
