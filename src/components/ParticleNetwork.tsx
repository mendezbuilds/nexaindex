"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 46;
const MAX_LINK_DISTANCE = 130;
const PULL_COEFF = 0.00008;
const JITTER = 0.02;
const DAMPING = 0.98;
const MAX_SPEED = 0.35;
const COLORS = ["#22D3EE", "#A855F7"];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

/**
 * Ambient background layer for the Hero: a loose field of drifting nodes,
 * gently pulled toward center (not pure random walk) with distance-faded
 * connecting lines. Sits behind the Orb and all Hero content — atmosphere,
 * not the focal visual.
 */
export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;

    const seedNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.4 + Math.random() * 1.4,
        color: COLORS[Math.random() < 0.5 ? 0 : 1],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) seedNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_LINK_DISTANCE) {
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = (1 - dist / MAX_LINK_DISTANCE) * 0.35;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.8;
      for (const n of nodes) {
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion) {
        const centerX = width / 2;
        const centerY = height / 2;
        for (const n of nodes) {
          const dx = centerX - n.x;
          const dy = centerY - n.y;
          n.vx += dx * PULL_COEFF + (Math.random() - 0.5) * JITTER;
          n.vy += dy * PULL_COEFF + (Math.random() - 0.5) * JITTER;
          n.vx *= DAMPING;
          n.vy *= DAMPING;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed > MAX_SPEED) {
            n.vx = (n.vx / speed) * MAX_SPEED;
            n.vy = (n.vy / speed) * MAX_SPEED;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.min(Math.max(n.x, 0), width);
          n.y = Math.min(Math.max(n.y, 0), height);
        }
      }
    };

    const loop = () => {
      draw();
      if (!reduceMotion) frameId = requestAnimationFrame(loop);
    };

    resize();
    loop();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
