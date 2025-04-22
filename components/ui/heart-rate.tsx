"use client";

import { useEffect, useRef, useState } from "react";

const HeartRate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 50 });

  // Heart rate points - represents a typical ECG waveform
  const heartRatePoints = [
    { x: 0, y: 50 },
    { x: 20, y: 50 },
    { x: 30, y: 50 },
    { x: 35, y: 20 },
    { x: 40, y: 80 },
    { x: 45, y: 50 },
    { x: 55, y: 50 },
    { x: 70, y: 50 },
    { x: 80, y: 20 },
    { x: 90, y: 50 },
    { x: 100, y: 50 },
    { x: 120, y: 50 },
    { x: 140, y: 50 },
    { x: 150, y: 20 },
    { x: 155, y: 80 },
    { x: 160, y: 50 },
    { x: 170, y: 50 },
    { x: 185, y: 50 },
    { x: 195, y: 50 },
    { x: 200, y: 50 },
    { x: 220, y: 50 }
  ];

  // Animation frame tracking
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const speedRef = useRef<number>(70); // pixels per second
  const currentIndexRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Draw the heart rate line and the moving dot
  const draw = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw heart rate line
    ctx.lineWidth = 4;
    ctx.beginPath();

    // Scale points to canvas size
    const scaleX = width / 220;
    const scaleY = height / 100;

    heartRatePoints.forEach((point, index) => {
      const x = point.x * scaleX;
      const y = point.y * scaleY;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw the moving dot
    ctx.beginPath();
    ctx.arc(dotPosition.x * scaleX, dotPosition.y * scaleY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect to the dot
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(dotPosition.x * scaleX, dotPosition.y * scaleY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  // Animate the dot along the path
  const animate = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Update progress
    progressRef.current += ((deltaTime / 1000) * speedRef.current) / 220;

    if (progressRef.current >= 1) {
      progressRef.current = 0;
      currentIndexRef.current = 0;
    }

    // Find the current segment
    const totalPoints = heartRatePoints.length;
    const totalLength = 220; // Total x distance
    const targetX = progressRef.current * totalLength;

    // Find the two points the dot is between
    let startIndex = 0;
    for (let i = 0; i < totalPoints - 1; i++) {
      if (
        heartRatePoints[i].x <= targetX &&
        heartRatePoints[i + 1].x >= targetX
      ) {
        startIndex = i;
        break;
      }
    }

    const p1 = heartRatePoints[startIndex];
    const p2 = heartRatePoints[startIndex + 1];

    // Interpolate between the two points
    const segmentProgress = (targetX - p1.x) / (p2.x - p1.x);
    const x = p1.x + segmentProgress * (p2.x - p1.x);
    const y = p1.y + segmentProgress * (p2.y - p1.y);

    setDotPosition({ x, y });

    // Continue animation
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        draw(ctx, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx, canvas.width, canvas.height);
  }, [dotPosition]);

  return (
    <div className="relative h-32 w-full overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default HeartRate;
