"use me";
"use client";

import { useEffect, useRef } from "react";

export function PitchCanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Tactical nodes (players) on pitch
    const nodesCount = 18;
    const nodes = Array.from({ length: nodesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Passing Ball Simulation
    let ball = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      speed: 0.05,
    };

    const pickNewTarget = () => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      ball.targetX = randomNode.x;
      ball.targetY = randomNode.y;
    };
    pickNewTarget();
    const interval = setInterval(pickNewTarget, 2500);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light-theme") || document.body.classList.contains("light-theme") || canvas.parentElement?.closest(".light-theme");
      const accentColor = isLight ? "#059669" : "#00ff87";
      const strokeColor = isLight ? "rgba(16, 185, 129, 0.15)" : "rgba(0, 255, 135, 0.06)";

      // Pitch Center Circle & Lines
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      // Draw Center Circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.stroke();

      // Center Line
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Move & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 140) {
            ctx.strokeStyle = isLight 
              ? `rgba(16, 185, 129, ${0.25 * (1 - dist / 140)})`
              : `rgba(0, 255, 135, ${0.12 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw Player Node
        const glowRadius = node.radius + Math.sin(node.pulse) * 1.5;
        ctx.fillStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = isLight ? 4 : 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, glowRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Move Ball
      ball.x += (ball.targetX - ball.x) * ball.speed;
      ball.y += (ball.targetY - ball.y) * ball.speed;

      // Draw Glowing Ball Pass Trail
      ctx.strokeStyle = isLight ? "rgba(16, 185, 129, 0.5)" : "rgba(0, 255, 135, 0.4)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(ball.targetX, ball.targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Glowing Ball
      ctx.fillStyle = isLight ? "#0f172a" : "#ffffff";
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = isLight ? 6 : 15;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
