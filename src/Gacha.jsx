import { useState } from "react";
import { REWARDS, RARITY_CONFIG, RARITY_STARS, BG_STARS, getRandomReward } from "./data/rewards";
import { ANIMATION_STYLES } from "./styles/animations";
import GiftBox from "./components/GiftBox";
import Particles from "./components/Particles";
import LightBeam from "./components/LightBeam";
import ScreenFlash from "./components/ScreenFlash";
import RewardCard from "./components/RewardCard";
import CollectionGrid from "./components/CollectionGrid";

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
      <style>{ANIMATION_STYLES}</style>

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

          {/* Main glass panel */}
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
