export const ANIMATION_STYLES = `
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
`;
