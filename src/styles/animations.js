export const ANIMATION_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { height: 100%; overflow: hidden; }

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

/* GPU-accelerated: use transform/opacity only, add will-change */

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
  0%, 100% { transform: translateY(0) translateZ(0); }
  50% { transform: translateY(-10px) translateZ(0); }
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

@keyframes cardGlowPulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.8; }
}

@keyframes cardGlowFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes buttonGlowPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Rarity-scaled shake: common (barely moves), rare, epic, legendary (violent) */
@keyframes boxShakeCommon {
  0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
  15% { transform: translate3d(-1px, 0, 0) rotate(-0.2deg); }
  30% { transform: translate3d(1px, 0, 0) rotate(0.2deg); }
  50% { transform: translate3d(0, -1px, 0) rotate(0deg); }
  65% { transform: translate3d(-1px, 0, 0) rotate(-0.2deg); }
  80% { transform: translate3d(1px, 0, 0) rotate(0.2deg); }
}

@keyframes boxShakeRare {
  0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
  10% { transform: translate3d(-3px, 0, 0) rotate(-0.5deg); }
  20% { transform: translate3d(3px, -1px, 0) rotate(0.6deg); }
  30% { transform: translate3d(-2px, 1px, 0) rotate(-0.4deg); }
  40% { transform: translate3d(4px, 0, 0) rotate(0.7deg); }
  50% { transform: translate3d(0, 0, 0) rotate(0deg); }
  60% { transform: translate3d(-4px, 1px, 0) rotate(-0.8deg); }
  70% { transform: translate3d(3px, -1px, 0) rotate(0.6deg); }
  80% { transform: translate3d(-3px, 0, 0) rotate(-0.5deg); }
  90% { transform: translate3d(4px, 1px, 0) rotate(0.7deg); }
}

@keyframes boxShakeEpic {
  0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
  5% { transform: translate3d(-5px, 1px, 0) rotate(-1.2deg); }
  10% { transform: translate3d(6px, -1px, 0) rotate(1.4deg); }
  15% { transform: translate3d(-4px, -2px, 0) rotate(-1deg); }
  20% { transform: translate3d(7px, 1px, 0) rotate(1.5deg); }
  25% { transform: translate3d(-6px, 0, 0) rotate(-1.3deg); }
  30% { transform: translate3d(5px, 2px, 0) rotate(1.1deg); }
  35% { transform: translate3d(-7px, -1px, 0) rotate(-1.6deg); }
  40% { transform: translate3d(6px, 1px, 0) rotate(1.3deg); }
  45% { transform: translate3d(-5px, -2px, 0) rotate(-1.2deg); }
  50% { transform: translate3d(0, 0, 0) rotate(0deg); }
  55% { transform: translate3d(-8px, 1px, 0) rotate(-1.8deg); }
  60% { transform: translate3d(7px, -2px, 0) rotate(1.6deg); }
  65% { transform: translate3d(-6px, 2px, 0) rotate(-1.4deg); }
  70% { transform: translate3d(8px, -1px, 0) rotate(1.8deg); }
  75% { transform: translate3d(-7px, 1px, 0) rotate(-1.5deg); }
  80% { transform: translate3d(9px, -2px, 0) rotate(2deg); }
  85% { transform: translate3d(-8px, 2px, 0) rotate(-1.8deg); }
  90% { transform: translate3d(7px, -1px, 0) rotate(1.6deg); }
  95% { transform: translate3d(-9px, 1px, 0) rotate(-2deg); }
}

