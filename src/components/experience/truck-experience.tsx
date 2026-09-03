'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { KineticText } from './kinetic-text';

const TruckCanvas = dynamic(() => import('./truck-canvas').then((m) => m.TruckCanvas), { ssr: false });

const beats = [
  {
    range: [0.14, 0.34],
    eyebrow: 'INSTITUTIONAL GRADE',
    line: 'Simulator hours. Real road time. Zero shortcuts.',
  },
  {
    range: [0.4, 0.6],
    eyebrow: 'VERIFIED, NOT CLAIMED',
    line: 'Every credential is checkable — not a badge on a page.',
  },
  {
    range: [0.66, 0.86],
    eyebrow: 'ASPHALT TO DEPLOYMENT',
    line: 'From your first gear change to a global logistics career.',
  },
];

function IntroBlock({ wrapperId, children }: { wrapperId: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const wrapper = document.getElementById(wrapperId);
    if (!el || !wrapper) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const opacity = 1 - gsap.utils.clamp(0, 1, self.progress / 0.1);
        gsap.set(el, { opacity, y: -self.progress * 120 });
      },
    });

    return () => st.kill();
  }, [wrapperId]);

  return <div ref={ref}>{children}</div>;
}

function ScrollBeat({ eyebrow, line, range, wrapperId }: (typeof beats)[number] & { wrapperId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const wrapper = document.getElementById(wrapperId);
    if (!el || !wrapper) return;
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const p = self.progress;
        const [start, end] = range;
        const mid = (start + end) / 2;
        const fadeIn = gsap.utils.clamp(0, 1, (p - start) / (mid - start));
        const fadeOut = gsap.utils.clamp(0, 1, (end - p) / (end - mid));
        const opacity = p < start || p > end ? 0 : Math.min(fadeIn, fadeOut);
        gsap.set(el, { opacity, y: (1 - opacity) * 24 });
      },
    });

    return () => st.kill();
  }, [range, wrapperId]);

  return (
    <div ref={ref} className="pointer-events-none absolute left-6 top-1/2 z-20 max-w-md -translate-y-1/2 opacity-0 md:left-16">
      <div className="rounded-sm bg-asphalt/75 px-6 py-5 backdrop-blur-md">
        <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <p className="font-headline text-3xl leading-[1.05] text-bone md:text-4xl">{line}</p>
      </div>
    </div>
  );
}

export function TruckExperience({ ctaHref, ctaLabel }: { ctaHref: string; ctaLabel: string }) {
  return (
    <div id="truck-experience" className="relative h-[340vh] bg-asphalt">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_60%_35%,hsl(220_12%_11%),hsl(220_15%_5%)_70%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />

        <div className="absolute inset-0 md:left-[8%]">
          <TruckCanvas scrollTriggerId="truck-experience" />
        </div>

        {/* Hero headline layer (fades out early in the pin, before the scroll beats take over) */}
        <IntroBlock wrapperId="truck-experience">
          <div className="relative z-10 flex h-screen flex-col items-start justify-center px-6 md:px-16">
            <p className="mb-5 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">
              The World&apos;s Largest Articulated Driver Network
            </p>
            <KineticText
              as="h1"
              trigger="load"
              className="max-w-3xl font-headline text-[13vw] leading-[0.92] text-bone md:text-[6.2vw]"
              text="TRAIN FOR EXCELLENCE."
            />
            <KineticText
              as="h1"
              trigger="load"
              delay={0.15}
              className="max-w-3xl font-headline text-[13vw] leading-[0.92] text-primary md:text-[6.2vw]"
              text="PARTNER FOR GROWTH."
            />
            <p className="mt-8 max-w-xl font-body text-base text-muted-foreground md:text-lg">
              PADTI Connect bridges elite driver training and the global logistics ecosystem — for drivers, employers, and partners alike.
            </p>
            <Link
              href={ctaHref}
              data-cursor-hover
              className="group mt-10 inline-flex items-center gap-3 border-b-2 border-primary pb-1 font-body text-lg font-semibold text-bone transition-colors hover:text-primary"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </IntroBlock>

        {beats.map((b) => (
          <ScrollBeat key={b.eyebrow} {...b} wrapperId="truck-experience" />
        ))}

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
