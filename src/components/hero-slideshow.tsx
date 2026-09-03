'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/images/equipment/scania-r-series.jpg',
    alt: 'Articulated truck on the highway, the class of vehicle PADTI trains drivers to operate',
    focus: 'center 45%',
  },
  {
    src: '/images/facility-visit/padti-facility-visit-11.jpeg',
    alt: 'The male hostel building at the PADTI training facility',
    focus: 'center 16%',
  },
  {
    src: '/images/equipment/mercedes-actros.jpg',
    alt: 'A heavy-duty articulated truck, representative of the fleet PADTI trainees learn to handle',
    focus: 'center 40%',
  },
  {
    src: '/images/planning-meeting/padti-planning-meeting-02.jpeg',
    alt: 'PADTI leadership in a strategic planning session',
    focus: 'center 25%',
  },
];

const INTERVAL_MS = 5500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: slide.focus }}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
