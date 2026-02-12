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

// === ANIMATION COMPONENTS ===

function Particles({ rarity, mode }) {
  const config = RARITY_CONFIG[rarity || "common"];

  if (mode === "swirl") {
    const count = 24;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (360 / count) * i + Math.random() * 15;
          const startDist = 120 + Math.random() * 100;
          const size = 2 + Math.random() * 4;
          const duration = 0.8 + Math.random() * 0.7;
          const delay = Math.random() * 0.8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "45%",
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
    const count = rarity === "legendary" ? 45 : rarity === "epic" ? 32 : rarity === "rare" ? 20 : 12;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 15 }}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (360 / count) * i + Math.random() * 10;
          const distance = 60 + Math.random() * 180;
          const size = 2 + Math.random() * 6;
          const duration = 0.5 + Math.random() * 0.9;
          const delay = Math.random() * 0.15;
          const isHeart = Math.random() > 0.7;
          return isHeart ? (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "45%",
                fontSize: 8 + Math.random() * 8,
                animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
                "--angle": `${angle}deg`,
                "--distance": `${distance}px`,
                opacity: 0,
              }}
            >
              ♥
            </div>
          ) : (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "45%",
                width: size,
                height: size,
                borderRadius: "50%",
                background: config.color,
                boxShadow: `0 0 ${size * 2}px ${config.color}`,
                animation: `particleBurst ${duration}s ease-out ${delay}s forwards`,
                "--angle": `${angle}deg`,
                "--distance": `${distance}px`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>
    );
  }

  return null;
}

