import { useState, useEffect, useRef } from "react";

const REWARDS = [
  // Common (50% chance)
  { id: 1, name: "Forehead Kiss", rarity: "common", emoji: "😘", category: "Affection", description: "Redeemable anytime, anywhere" },
  { id: 2, name: "Movie Night Pick", rarity: "common", emoji: "🎬", category: "Date", description: "You choose the movie, no complaints" },
  { id: 3, name: "Breakfast in Bed", rarity: "common", emoji: "🥞", category: "Food", description: "Chef William at your service" },
  { id: 4, name: "10 Min Massage", rarity: "common", emoji: "💆", category: "Affection", description: "Guaranteed no stopping early" },
  { id: 5, name: "Love Letter", rarity: "common", emoji: "💌", category: "Affection", description: "Handwritten with extra cheesiness" },
  { id: 6, name: "Bao Cuddle Session", rarity: "common", emoji: "🐶", category: "Affection", description: "Mandatory group hug with Bao" },
  { id: 7, name: "Dessert Run", rarity: "common", emoji: "🍰", category: "Food", description: "Any dessert, any time, no questions" },
  { id: 8, name: "Playlist Dedication", rarity: "common", emoji: "🎵", category: "Affection", description: "A custom playlist just for you" },

  // Rare (30% chance)
  { id: 9, name: "Homemade Steak Dinner", rarity: "rare", emoji: "🥩", category: "Food", description: "Reverse sear, your preferred doneness" },
  { id: 10, name: "Spa Night", rarity: "rare", emoji: "🧖", category: "Date", description: "Face masks, candles, the whole vibe" },
  { id: 11, name: "Shopping Spree", rarity: "rare", emoji: "🛍️", category: "Gift", description: "A surprise shopping trip on me" },
  { id: 12, name: "Picnic Date", rarity: "rare", emoji: "🧺", category: "Date", description: "A curated picnic at a scenic spot" },
  { id: 13, name: "30 Min Massage", rarity: "rare", emoji: "✨", category: "Affection", description: "The deluxe edition, with oils" },
  { id: 14, name: "Cook Together Night", rarity: "rare", emoji: "👩‍🍳", category: "Food", description: "We pick a new recipe and tackle it together" },

  // Epic (15% chance)
  { id: 15, name: "Fancy Dinner Out", rarity: "epic", emoji: "🍷", category: "Date", description: "A proper restaurant, dress up, the works" },
  { id: 16, name: "Day Trip Adventure", rarity: "epic", emoji: "🗺️", category: "Date", description: "A surprise day trip to somewhere new" },
  { id: 17, name: "Full Day of Pampering", rarity: "epic", emoji: "👑", category: "Affection", description: "An entire day dedicated to spoiling you" },
  { id: 18, name: "Custom Gift", rarity: "epic", emoji: "🎁", category: "Gift", description: "Something special I know you've been wanting" },

  // Legendary (5% chance)
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

function Particles({ rarity, active }) {
  if (!active) return null;
  const config = RARITY_CONFIG[rarity];
  const count = rarity === "legendary" ? 40 : rarity === "epic" ? 28 : rarity === "rare" ? 18 : 10;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const distance = 80 + Math.random() * 160;
        const size = 3 + Math.random() * 6;
        const duration = 0.6 + Math.random() * 0.8;
        const delay = Math.random() * 0.3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
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

function RewardCard({ reward, isRevealing, isNew }) {
  const config = RARITY_CONFIG[reward.rarity];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        animation: isRevealing ? "cardReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : undefined,
        opacity: isRevealing ? 0 : 1,
      }}
    >
      <Particles rarity={reward.rarity} active={isRevealing} />
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
          animation: isRevealing && (reward.rarity === "legendary" || reward.rarity === "epic")
            ? `shimmer 2s ease-in-out infinite`
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
          ★ {config.label} ★
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1,
            marginBottom: 16,
            filter: `drop-shadow(0 0 12px ${config.glow})`,
            animation: isRevealing ? "emojiPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both" : undefined,
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

function SlotReel({ spinning, finalEmoji, onStop }) {
  const reelRef = useRef(null);
  const [displayEmojis, setDisplayEmojis] = useState(["💝", "💖", "💗", "❤️", "💕"]);

  useEffect(() => {
    if (!spinning) return;
    const allEmojis = REWARDS.map((r) => r.emoji);
    let frame;
    let count = 0;
    const maxFrames = 20 + Math.floor(Math.random() * 10);
    const baseSpeed = 60;

    function tick() {
      count++;
      const shuffled = [...allEmojis].sort(() => Math.random() - 0.5).slice(0, 5);
      if (count >= maxFrames) {
        setDisplayEmojis([shuffled[0], shuffled[1], finalEmoji, shuffled[2], shuffled[3]]);
        if (onStop) onStop();
        return;
      }
      setDisplayEmojis(shuffled);
      const delay = baseSpeed + (count / maxFrames) * 200;
      frame = setTimeout(tick, delay);
    }
    tick();
    return () => clearTimeout(frame);
  }, [spinning, finalEmoji]);

  return (
    <div
      ref={reelRef}
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        height: 72,
        background: "rgba(0,0,0,0.4)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "0 12px",
        overflow: "hidden",
      }}
    >
      {displayEmojis.map((e, i) => (
        <div
          key={i}
          style={{
            fontSize: i === 2 ? 40 : 28,
            opacity: i === 2 ? 1 : 0.4,
            transition: spinning ? "none" : "all 0.3s",
            transform: i === 2 && !spinning ? "scale(1.1)" : "scale(1)",
          }}
        >
          {e}
        </div>
      ))}
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
                cursor: owned ? "default" : "default",
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

function PullButton({ onClick, disabled, pulls }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 280,
        margin: "0 auto",
        display: "block",
        padding: "16px 32px",
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
        background: disabled
          ? "rgba(255,255,255,0.1)"
          : "linear-gradient(135deg, #e11d48, #be123c, #9f1239)",
        border: disabled ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f43f5e",
        borderRadius: 16,
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        boxShadow: disabled ? "none" : "0 0 30px rgba(225,29,72,0.4), 0 4px 15px rgba(0,0,0,0.3)",
        transition: "all 0.2s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {disabled ? "Opening..." : `💝 Pull! (${pulls} left)`}
    </button>
  );
}

