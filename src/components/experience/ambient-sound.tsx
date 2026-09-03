'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * A small synthesized engine-drone soundscape (two detuned oscillators through
 * a lowpass filter), not a licensed audio loop — kept self-contained so nothing
 * here depends on sourcing/clearing a third-party sound file. Pitch responds
 * subtly to scroll velocity. Never autoplays: Web Audio only starts on the
 * user's own click, per browser autoplay policy and basic courtesy.
 */
export function AmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode } | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      const velocity = Math.min(dy / dt, 3);
      lastScrollY.current = window.scrollY;
      lastTime.current = now;

      const nodes = nodesRef.current;
      const ctx = ctxRef.current;
      if (nodes && ctx) {
        const targetFreq = 58 + velocity * 40;
        nodes.osc1.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.25);
        nodes.osc2.frequency.setTargetAtTime(targetFreq * 1.503, ctx.currentTime, 0.25);
        nodes.filter.frequency.setTargetAtTime(220 + velocity * 300, ctx.currentTime, 0.2);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    if (!enabled) {
      const ctx = ctxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 220;
      filter.connect(gain);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = 58;
      osc1.connect(filter);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = 58 * 1.503;
      osc2.connect(filter);

      osc1.start();
      osc2.start();
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);

      nodesRef.current = { gain, osc1, osc2, filter };
      setEnabled(true);
    } else {
      const ctx = ctxRef.current;
      const nodes = nodesRef.current;
      if (ctx && nodes) {
        nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        setTimeout(() => {
          nodes.osc1.stop();
          nodes.osc2.stop();
        }, 700);
        nodesRef.current = null;
      }
      setEnabled(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={enabled}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
