import { RARITY_CONFIG } from "../data/rewards";
import Particles from "./Particles";
import StarRating from "./StarRating";

const CARD_REVEAL_ANIM = {
  common: "cardReveal 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  rare: "cardReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  epic: "cardRevealEpic 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
  legendary: "cardRevealLegendary 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
};

const EMOJI_ANIM = {
  common: "emojiPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
  rare: "emojiPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both",
  epic: "emojiPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
  legendary: "emojiPopLegendary 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both",
};

export default function RewardCard({ reward, isNew }) {
  const config = RARITY_CONFIG[reward.rarity];
  const isHighRarity = reward.rarity === "legendary" || reward.rarity === "epic";
  const isLegendary = reward.rarity === "legendary";

  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 320, margin: "0 auto",
      animation: CARD_REVEAL_ANIM[reward.rarity],
      opacity: 0,
      willChange: "transform, opacity",
    }}>
      {/* Pulsing glow behind card — rarity-scaled */}
      <div style={{
        position: "absolute",
        inset: isLegendary ? -30 : isHighRarity ? -24 : reward.rarity === "rare" ? -18 : -12,
        borderRadius: 40,
        background: `radial-gradient(ellipse at center, ${config.color}60 0%, ${config.color}25 40%, transparent 70%)`,
        filter: `blur(${isLegendary ? 18 : isHighRarity ? 14 : 10}px)`,
        animation: `cardGlowFadeIn 0.6s ease-out forwards, cardGlowPulse ${isLegendary ? 2 : 3}s ease-in-out 0.6s infinite`,
        pointerEvents: "none",
        willChange: "opacity",
        zIndex: 0,
      }} />

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
        padding: "20px 20px 18px",
        textAlign: "center",
        boxShadow: `0 0 30px ${config.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
        backdropFilter: "blur(20px)",
        animation: isLegendary ? "legendaryRainbowBorder 4s linear infinite" : undefined,
      }}>
        {isNew && (
          <div style={{
            position: "absolute", top: -12, right: -8,
            background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
            color: "white", fontSize: 11, fontWeight: 800,
            padding: "4px 14px", borderRadius: 20,
            fontFamily: "'Quicksand', sans-serif", letterSpacing: "0.08em",
            animation: "pulse 1.5s ease-in-out infinite",
            boxShadow: "0 2px 12px rgba(238,90,36,0.4)",
          }}>
            NEW!
          </div>
        )}

        <StarRating rarity={reward.rarity} animated={true} />

        <div style={{
          fontSize: 46, lineHeight: 1, marginTop: 8, marginBottom: 8,
          filter: `drop-shadow(0 0 ${isHighRarity ? 24 : 16}px ${config.glow})`,
          animation: EMOJI_ANIM[reward.rarity],
        }}>
          {reward.emoji}
        </div>

        <div style={{
          fontSize: 12, fontWeight: 700, color: config.color,
          textTransform: "uppercase", letterSpacing: "0.2em",
          fontFamily: "'Quicksand', sans-serif", marginBottom: 6, opacity: 0.9,
        }}>
          {config.label}
        </div>

        <div style={{
          fontSize: 20, fontWeight: 900, color: "#fff",
          fontFamily: "'Comfortaa', sans-serif", marginBottom: 4, letterSpacing: "0.03em",
        }}>
          {reward.name}
        </div>

        <div style={{
          fontSize: 12, color: "rgba(255,255,255,0.45)",
          fontFamily: "'Quicksand', sans-serif", marginBottom: 6,
          textTransform: "uppercase", letterSpacing: "0.12em",
        }}>
          {reward.category}
        </div>

        <div style={{
          fontSize: 14, color: "rgba(255,255,255,0.7)",
          fontFamily: "'Quicksand', sans-serif", fontStyle: "italic", lineHeight: 1.5,
        }}>
          "{reward.description}"
        </div>
      </div>
    </div>
  );
}