export default function ValentineGacha() {
  const [pulls, setPulls] = useState(10);
  const [collection, setCollection] = useState([]);
  const [currentReward, setCurrentReward] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle, spinning, revealing
  const [isNewReward, setIsNewReward] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [history, setHistory] = useState([]);

  function handlePull() {
    if (pulls <= 0 || phase !== "idle") return;
    const reward = getRandomReward();
    setCurrentReward(reward);
    setPhase("spinning");
    setPulls((p) => p - 1);
  }

  function handleReelStop() {
    setTimeout(() => {
      setPhase("revealing");
      const alreadyOwned = collection.find((c) => c.id === currentReward.id);
      setIsNewReward(!alreadyOwned);
      setCollection((prev) => {
        const existing = prev.find((c) => c.id === currentReward.id);
        if (existing) {
          return prev.map((c) => (c.id === currentReward.id ? { ...c, count: c.count + 1 } : c));
        }
        return [...prev, { ...currentReward, count: 1 }];
      });
      setHistory((prev) => [currentReward, ...prev]);
    }, 400);
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

        @keyframes cardReveal {
          0% { opacity: 0; transform: scale(0.3) rotateY(180deg); }
          50% { opacity: 1; transform: scale(1.08) rotateY(0deg); }
          100% { opacity: 1; transform: scale(1) rotateY(0deg); }
        }

        @keyframes particleBurst {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)); }
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

        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.25; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
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
            {["💕", "💗", "💖", "❤️", "💝", "🩷", "💘", "♥️"][i]}
          </div>
        ))}

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
              Pull for rewards, collect them all ♥
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

          {/* Main area */}
          {phase === "idle" && !currentReward && (
            <div style={{ animation: "fadeIn 0.4s ease-out" }}>
              <div style={{ marginBottom: 28 }}>
                <SlotReel spinning={false} finalEmoji="💝" />
              </div>
              <PullButton onClick={handlePull} disabled={pulls <= 0} pulls={pulls} />
              {pulls <= 0 && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14,
                  }}
                >
                  All out of pulls! Check your collection below 💝
                </div>
              )}
            </div>
          )}

          {phase === "spinning" && (
            <div style={{ animation: "fadeIn 0.2s ease-out" }}>
              <div style={{ marginBottom: 28 }}>
                <SlotReel spinning={true} finalEmoji={currentReward.emoji} onStop={handleReelStop} />
              </div>
              <div style={{ textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
                Pulling...
              </div>
            </div>
          )}

          {phase === "revealing" && currentReward && (
            <div style={{ animation: "fadeIn 0.3s ease-out" }}>
              <RewardCard reward={currentReward} isRevealing={true} isNew={isNewReward} />
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <button
                  onClick={handleContinue}
                  style={{
                    padding: "12px 40px",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.8)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "0.03em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                >
                  {pulls > 0 ? "Pull Again" : "View Collection"}
                </button>
              </div>
            </div>
          )}

          {/* Toggle Collection */}
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
              {showCollection ? "Hide Collection ▲" : "View Collection ▼"}
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