function GiftBox({ phase, rarity }) {
  const rarityColor = rarity ? RARITY_CONFIG[rarity].color : "#f43f5e";
  const rarityGlow = rarity ? RARITY_CONFIG[rarity].glow : "rgba(244,63,94,0.4)";

  const wrapperAnimation =
    phase === "opening"
      ? "boxShake 1.5s ease-in-out"
      : phase === "idle"
        ? "idleFloat 3s ease-in-out infinite"
        : undefined;

  return (
    <div style={{ position: "relative", height: 220, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      {/* Glow pool beneath box */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${phase === "opening" ? rarityGlow : "rgba(225,29,72,0.25)"}, transparent 70%)`,
          filter: "blur(15px)",
          animation:
            phase === "opening"
              ? "glowBuild 1.5s ease-in forwards"
              : "idleGlowPulse 2.5s ease-in-out infinite",
          "--rarity-glow": rarityGlow,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Sparkles around box (idle only) */}
      {phase === "idle" &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${18 + i * 13}%`,
              top: `${5 + (i % 3) * 28}%`,
              width: 3,
              height: 3,
              background: "#fbbf24",
              borderRadius: "50%",
              boxShadow: "0 0 6px #fbbf24",
              animation: `twinkle ${1.2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* Shake/float wrapper */}
      <div style={{ position: "relative", width: 160, animation: wrapperAnimation, zIndex: 1 }}>
        {/* Box body */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 10,
            width: 140,
            height: 105,
            background: "linear-gradient(160deg, #f43f5e 0%, #e11d48 40%, #be123c 100%)",
            borderRadius: "3px 3px 6px 6px",
            boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.15)",
            animation: phase === "burst" ? "boxBodyFade 0.5s ease-out forwards" : undefined,
            overflow: "hidden",
          }}
        >
          {/* Vertical ribbon */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 22,
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #d97706, #fbbf24 30%, #fde68a 50%, #fbbf24 70%, #d97706)",
              boxShadow: "0 0 8px rgba(251,191,36,0.3)",
            }}
          />
          {/* Horizontal ribbon */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 22,
              transform: "translateY(-50%)",
              background: "linear-gradient(180deg, #d97706, #fbbf24 30%, #fde68a 50%, #fbbf24 70%, #d97706)",
              boxShadow: "0 0 8px rgba(251,191,36,0.3)",
            }}
          />
        </div>

        {/* Seam glow (opening phase) */}
        {phase === "opening" && (
          <div
            style={{
              position: "absolute",
              bottom: 103,
              left: 4,
              right: 4,
              height: 6,
              background: rarityColor,
              filter: "blur(5px)",
              animation: "seamGlow 1.5s ease-in forwards",
              opacity: 0,
              zIndex: 4,
              borderRadius: 3,
            }}
          />
        )}

        {/* Lid */}
        <div
          style={{
            position: "absolute",
            bottom: 105,
            left: 0,
            width: 160,
            height: 30,
            background: "linear-gradient(160deg, #fb7185, #f43f5e 40%, #e11d48)",
            borderRadius: "5px 5px 2px 2px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)",
            animation: phase === "burst" ? "lidFlyOff 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards" : undefined,
            zIndex: 3,
            overflow: "hidden",
          }}
        >
          {/* Lid ribbon */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 22,
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #d97706, #fbbf24 30%, #fde68a 50%, #fbbf24 70%, #d97706)",
            }}
          />
        </div>

        {/* Bow */}
        <div
          style={{
            position: "absolute",
            bottom: 133,
            left: "50%",
            transform: "translateX(-50%)",
            width: 56,
            height: 36,
            zIndex: 4,
            animation: phase === "burst" ? "lidFlyOff 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards" : undefined,
          }}
        >
          {/* Left loop */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 8,
              width: 24,
              height: 20,
              borderRadius: "50% 50% 50% 50%",
              background: "linear-gradient(135deg, #fde68a, #fbbf24, #d97706)",
              transform: "rotate(-25deg)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
          {/* Right loop */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 8,
              width: 24,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(225deg, #fde68a, #fbbf24, #d97706)",
              transform: "rotate(25deg)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
          {/* Left tail */}
          <div
            style={{
              position: "absolute",
              left: 6,
              bottom: -2,
              width: 10,
              height: 16,
              background: "linear-gradient(180deg, #fbbf24, #d97706)",
              borderRadius: "0 0 2px 6px",
              transform: "rotate(15deg) skewX(-10deg)",
            }}
          />
          {/* Right tail */}
          <div
            style={{
              position: "absolute",
              right: 6,
              bottom: -2,
              width: 10,
              height: 16,
              background: "linear-gradient(180deg, #fbbf24, #d97706)",
              borderRadius: "0 0 6px 2px",
              transform: "rotate(-15deg) skewX(10deg)",
            }}
          />
          {/* Center knot */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 10,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #fde68a, #f59e0b)",
              transform: "translateX(-50%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LightBeam({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const width = rarity === "legendary" ? 140 : rarity === "epic" ? 100 : 70;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "20%",
        width,
        height: "130%",
        transform: "translateX(-50%)",
        background: `linear-gradient(to top, ${config.color}cc, ${config.color}40 40%, transparent 80%)`,
        opacity: 0,
        animation: "beamShoot 0.7s ease-out forwards",
        filter: `blur(${rarity === "legendary" ? 15 : 10}px)`,
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}

function ScreenFlash({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const intensity = rarity === "legendary" ? 0.5 : rarity === "epic" ? 0.35 : rarity === "rare" ? 0.2 : 0.1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${config.color}, transparent 70%)`,
        animation: "screenFlash 0.6s ease-out forwards",
        "--flash-intensity": intensity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
}

function RewardCard({ reward, isNew }) {
  const config = RARITY_CONFIG[reward.rarity];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        animation: "cardReveal 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        opacity: 0,
      }}
    >
      <Particles rarity={reward.rarity} mode="burst" />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: `linear-gradient(145deg, ${config.bg}, #0a0a0f)`,
          border: `2px solid ${config.color}`,
          borderRadius: 20,
          padding: "32px 24px",
          textAlign: "center",
          boxShadow: `0 0 30px ${config.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          "--glow": config.glow,
          animation:
            reward.rarity === "legendary" || reward.rarity === "epic"
              ? "shimmer 2s ease-in-out infinite"
              : undefined,
        }}
      >
        {isNew && (
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              background: "#ef4444",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.05em",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            NEW!
          </div>
        )}
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: config.color,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
          }}
        >
          {config.label}
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1,
            marginBottom: 16,
            filter: `drop-shadow(0 0 12px ${config.glow})`,
            animation: "emojiPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
          }}
        >
          {reward.emoji}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            marginBottom: 8,
          }}
        >
          {reward.name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
          }}
        >
          {reward.category}
        </div>
        <div
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          "{reward.description}"
        </div>
      </div>
    </div>
  );
}

function CollectionGrid({ collection }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "'Playfair Display', serif",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Your Collection ({collection.length}/{REWARDS.length})
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 8,
        }}
      >
        {REWARDS.map((reward) => {
          const owned = collection.find((c) => c.id === reward.id);
          const config = RARITY_CONFIG[reward.rarity];
          return (
            <div
              key={reward.id}
              title={owned ? `${reward.name} — ${reward.description}` : "???"}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                borderRadius: 12,
                background: owned ? `linear-gradient(145deg, ${config.bg}, #0a0a0f)` : "rgba(255,255,255,0.03)",
                border: owned ? `1.5px solid ${config.color}40` : "1.5px solid rgba(255,255,255,0.06)",
                opacity: owned ? 1 : 0.3,
                transition: "all 0.3s",
                position: "relative",
              }}
            >
              {owned ? reward.emoji : "?"}
              {owned && owned.count > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 4,
                    fontSize: 10,
                    color: config.color,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  x{owned.count}
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
  const [phase, setPhase] = useState("idle"); // idle, opening, burst, reveal
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* === IDLE ANIMATIONS === */

        @keyframes idleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes idleGlowPulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.9; transform: translateX(-50%) scale(1.15); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }

        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.22; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.12; }
        }

        /* === OPENING PHASE === */

        @keyframes boxShake {
          /* Gentle start */
          0% { transform: translate(0, 0) rotate(0deg); }
          3% { transform: translate(-1px, 0) rotate(-0.3deg); }
          6% { transform: translate(1px, 0) rotate(0.3deg); }
          9% { transform: translate(0, -1px) rotate(0deg); }
          12% { transform: translate(-1px, 0) rotate(-0.3deg); }
          15% { transform: translate(1px, 1px) rotate(0.2deg); }
          18% { transform: translate(0, 0) rotate(0deg); }
          /* Medium intensity */
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
          /* Building */
          51% { transform: translate(-3px, 1px) rotate(-0.8deg); }
          54% { transform: translate(4px, -1px) rotate(0.9deg); }
          57% { transform: translate(-3px, -1px) rotate(-0.7deg); }
          60% { transform: translate(4px, 1px) rotate(0.8deg); }
          63% { transform: translate(-4px, 0) rotate(-0.9deg); }
          66% { transform: translate(3px, -1px) rotate(0.7deg); }
          /* Intense */
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
          0% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          100% { opacity: 1; transform: translateX(-50%) scale(1.6); }
        }

        @keyframes seamGlow {
          0% { opacity: 0; }
          30% { opacity: 0.2; }
          100% { opacity: 0.9; }
        }

        @keyframes particleSwirl {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--startDist) * -1));
          }
          15% { opacity: 1; }
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) rotate(calc(var(--angle) + 270deg)) translateY(0);
          }
        }

        /* === BURST PHASE === */

        @keyframes lidFlyOff {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          40% { opacity: 1; }
          100% { transform: translateY(-220px) rotate(18deg); opacity: 0; }
        }

        @keyframes boxBodyFade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.7) translateY(20px); }
        }

        @keyframes beamShoot {
          0% { opacity: 0; transform: translateX(-50%) scaleY(0); transform-origin: bottom; }
          30% { opacity: 0.9; }
          100% { opacity: 0.5; transform: translateX(-50%) scaleY(1); transform-origin: bottom; }
        }

        @keyframes screenFlash {
          0% { opacity: var(--flash-intensity); }
          100% { opacity: 0; }
        }

        @keyframes particleBurst {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)); }
        }

        /* === REVEAL PHASE === */

        @keyframes cardReveal {
          0% { opacity: 0; transform: scale(0.15) translateY(60px); }
          50% { opacity: 1; transform: scale(1.06) translateY(-8px); }
          75% { transform: scale(0.97) translateY(3px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes emojiPop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        @keyframes shimmer {
          0%, 100% { box-shadow: 0 0 30px var(--glow), inset 0 1px 0 rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 50px var(--glow), 0 0 80px var(--glow), inset 0 1px 0 rgba(255,255,255,0.2); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0a0a0f 0%, #1a0a1a 30%, #0f0a1e 60%, #0a0a0f 100%)",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating hearts background */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              fontSize: 20 + i * 4,
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 30}%`,
              animation: `floatHeart ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.1,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {["\u{1F495}", "\u{1F497}", "\u{1F496}", "\u{2764}\u{FE0F}", "\u{1F49D}", "\u{1FA77}", "\u{1F498}", "\u{2665}\u{FE0F}"][i]}
          </div>
        ))}

        {/* Screen flash overlay */}
        <ScreenFlash rarity={currentReward?.rarity} active={phase === "burst"} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto", padding: "40px 20px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#f43f5e",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Happy Valentine's Day
            </div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 900,
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #fda4af, #f43f5e, #e11d48)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              Love Gacha
            </h1>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>
              Open gifts to discover your rewards
            </div>
          </div>

          {/* Rarity bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginBottom: 28,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {Object.entries(RARITY_CONFIG).map(([key, cfg]) => (
              <div key={key} style={{ color: cfg.color, opacity: 0.7 }}>
                {rarityStats[key]}/{REWARDS.filter((r) => r.rarity === key).length} {cfg.label}
              </div>
            ))}
          </div>

          {/* === MAIN AREA === */}

          {/* IDLE phase */}
          {phase === "idle" && (
            <div style={{ animation: "fadeIn 0.4s ease-out" }}>
              <GiftBox phase="idle" rarity={null} />
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <button
                  onClick={handlePull}
                  disabled={pulls <= 0}
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#fff",
                    background: pulls <= 0
                      ? "rgba(255,255,255,0.1)"
                      : "linear-gradient(135deg, #e11d48, #be123c, #9f1239)",
                    border: pulls <= 0 ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f43f5e",
                    borderRadius: 50,
                    cursor: pulls <= 0 ? "not-allowed" : "pointer",
                    letterSpacing: "0.04em",
                    boxShadow: pulls <= 0 ? "none" : "0 0 25px rgba(225,29,72,0.4), 0 4px 15px rgba(0,0,0,0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (pulls > 0) e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Open Gift ({pulls} left)
                </button>
                {pulls <= 0 && (
                  <div style={{ marginTop: 16, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                    All out of gifts! Check your collection below
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OPENING phase */}
          {phase === "opening" && currentReward && (
            <div style={{ position: "relative" }}>
              <GiftBox phase="opening" rarity={currentReward.rarity} />
              <Particles rarity={currentReward.rarity} mode="swirl" />
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
                Something's inside...
              </div>
            </div>
          )}

          {/* BURST phase */}
          {phase === "burst" && currentReward && (
            <div style={{ position: "relative" }}>
              <LightBeam rarity={currentReward.rarity} active={true} />
              <GiftBox phase="burst" rarity={currentReward.rarity} />
              <Particles rarity={currentReward.rarity} mode="burst" />
            </div>
          )}

          {/* REVEAL phase */}
          {phase === "reveal" && currentReward && (
            <div style={{ animation: "fadeIn 0.3s ease-out" }}>
              <RewardCard reward={currentReward} isNew={isNewReward} />
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <button
                  onClick={handleContinue}
                  style={{
                    padding: "14px 44px",
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#fff",
                    background: pulls > 0
                      ? "linear-gradient(135deg, #e11d48, #be123c)"
                      : "rgba(255,255,255,0.08)",
                    border: pulls > 0 ? "2px solid #f43f5e" : "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: 50,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "0.03em",
                    boxShadow: pulls > 0 ? "0 0 20px rgba(225,29,72,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {pulls > 0 ? "Open Another!" : "View Collection"}
                </button>
              </div>
            </div>
          )}

          {/* Collection toggle */}
          <div style={{ marginTop: 36 }}>
            <button
              onClick={() => setShowCollection((s) => !s)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.55)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              {showCollection ? "Hide Collection" : "View Collection"}
            </button>
            {showCollection && <CollectionGrid collection={collection} />}
          </div>

          {/* Recent pulls */}
          {history.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  textAlign: "center",
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Recent Pulls
              </div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                {history.slice(0, 10).map((r, i) => (
                  <div
                    key={i}
                    title={r.name}
                    style={{
                      fontSize: 22,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      background: `${RARITY_CONFIG[r.rarity].bg}80`,
                      border: `1px solid ${RARITY_CONFIG[r.rarity].color}30`,
                    }}
                  >
                    {r.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
