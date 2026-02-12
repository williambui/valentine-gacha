import { RARITY_CONFIG } from "../data/rewards";
import Particles from "./Particles";
import StarRating from "./StarRating";

export default function RewardCard({ reward, isNew }) {
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