@keyframes boxShakeLegendary {
  0% { transform: translate3d(0,0,0) rotate(0deg); }
  3% { transform: translate3d(-8px, 2px, 0) rotate(-2deg); }
  6% { transform: translate3d(9px, -2px, 0) rotate(2.2deg); }
  9% { transform: translate3d(-7px, -3px, 0) rotate(-1.8deg); }
  12% { transform: translate3d(10px, 1px, 0) rotate(2.5deg); }
  15% { transform: translate3d(-9px, 3px, 0) rotate(-2.2deg); }
  18% { transform: translate3d(8px, -2px, 0) rotate(2deg); }
  21% { transform: translate3d(-11px, 1px, 0) rotate(-2.8deg); }
  24% { transform: translate3d(10px, -3px, 0) rotate(2.5deg); }
  27% { transform: translate3d(-9px, 2px, 0) rotate(-2.3deg); }
  30% { transform: translate3d(12px, -1px, 0) rotate(3deg); }
  33% { transform: translate3d(-10px, -2px, 0) rotate(-2.6deg); }
  36% { transform: translate3d(11px, 3px, 0) rotate(2.8deg); }
  39% { transform: translate3d(-12px, -1px, 0) rotate(-3deg); }
  42% { transform: translate3d(10px, 2px, 0) rotate(2.5deg); }
  45% { transform: translate3d(-11px, -3px, 0) rotate(-2.8deg); }
  48% { transform: translate3d(0, 0, 0) rotate(0deg); }
  51% { transform: translate3d(-12px, 2px, 0) rotate(-3.2deg); }
  54% { transform: translate3d(13px, -2px, 0) rotate(3.4deg); }
  57% { transform: translate3d(-11px, -3px, 0) rotate(-2.8deg); }
  60% { transform: translate3d(14px, 2px, 0) rotate(3.5deg); }
  63% { transform: translate3d(-13px, 1px, 0) rotate(-3.2deg); }
  66% { transform: translate3d(12px, -3px, 0) rotate(3deg); }
  69% { transform: translate3d(-14px, 3px, 0) rotate(-3.6deg); }
  72% { transform: translate3d(15px, -2px, 0) rotate(3.8deg); }
  75% { transform: translate3d(-13px, -3px, 0) rotate(-3.4deg); }
  78% { transform: translate3d(14px, 2px, 0) rotate(3.6deg); }
  81% { transform: translate3d(-15px, 1px, 0) rotate(-3.8deg); }
  84% { transform: translate3d(16px, -3px, 0) rotate(4deg); }
  87% { transform: translate3d(-14px, 3px, 0) rotate(-3.6deg); }
  90% { transform: translate3d(15px, -2px, 0) rotate(3.8deg); }
  93% { transform: translate3d(-16px, 2px, 0) rotate(-4deg); }
  96% { transform: translate3d(14px, -3px, 0) rotate(3.6deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}

@keyframes glowBuild {
  0% { opacity: 0.4; transform: translateX(-50%) scale(1); }
  100% { opacity: 1; transform: translateX(-50%) scale(1.8); }
}

@keyframes glowBuildIntense {
  0% { opacity: 0.4; transform: translateX(-50%) scale(1); }
  60% { opacity: 0.9; transform: translateX(-50%) scale(1.6); }
  100% { opacity: 1; transform: translateX(-50%) scale(2.4); }
}

@keyframes seamGlow {
  0% { opacity: 0; }
  30% { opacity: 0.3; }
  100% { opacity: 1; }
}

@keyframes particleSwirl {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--startDist) * -1)) translateZ(0);
  }
  15% { opacity: 1; }
  100% {
    opacity: 0.2;
    transform: translate(-50%, -50%) rotate(calc(var(--angle) + 270deg)) translateY(0) translateZ(0);
  }
}

@keyframes particleOrbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--radius) * -1)) translateZ(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg)) translateY(calc(var(--radius) * -1)) translateZ(0);
  }
}

@keyframes particleFadeIn {
  from { opacity: 0; }
  to { opacity: var(--target-opacity); }
}

@keyframes lidFlyOff {
  0% { transform: translateY(0) rotate(0deg) translateZ(0); opacity: 1; }
  35% { opacity: 1; }
  100% { transform: translateY(-240px) rotate(20deg) translateZ(0); opacity: 0; }
}

@keyframes lidFlyOffIntense {
  0% { transform: translateY(0) rotate(0deg) scale(1) translateZ(0); opacity: 1; }
  20% { opacity: 1; transform: translateY(-40px) rotate(5deg) scale(1.05) translateZ(0); }
  100% { transform: translateY(-350px) rotate(35deg) scale(0.7) translateZ(0); opacity: 0; }
}

@keyframes boxBodyFade {
  0% { opacity: 1; transform: scale(1) translateZ(0); }
  100% { opacity: 0; transform: scale(0.6) translateY(25px) translateZ(0); }
}

@keyframes boxBodyFadeIntense {
  0% { opacity: 1; transform: scale(1) translateZ(0); }
  40% { opacity: 0.8; transform: scale(1.05) translateZ(0); }
  100% { opacity: 0; transform: scale(0.4) translateY(35px) translateZ(0); }
}

@keyframes beamShoot {
  0% { opacity: 0; transform: translateX(-50%) scaleY(0) translateZ(0); transform-origin: bottom; }
  25% { opacity: 0.95; }
  100% { opacity: 0.6; transform: translateX(-50%) scaleY(1) translateZ(0); transform-origin: bottom; }
}

@keyframes beamShootIntense {
  0% { opacity: 0; transform: translateX(-50%) scaleY(0) scaleX(0.6) translateZ(0); transform-origin: bottom; }
  15% { opacity: 1; transform: translateX(-50%) scaleY(1.1) scaleX(1.2) translateZ(0); }
  30% { transform: translateX(-50%) scaleY(1) scaleX(0.9) translateZ(0); }
  100% { opacity: 0.7; transform: translateX(-50%) scaleY(1) scaleX(1) translateZ(0); transform-origin: bottom; }
}

