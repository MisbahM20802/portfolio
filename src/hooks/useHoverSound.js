import { useCallback, useRef } from 'react';

// Shared AudioContext singleton (created on first user interaction)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Creates a short burst of filtered noise to simulate the "clink" impact transient.
 */
function createImpactNoise(ctx, destination, now, volume = 0.5, duration = 0.015) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 4);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // High-pass filter to make the transient bright and glassy
  const hpFilter = ctx.createBiquadFilter();
  hpFilter.type = 'highpass';
  hpFilter.frequency.value = 3000;
  hpFilter.Q.value = 1;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(hpFilter);
  hpFilter.connect(noiseGain);
  noiseGain.connect(destination);
  noise.start(now);
  noise.stop(now + duration);
}

/**
 * Creates a resonant sine partial — the ringing tone of a wine glass.
 */
function createResonantPartial(ctx, destination, now, freq, gainVal, decay) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  // Slight pitch drop simulates the glass vibration settling
  osc.frequency.exponentialRampToValueAtTime(freq * 0.995, now + decay);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(gainVal, now);
  // Fast initial drop then slow ring-out (like real glass)
  gain.gain.setTargetAtTime(gainVal * 0.3, now, decay * 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

  osc.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc.stop(now + decay + 0.05);
}

/**
 * Plays a rich wine glass CLINK — two glasses touching.
 * Used for project card hovers. Fuller, louder, with more harmonics and longer sustain.
 */
function playGlassClink() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Master gain — nice and audible
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.094, now);
  master.connect(ctx.destination);

  // Sharp impact transient — the "clink" moment
  createImpactNoise(ctx, master, now, 0.8, 0.018);

  // === Glass 1 — slightly lower pitch ===
  createResonantPartial(ctx, master, now, 2093, 0.30, 0.55);  // C7 fundamental
  createResonantPartial(ctx, master, now, 3520, 0.18, 0.40);  // 2nd partial
  createResonantPartial(ctx, master, now, 5274, 0.10, 0.30);  // 3rd partial
  createResonantPartial(ctx, master, now, 7040, 0.05, 0.20);  // 4th shimmer

  // === Glass 2 — slightly higher pitch (detuned for realism) ===
  // The second glass rings at slightly different frequencies creating
  // the characteristic "beating" shimmer of two glasses touching
  createResonantPartial(ctx, master, now + 0.003, 2349, 0.28, 0.50);  // D7
  createResonantPartial(ctx, master, now + 0.003, 3951, 0.15, 0.35);  // 2nd partial
  createResonantPartial(ctx, master, now + 0.003, 5920, 0.08, 0.25);  // 3rd partial
  createResonantPartial(ctx, master, now + 0.003, 7902, 0.04, 0.18);  // 4th shimmer
}

/**
 * Custom hook that returns a hover sound handler for wine glass clink.
 * @param {number} cooldownMs - Minimum ms between sounds to avoid rapid-fire (default 100ms)
 * @returns {function} onMouseEnter handler that plays the sound
 */
export default function useHoverSound(cooldownMs = 100) {
  const lastPlayedRef = useRef(0);

  const playSound = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayedRef.current < cooldownMs) return;
    lastPlayedRef.current = now;

    try {
      playGlassClink();
    } catch (e) {
      // Silently fail — audio is a nice-to-have
    }
  }, [cooldownMs]);

  return playSound;
}
