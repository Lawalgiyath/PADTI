'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function KineticText({
  text,
  as: Tag = 'span',
  className = '',
  trigger = 'load',
  delay = 0,
}: {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  trigger?: 'load' | 'scroll';
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = el.querySelectorAll('.kinetic-word');
    const anim = {
      opacity: 0,
      y: '110%',
      rotateZ: 4,
    };

    if (trigger === 'load') {
      gsap.fromTo(
        words,
        anim,
        { opacity: 1, y: '0%', rotateZ: 0, duration: 0.9, stagger: 0.045, ease: 'power4.out', delay }
      );
    } else {
      gsap.fromTo(
        words,
        anim,
        {
          opacity: 1,
          y: '0%',
          rotateZ: 0,
          duration: 0.9,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    }
  }, [trigger, delay]);

  const words = text.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <span className="kinetic-word inline-block">{w}</span>
        </span>
      ))}
    </Tag>
  );
}
