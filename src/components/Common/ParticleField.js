import React, { useRef, useEffect } from "react";
import { useMood } from "../../context/MoodContext";
import { useIsTouch } from "../../hooks/useIsTouch";

function hexToRgb(hex) {
  const h = (hex || "#ffffff").replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// Lightweight canvas constellation field. Particles drift, link to nearby
// neighbours, and on desktop they light up + lean toward the cursor (pairs
// with the CursorTorch). On touch it's the same drift/link, just no pointer.
const ParticleField = () => {
  const { mood } = useMood();
  const isTouch = useIsTouch();
  const canvasRef = useRef(null);
  const colorsRef = useRef({
    primary: mood.colors.primary,
    secondary: mood.colors.secondary,
  });

  // Keep the animation loop reading the latest mood colors without restarting.
  useEffect(() => {
    colorsRef.current = {
      primary: mood.colors.primary,
      secondary: mood.colors.secondary,
    };
  }, [mood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf;
    let particles = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const CONNECT = isTouch ? 110 : 140;
    const MOUSE_DIST = 190;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        Math.floor((w * h) / (isTouch ? 28000 : 16000)),
        isTouch ? 46 : 100
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const p = hexToRgb(colorsRef.current.primary);
      const s = hexToRgb(colorsRef.current.secondary);

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        a.x += a.vx;
        a.y += a.vy;

        // wrap around edges
        if (a.x < -12) a.x = w + 12;
        else if (a.x > w + 12) a.x = -12;
        if (a.y < -12) a.y = h + 12;
        else if (a.y > h + 12) a.y = -12;

        // cursor proximity
        let glow = 0;
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < MOUSE_DIST) {
            glow = 1 - dist / MOUSE_DIST;
            // gentle lean toward the cursor
            a.x -= (dx / dist) * glow * 0.6;
            a.y -= (dy / dist) * glow * 0.6;
            // link to cursor
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${glow * 0.45})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // particle dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + glow * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${0.32 + glow * 0.6})`;
        ctx.fill();

        // links to neighbours
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            const o = (1 - dist / CONNECT) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${o})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.body.addEventListener("mouseleave", onMouseLeave);
    }

    // Pause when the tab is hidden
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isTouch]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleField;
