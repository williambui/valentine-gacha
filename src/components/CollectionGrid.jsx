import { REWARDS, RARITY_CONFIG, RARITY_STARS } from "../data/rewards";

export default function CollectionGrid({ collection, onSelect }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.8)",
        fontFamily: "'Comfortaa', sans-serif", marginBottom: 14,
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
            <div
              key={reward.id}
              onClick={() => { if (owned) onSelect(reward); }}
              style={{
                aspectRatio: "1",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                fontSize: 26, borderRadius: 14,
                cursor: owned ? "pointer" : "default",
                background: owned
                  ? `linear-gradient(145deg, ${config.bg}cc, rgba(10,10,20,0.8))`
                  : "rgba(255,255,255,0.06)",
                border: owned
                  ? `1.5px solid ${config.color}50`
                  : "1.5px solid rgba(255,255,255,0.1)",
                opacity: owned ? 1 : 0.45,
                transition: "all 0.3s",
                position: "relative",
                backdropFilter: owned ? "blur(10px)" : undefined,
                boxShadow: owned ? `0 0 12px ${config.glow}` : "none",
              }}
            >
              {owned ? reward.emoji : <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 22, fontWeight: 800 }}>?</span>}
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
