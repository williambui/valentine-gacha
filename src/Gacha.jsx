import { useState, useRef, useCallback, useEffect } from "react";
import { REWARDS, RARITY_CONFIG, RARITY_STARS, BG_STARS, getRandomReward } from "./data/rewards";
import { ANIMATION_STYLES } from "./styles/animations";
import GiftBox from "./components/GiftBox";
import Particles from "./components/Particles";
import LightBeam from "./components/LightBeam";
import ScreenFlash from "./components/ScreenFlash";
import RewardCard from "./components/RewardCard";
import CollectionGrid from "./components/CollectionGrid";

const RARITY_TIERS = ["common", "rare", "epic", "legendary"];

export default function ValentineGacha() {
  const [pulls, setPulls] = useState(() => {
    const saved = localStorage.getItem("gacha_pulls");
    return saved !== null ? JSON.parse(saved) : 10;
  });
  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("gacha_collection");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentReward, setCurrentReward] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [displayRarity, setDisplayRarity] = useState(null);
  const [isNewReward, setIsNewReward] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [collectionClosing, setCollectionClosing] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [cardClosing, setCardClosing] = useState(false);
  const [openedDirectToCard, setOpenedDirectToCard] = useState(false);
  const closingRewardRef = useRef(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("gacha_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordClosing, setPasswordClosing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoClosing, setInfoClosing] = useState(false);

  useEffect(() => { localStorage.setItem("gacha_pulls", JSON.stringify(pulls)); }, [pulls]);
  useEffect(() => { localStorage.setItem("gacha_collection", JSON.stringify(collection)); }, [collection]);
  useEffect(() => { localStorage.setItem("gacha_history", JSON.stringify(history)); }, [history]);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const tierTimers = useRef([]);

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function handlePull() {
    if (pulls <= 0 || phase !== "idle") return;
    const reward = getRandomReward();
    const cfg = RARITY_CONFIG[reward.rarity];
    const finalTierIdx = RARITY_TIERS.indexOf(reward.rarity);
    const tiers = RARITY_TIERS.slice(0, finalTierIdx + 1);
    const timePerTier = cfg.openingMs / tiers.length;

    setCurrentReward(reward);
    setDisplayRarity("common");
    setPhase("opening");
    setPulls((p) => p - 1);
    vibrate(30);

    // Clear any previous timers
    tierTimers.current.forEach(clearTimeout);
    tierTimers.current = [];

    // Schedule rarity tier transitions (skip first — already set to common)
    tiers.forEach((tier, i) => {
      if (i === 0) return;
      const id = setTimeout(() => { setDisplayRarity(tier); vibrate(20 + i * 15); }, timePerTier * i);
      tierTimers.current.push(id);
    });

    const burstId = setTimeout(() => {
      setPhase("burst");
      // Burst always uses final rarity
      setDisplayRarity(reward.rarity);
      vibrate([40, 30, 60]);
      const revealId = setTimeout(() => {
        const isNew = !collection.find((c) => c.id === reward.id);
        setIsNewReward(isNew);
        setCollection((prev) => {
          const existing = prev.find((c) => c.id === reward.id);
          if (existing) return prev.map((c) => (c.id === reward.id ? { ...c, count: c.count + 1 } : c));
          return [...prev, { ...reward, count: 1 }];
        });
        setHistory((prev) => [reward, ...prev]);
        setPhase("reveal");
        vibrate(reward.rarity === "legendary" ? [50, 30, 50, 30, 80] : reward.rarity === "epic" ? [40, 20, 60] : 50);
      }, cfg.burstMs);
      tierTimers.current.push(revealId);
    }, cfg.openingMs);
    tierTimers.current.push(burstId);
  }

  const closeCollection = useCallback(() => {
    if (collectionClosing || cardClosing) return;
    if (selectedReward) {
      if (openedDirectToCard) {
        // From history icon → close overlay entirely
        setCollectionClosing(true);
        setTimeout(() => {
          setShowCollection(false);
          setCollectionClosing(false);
          setSelectedReward(null);
          setOpenedDirectToCard(false);
        }, 280);
      } else {
        // From collection grid → animate card out, then return to grid
        closingRewardRef.current = selectedReward;
        setSelectedReward(null);
        setCardClosing(true);
        setTimeout(() => {
          setCardClosing(false);
          closingRewardRef.current = null;
        }, 250);
      }
      return;
    }
    setCollectionClosing(true);
    setTimeout(() => {
      setShowCollection(false);
      setCollectionClosing(false);
    }, 280);
  }, [collectionClosing, cardClosing, selectedReward, openedDirectToCard]);

  function handleContinue() {
    setPhase("idle");
    setCurrentReward(null);
    setDisplayRarity(null);
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
        height: "100dvh",
        background: "linear-gradient(160deg, #080613 0%, #12082a 25%, #0d0620 50%, #0a0418 75%, #080613 100%)",
        color: "#fff",
        fontFamily: "'Quicksand', sans-serif",
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

        <ScreenFlash rarity={displayRarity || currentReward?.rarity} active={phase === "burst"} />

        <div style={{
          position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto",
          padding: "max(env(safe-area-inset-top), 16px) 16px max(env(safe-area-inset-bottom), 12px)",
          height: "100%", display: "flex", flexDirection: "column",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 10, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6,
            }}>
              <span style={{ color: "#ffd54f", fontSize: 9, letterSpacing: "0.3em", opacity: 0.5 }}>✦ ━━━</span>
              <span style={{
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "#ff6b9d", fontWeight: 800,
              }}>
                Happy Valentine's Day
              </span>
              <span style={{ color: "#ffd54f", fontSize: 9, letterSpacing: "0.3em", opacity: 0.5 }}>━━━ ✦</span>
            </div>
            <h1 style={{
              fontSize: 32, fontWeight: 900, fontFamily: "'Comfortaa', sans-serif",
              background: "linear-gradient(135deg, #ffb3d0, #ff6b9d, #ff4d8d, #ff6b9d)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.2, marginBottom: 4, letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 20px rgba(255,107,157,0.3))",
            }}>
              Love Gacha
            </h1>
          </div>

          {/* Rarity guide with stars */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, flexShrink: 0, gap: 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-evenly", flex: 1, fontSize: 10, fontWeight: 700 }}>
              {Object.entries(RARITY_CONFIG).map(([key, cfg]) => (
                <div key={key} style={{ color: cfg.color, opacity: 0.6, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: 7, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cfg.label}</span>
                  <span style={{ fontSize: 8, letterSpacing: 1 }}>
                    {Array.from({ length: RARITY_STARS[key] }).map((_, i) => <span key={i}>★</span>)}
                  </span>
                  <span style={{ fontSize: 9 }}>{rarityStats[key]}/{REWARDS.filter((r) => r.rarity === key).length}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowInfo(true)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.25)", fontSize: 13,
                transition: "color 0.2s ease",
                padding: "0 2px", flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
            >
              ⓘ
            </button>
          </div>

          {/* Main glass panel */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            padding: "16px 16px 14px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 10,
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {/* Refresh button — top right of panel */}
            <button
              onClick={() => { setShowPasswordPrompt(true); setPasswordInput(""); setPasswordError(false); }}
              style={{
                position: "absolute", top: 10, right: 10,
                width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.25)", fontSize: 16,
                transition: "color 0.2s ease",
                zIndex: 10,
                padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
            >
              ↻
            </button>

            {/* Corner accents */}
            {[{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }].map((pos, i) => (
              <div key={i} style={{
                position: "absolute", ...pos,
                width: 6, height: 6, borderRadius: 1,
                background: "rgba(255,213,79,0.2)",
                transform: "rotate(45deg)", pointerEvents: "none",
              }} />
            ))}

            {/* GiftBox phases (idle/opening/burst) — fixed layout so box never moves */}
            {phase !== "reveal" && (
              <div style={{ position: "relative" }}>
                {phase === "burst" && <LightBeam rarity={displayRarity} active={true} />}
                <GiftBox phase={phase} rarity={phase !== "idle" ? displayRarity : null} finalRarity={currentReward?.rarity} />
                {phase === "opening" && <Particles rarity={displayRarity} mode="swirl" />}
                {phase === "burst" && <Particles rarity={displayRarity} mode="burst" />}

                {/* Fixed-height controls zone — same height regardless of phase */}
                <div style={{ height: 80, textAlign: "center", marginTop: 14 }}>
                  {phase === "idle" && (
                    <div style={{ animation: "fadeIn 0.4s ease-out" }}>
                      <div style={{ position: "relative", display: "inline-block" }}>
                        {/* Smooth glow layer behind button — animates opacity only (GPU) */}
                        {pulls > 0 && (
                          <div style={{
                            position: "absolute", inset: -20,
                            borderRadius: 70,
                            background: "radial-gradient(ellipse at center, rgba(255,107,157,0.5) 0%, rgba(255,107,157,0.3) 40%, transparent 70%)",
                            filter: "blur(8px)",
                            animation: "buttonGlowPulse 3s ease-in-out infinite",
                            pointerEvents: "none",
                            willChange: "opacity",
                          }} />
                        )}
                        <button
                          onClick={handlePull}
                          disabled={pulls <= 0}
                          style={{
                            position: "relative",
                            padding: "14px 44px", fontSize: 15, fontWeight: 800,
                            fontFamily: "'Quicksand', sans-serif", color: "#fff",
                            background: pulls <= 0
                              ? "rgba(255,255,255,0.06)"
                              : "linear-gradient(135deg, #ff6b9d, #ff4d8d, #e8356d)",
                            border: pulls <= 0
                              ? "2px solid rgba(255,255,255,0.06)"
                              : "2px solid rgba(255,107,157,0.5)",
                            borderRadius: 50,
                            cursor: pulls <= 0 ? "not-allowed" : "pointer",
                            letterSpacing: "0.06em",
                            boxShadow: pulls > 0
                              ? "0 0 20px rgba(255,107,157,0.3), 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                              : "none",
                            transition: "transform 0.15s ease-out",
                          }}
                          onMouseEnter={(e) => { if (pulls > 0) e.currentTarget.style.transform = "scale(1.06)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          ✦ Make a Wish ✦
                        </button>
                      </div>
                      <div style={{
                        marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.35)",
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
                  )}
                  {phase === "opening" && (
                    <div style={{
                      fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.1em",
                      paddingTop: 2,
                      animation: "wishingPulse 1.5s ease-in-out infinite",
                    }}>
                      ✦ Wishing... ✦
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REVEAL */}
            {phase === "reveal" && currentReward && (
              <div style={{ animation: "fadeIn 0.3s ease-out" }}>
                <RewardCard reward={currentReward} isNew={isNewReward} />
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <button
                    onClick={handleContinue}
                    style={{
                      padding: "12px 36px", fontSize: 14, fontWeight: 800,
                      fontFamily: "'Quicksand', sans-serif", color: "#fff",
                      background: pulls > 0
                        ? "linear-gradient(135deg, #ff6b9d, #ff4d8d)"
                        : "rgba(255,255,255,0.05)",
                      border: pulls > 0
                        ? "2px solid rgba(255,107,157,0.4)"
                        : "1.5px solid rgba(255,255,255,0.08)",
                      borderRadius: 50, cursor: "pointer",
                      transition: "transform 0.15s ease-out", letterSpacing: "0.04em",
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

          {/* Bottom section */}
          <div style={{ flexShrink: 0 }}>
            {/* Recent wishes */}
            {history.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap" }}>
                  {history.slice(0, 10).map((r, i) => {
                    const cfg = RARITY_CONFIG[r.rarity];
                    return (
                      <div key={i} title={r.name} onClick={() => {
                        setSelectedReward(r);
                        setOpenedDirectToCard(true);
                        setShowCollection(true);
                      }} style={{
                        fontSize: 18, width: 34, height: 34,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 9,
                        background: `${cfg.bg}60`,
                        border: `1px solid ${cfg.color}20`,
                        boxShadow: `0 0 8px ${cfg.glow}`,
                        backdropFilter: "blur(8px)",
                        cursor: "pointer",
                        transition: "transform 0.15s ease-out",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.12)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        {r.emoji}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Collection panel */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: 16, overflow: "hidden",
            }}>
              <button
                onClick={() => showCollection ? closeCollection() : setShowCollection(true)}
                style={{
                  width: "100%", padding: "10px", fontSize: 12, fontWeight: 700,
                  fontFamily: "'Quicksand', sans-serif", color: "rgba(255,255,255,0.45)",
                  background: "transparent", border: "none", cursor: "pointer",
                  letterSpacing: "0.08em",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "color 0.2s ease",
                }}
              >
                <span style={{ fontSize: 9, color: "#ffd54f", opacity: 0.4 }}>✦</span>
                {showCollection ? "Hide Collection" : "View Collection"}
                <span style={{ fontSize: 9, color: "#ffd54f", opacity: 0.4 }}>✦</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collection overlay — animated */}
      {showCollection && (
        <div
          onClick={closeCollection}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px 20px",
            animation: collectionClosing
              ? "overlayFadeOut 0.3s ease-in forwards"
              : "overlayFadeIn 0.3s ease-out forwards",
          }}
        >
          {openedDirectToCard && selectedReward ? (
            /* Direct card view (from history icon) — no grid behind */
            <div
              key={selectedReward.id}
              style={{
                width: "100%", maxWidth: 380,
                cursor: "pointer",
                animation: collectionClosing
                  ? "overlayContentSlideDown 0.25s ease-in forwards"
                  : "overlayContentSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            >
              <RewardCard reward={selectedReward} isNew={false} />
              <div style={{
                marginTop: 14, textAlign: "center",
                fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.08em",
              }}>
                tap to dismiss
              </div>
            </div>
          ) : (
            /* Collection grid — stays visible, card overlays on top */
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: 380, maxHeight: "80dvh",
                position: "relative",
                background: "linear-gradient(160deg, #12082a, #0d0620)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "16px",
                overflowX: "hidden",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                animation: collectionClosing
                  ? "overlayContentSlideDown 0.28s ease-in forwards"
                  : "overlayContentSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            >
              <CollectionGrid collection={collection} onSelect={setSelectedReward} />

              {/* Card overlay on top of grid */}
              {(selectedReward || cardClosing) && (() => {
                const displayReward = selectedReward || closingRewardRef.current;
                if (!displayReward) return null;
                return (
                  <div
                    key={displayReward.id}
                    onClick={closeCollection}
                    style={{
                      position: "absolute", inset: 0, zIndex: 10,
                      background: "rgba(8,6,19,0.92)",
                      borderRadius: 20,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      padding: "16px",
                      cursor: "pointer",
                      animation: cardClosing
                        ? "overlayFadeOut 0.25s ease-in forwards"
                        : "overlayFadeIn 0.25s ease-out forwards",
                    }}
                  >
                    <div style={{
                      width: "100%",
                      animation: cardClosing
                        ? "overlayContentSlideDown 0.25s ease-in forwards"
                        : "overlayContentSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    }}>
                      <RewardCard reward={displayReward} isNew={false} />
                      <div style={{
                        marginTop: 14, textAlign: "center",
                        fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.08em",
                      }}>
                        tap to dismiss
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Password prompt overlay */}
      {showPasswordPrompt && (
        <div
          onClick={() => {
            if (passwordClosing) return;
            setPasswordClosing(true);
            setTimeout(() => { setShowPasswordPrompt(false); setPasswordClosing(false); }, 250);
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
            animation: passwordClosing
              ? "overlayFadeOut 0.25s ease-in forwards"
              : "overlayFadeIn 0.2s ease-out forwards",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(160deg, #12082a, #0d0620)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, padding: "24px",
              width: "100%", maxWidth: 300,
              textAlign: "center",
              animation: passwordClosing
                ? "overlayContentSlideDown 0.25s ease-in forwards"
                : "overlayContentSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            <div style={{
              fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.7)",
              fontFamily: "'Comfortaa', sans-serif", letterSpacing: "0.08em", marginBottom: 16,
            }}>
              💎 Refill Wishes
            </div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (passwordInput === "reset") {
                    localStorage.clear();
                    setPulls(10);
                    setCollection([]);
                    setHistory([]);
                    setPasswordClosing(true);
                    setTimeout(() => { setShowPasswordPrompt(false); setPasswordClosing(false); }, 250);
                  } else if (passwordInput === "ilovebao") {
                    setPulls(10);
                    setPasswordClosing(true);
                    setTimeout(() => { setShowPasswordPrompt(false); setPasswordClosing(false); }, 250);
                  } else {
                    setPasswordError(true);
                  }
                }
              }}
              placeholder="Enter password..."
              autoFocus
              style={{
                width: "100%", padding: "10px 14px",
                fontSize: 14, fontFamily: "'Quicksand', sans-serif",
                color: "#fff",
                background: "rgba(255,255,255,0.06)",
                border: passwordError
                  ? "1.5px solid rgba(255,80,80,0.5)"
                  : "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                outline: "none",
                textAlign: "center",
                letterSpacing: "0.1em",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
            />
            {passwordError && (
              <div style={{
                marginTop: 8, fontSize: 11, color: "rgba(255,80,80,0.7)",
                fontWeight: 600, letterSpacing: "0.05em",
              }}>
                Wrong password ✦
              </div>
            )}
            <button
              onClick={() => {
                if (passwordInput === "ilovebao") {
                  setPulls(10);
                  setPasswordClosing(true);
                  setTimeout(() => { setShowPasswordPrompt(false); setPasswordClosing(false); }, 250);
                } else {
                  setPasswordError(true);
                }
              }}
              style={{
                marginTop: 14, padding: "10px 28px",
                fontSize: 13, fontWeight: 800,
                fontFamily: "'Quicksand', sans-serif", color: "#fff",
                background: "linear-gradient(135deg, #c084fc, #818cf8)",
                border: "1.5px solid rgba(139,92,246,0.4)",
                borderRadius: 50, cursor: "pointer",
                letterSpacing: "0.06em",
                transition: "transform 0.15s ease-out",
                boxShadow: "0 0 15px rgba(139,92,246,0.3)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Info modal — rarity rates */}
      {showInfo && (
        <div
          onClick={() => {
            if (infoClosing) return;
            setInfoClosing(true);
            setTimeout(() => { setShowInfo(false); setInfoClosing(false); }, 250);
          }}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
            animation: infoClosing
              ? "overlayFadeOut 0.25s ease-in forwards"
              : "overlayFadeIn 0.2s ease-out forwards",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(160deg, #12082a, #0d0620)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20, padding: "24px",
              width: "100%", maxWidth: 300,
              textAlign: "center",
              animation: infoClosing
                ? "overlayContentSlideDown 0.25s ease-in forwards"
                : "overlayContentSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            <div style={{
              fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.7)",
              fontFamily: "'Comfortaa', sans-serif", letterSpacing: "0.08em", marginBottom: 18,
            }}>
              Drop Rates
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(RARITY_CONFIG).map(([key, cfg]) => (
                <div key={key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 14px",
                  background: `${cfg.bg}60`,
                  border: `1px solid ${cfg.color}20`,
                  borderRadius: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 8, letterSpacing: 1, color: cfg.color }}>
                      {Array.from({ length: RARITY_STARS[key] }).map((_, i) => <span key={i}>★</span>)}
                    </span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: cfg.color,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      fontFamily: "'Quicksand', sans-serif",
                    }}>
                      {cfg.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 800, color: cfg.color,
                    fontFamily: "'Quicksand', sans-serif",
                  }}>
                    {cfg.chance}%
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.3)",
              fontWeight: 600, fontFamily: "'Quicksand', sans-serif",
              letterSpacing: "0.05em",
            }}>
              Total wishes made: {history.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
