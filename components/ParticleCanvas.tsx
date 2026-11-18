"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  colorType: "clean" | "medium" | "toxic";
}

interface ParticleCanvasProps {
  aqi?: number;
  className?: string;
}

export default function ParticleCanvas({
  aqi = 42,
  className = "",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? Math.max(parent.clientHeight, 400) : window.innerHeight;

      if (w > 0 && h > 0) {
        width = canvas.width = w;
        height = canvas.height = h;
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", updateDimensions);

    // Particle count scaled with AQI
    const baseCount = Math.min(180, Math.max(50, Math.floor(45 + aqi * 0.3)));
    const particles: Particle[] = [];

    const getColors = (currentAqi: number) => {
      if (currentAqi <= 50) {
        return {
          primary: "16, 185, 129", // Emerald
          secondary: "6, 182, 212", // Cyan
          accent: "56, 189, 248", // Sky
        };
      }
      if (currentAqi <= 100) {
        return {
          primary: "234, 179, 8", // Amber
          secondary: "245, 158, 11", // Gold
          accent: "217, 119, 6",
        };
      }
      if (currentAqi <= 200) {
        return {
          primary: "249, 115, 22", // Orange
          secondary: "239, 68, 68", // Red
          accent: "194, 65, 12",
        };
      }
      return {
        primary: "168, 85, 247", // Purple/Hazardous
        secondary: "225, 29, 72", // Rose
        accent: "126, 34, 206",
      };
    };

    const palette = getColors(aqi);

    const safeW = width > 0 ? width : window.innerWidth || 1200;
    const safeH = height > 0 ? height : window.innerHeight || 800;

    for (let i = 0; i < baseCount; i++) {
      particles.push({
        x: Math.random() * safeW,
        y: Math.random() * safeH,
        vx: (Math.random() - 0.4) * (0.45 + aqi * 0.002),
        vy: (Math.random() - 0.5) * (0.35 + aqi * 0.0015),
        size: Math.random() * 2.2 + (aqi > 150 ? 1.4 : 0.8),
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        colorType: i % 3 === 0 ? "clean" : i % 3 === 1 ? "medium" : "toxic",
      });
    }

    // Window mouse tracking so moving over foreground text/cards still perturbs particles
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    const render = () => {
      if (width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Radial atmospheric ambient lighting with safe radii
      const r0 = 10;
      const r1 = Math.max(r0 + 20, width * 0.65);
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        r0,
        width * 0.5,
        height * 0.45,
        r1
      );

      if (aqi <= 50) {
        grad.addColorStop(0, "rgba(16, 185, 129, 0.07)");
        grad.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
        grad.addColorStop(1, "rgba(2, 6, 23, 0)");
      } else if (aqi <= 100) {
        grad.addColorStop(0, "rgba(234, 179, 8, 0.07)");
        grad.addColorStop(0.5, "rgba(245, 158, 11, 0.02)");
        grad.addColorStop(1, "rgba(2, 6, 23, 0)");
      } else {
        grad.addColorStop(0, "rgba(239, 68, 68, 0.08)");
        grad.addColorStop(0.5, "rgba(168, 85, 247, 0.03)");
        grad.addColorStop(1, "rgba(2, 6, 23, 0)");
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Connect near particles with delicate vector filaments
      const maxDistance = aqi > 120 ? 80 : 65;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(${palette.secondary}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        const jitter = (Math.random() - 0.5) * (aqi > 150 ? 0.4 : 0.15);
        p.x += p.vx + jitter;
        p.y += p.vy + jitter;

        // Interaction with mouse pointer (wake vortex deflection)
        if (mouseRef.current.active) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const pushRadius = 150;

          if (mDist < pushRadius && mDist > 0) {
            const force = (1 - mDist / pushRadius) * 2.8;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Render particle with soft glow halo
        const color =
          p.colorType === "clean"
            ? palette.primary
            : p.colorType === "medium"
            ? palette.secondary
            : palette.accent;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${color}, 0.6)`;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [aqi]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
