import { RARITY_CONFIG } from "../data/rewards";

export default function GiftBox({ phase, rarity }) {
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
