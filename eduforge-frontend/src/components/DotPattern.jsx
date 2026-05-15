import React, { useCallback, useEffect, useRef } from 'react';

const DotPattern = ({
  children,
  dotSize = 2,
  gap = 24,
  baseColor = "64, 64, 64", 
  glowColor = "255, 193, 7",
  proximity = 120,
  waveSpeed = 0.5,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = containerRef.current.offsetHeight; 
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const cellSize = dotSize + gap;
    const dots = [];
    for (let y = 0; y < height + cellSize; y += cellSize) {
      for (let x = 0; x < width + cellSize; x += cellSize) {
        dots.push({ x, y, opacity: 0.3 + Math.random() * 0.2 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const { x: mx, y: my } = mouseRef.current;
    const time = Date.now() * 0.001 * waveSpeed;
    dotsRef.current.forEach(dot => {
      const dist = Math.hypot(dot.x - mx, dot.y - my);
      const wave = Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
      const isNear = dist < proximity;
      const t = isNear ? Math.pow(1 - dist / proximity, 2) : 0; 
      const scale = (1 + wave * 0.2) + (t * 0.8);
      const opacity = Math.min(1, (dot.opacity + wave * 0.15) + (t * 0.7));
      const color = isNear ? glowColor : baseColor;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, (dotSize / 2) * scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }, [baseColor, glowColor, proximity, dotSize, waveSpeed]);

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);
    const move = (e) => {
      const r = canvasRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.pageY - r.top };
    };
    window.addEventListener('mousemove', move);
    const anim = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(anim);
    };
  }, [buildGrid, draw]);

  return (
    <div ref={containerRef} class="position-relative overflow-hidden bg-dark min-vh-100">
      <canvas 
        ref={canvasRef} 
        class="position-absolute top-0 start-0 w-100 h-100" 
        style={{ pointerEvents: 'none' }}
      />
      <div class="position-relative z-1">{children}</div>
    </div>
  );
};

export default DotPattern;