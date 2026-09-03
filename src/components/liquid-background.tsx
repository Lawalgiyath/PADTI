'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-screen animated liquid/flow-field background: domain-warped fractal
 * Brownian motion (fbm) noise rendered in a raw WebGL2 fragment shader — the
 * same technique behind most "liquid gradient" hero backgrounds (simplex
 * noise, warped through itself, colored via a duotone gradient). Plain
 * WebGL2, no Three.js — this is a single full-screen triangle, doesn't
 * warrant the extra dependency weight.
 */

const VERT = `#version 300 es
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * 3.0;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.045;
  vec2 warp1 = vec2(fbm(p + vec2(t, -t)), fbm(p + vec2(-t, t) + 5.2));
  vec2 warp2 = vec2(fbm(p + warp1 * 1.6 + vec2(1.7, 9.2) + t * 0.6), fbm(p + warp1 * 1.6 + vec2(8.3, 2.8) - t * 0.6));
  float n = fbm(p + warp2 * 1.4);

  float mixA = smoothstep(-0.4, 0.5, n);
  float mixB = smoothstep(0.1, 0.9, warp2.x);

  vec3 col = mix(uColorA, uColorB, mixA);
  col = mix(col, uColorC, mixB * 0.55);

  float vign = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= 0.55 + 0.45 * vign;

  fragColor = vec4(col, 1.0);
}`;

function hexToVec3(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export function LiquidBackground({
  colorA = '#0a1730',
  colorB = '#1e4d8f',
  colorC = '#c98a3a',
  className = '',
}: {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function compile(type: number, src: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uColorA = gl.getUniformLocation(program, 'uColorA');
    const uColorB = gl.getUniformLocation(program, 'uColorB');
    const uColorC = gl.getUniformLocation(program, 'uColorC');

    gl.uniform3fv(uColorA, hexToVec3(colorA));
    gl.uniform3fv(uColorB, hexToVec3(colorB));
    gl.uniform3fv(uColorC, hexToVec3(colorC));

    let raf = 0;
    let start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const { clientWidth, clientHeight } = canvas!;
      canvas!.width = Math.floor(clientWidth * dpr);
      canvas!.height = Math.floor(clientHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function frame(now: number) {
      const t = (now - start) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      gl.uniform1f(uTime, 8);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [colorA, colorB, colorC]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
}