@keyframes beamPulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleX(1) translateZ(0); }
  50% { opacity: 0.8; transform: translateX(-50%) scaleX(1.15) translateZ(0); }
}

@keyframes screenFlash {
  0% { opacity: var(--flash-intensity); }
  100% { opacity: 0; }
}

@keyframes screenFlashLegendary {
  0% { opacity: var(--flash-intensity); transform: scale(1); }
  15% { opacity: calc(var(--flash-intensity) * 1.2); transform: scale(1.02); }
  30% { opacity: calc(var(--flash-intensity) * 0.6); }
  45% { opacity: calc(var(--flash-intensity) * 0.8); }
  100% { opacity: 0; transform: scale(1); }
}

@keyframes particleBurst {
  0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) translateZ(0); }
  100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)) translateZ(0); }
}

@keyframes cardReveal {
  0% { opacity: 0; transform: scale(0.1) translateY(70px) translateZ(0); }
  45% { opacity: 1; transform: scale(1.08) translateY(-10px) translateZ(0); }
  70% { transform: scale(0.96) translateY(4px) translateZ(0); }
  100% { opacity: 1; transform: scale(1) translateY(0) translateZ(0); }
}

@keyframes cardRevealEpic {
  0% { opacity: 0; transform: scale(0.05) translateY(90px) rotate(-3deg) translateZ(0); }
  30% { opacity: 1; transform: scale(1.15) translateY(-15px) rotate(1deg) translateZ(0); }
  55% { transform: scale(0.94) translateY(6px) rotate(-0.5deg) translateZ(0); }
  75% { transform: scale(1.04) translateY(-3px) rotate(0.3deg) translateZ(0); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg) translateZ(0); }
}

@keyframes cardRevealLegendary {
  0% { opacity: 0; transform: scale(0.02) translateY(120px) rotate(-5deg) translateZ(0); }
  20% { opacity: 1; transform: scale(1.22) translateY(-20px) rotate(2deg) translateZ(0); }
  40% { transform: scale(0.9) translateY(10px) rotate(-1deg) translateZ(0); }
  55% { transform: scale(1.1) translateY(-8px) rotate(0.8deg) translateZ(0); }
  70% { transform: scale(0.97) translateY(3px) rotate(-0.3deg) translateZ(0); }
  85% { transform: scale(1.03) translateY(-1px) rotate(0.1deg) translateZ(0); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg) translateZ(0); }
}

@keyframes emojiPop {
  0% { transform: scale(0) rotate(-15deg) translateZ(0); }
  70% { transform: scale(1.15) rotate(3deg) translateZ(0); }
  100% { transform: scale(1) rotate(0deg) translateZ(0); }
}

@keyframes emojiPopLegendary {
  0% { transform: scale(0) rotate(-20deg) translateZ(0); }
  40% { transform: scale(1.35) rotate(5deg) translateZ(0); }
  60% { transform: scale(0.85) rotate(-3deg) translateZ(0); }
  80% { transform: scale(1.12) rotate(1deg) translateZ(0); }
  100% { transform: scale(1) rotate(0deg) translateZ(0); }
}

@keyframes shimmer {
  0%, 100% { box-shadow: 0 0 30px var(--glow), inset 0 1px 0 rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 55px var(--glow), 0 0 90px var(--glow), inset 0 1px 0 rgba(255,255,255,0.2); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1) translateZ(0); }
  50% { transform: scale(1.12) translateZ(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px) translateZ(0); }
  to { opacity: 1; transform: translateY(0) translateZ(0); }
}

@keyframes overlayFadeIn {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(12px); }
}

@keyframes overlayFadeOut {
  from { opacity: 1; backdrop-filter: blur(12px); }
  to { opacity: 0; backdrop-filter: blur(0px); }
}

@keyframes overlayContentSlideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95) translateZ(0); }
  to { opacity: 1; transform: translateY(0) scale(1) translateZ(0); }
}

@keyframes overlayContentSlideDown {
  from { opacity: 1; transform: translateY(0) scale(1) translateZ(0); }
  to { opacity: 0; transform: translateY(40px) scale(0.95) translateZ(0); }
}

@keyframes wishingDots {
  0%, 20% { content: '✦'; }
  40% { content: '✦ ✦'; }
  60% { content: '✦ ✦ ✦'; }
  80%, 100% { content: '✦'; }
}

@keyframes wishingPulse {
  0%, 100% { opacity: 0.3; transform: scale(1) translateZ(0); }
  50% { opacity: 0.6; transform: scale(1.03) translateZ(0); }
}

@keyframes legendaryRainbowBorder {
  0% { border-color: rgba(251,191,36,0.6); }
  25% { border-color: rgba(255,107,157,0.6); }
  50% { border-color: rgba(192,132,252,0.6); }
  75% { border-color: rgba(96,165,250,0.6); }
  100% { border-color: rgba(251,191,36,0.6); }
}
`;
