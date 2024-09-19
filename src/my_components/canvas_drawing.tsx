"use client"

import React, { useEffect, useRef, useState } from "react";

interface Line {
  start: { x: number; y: number };
  end: { x: number; y: number };
  hue: number;
  timestamp: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  hue: number;
  timestamp: number;
}

const CanvasDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hue, setHue] = useState(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const linesRef = useRef<Line[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 10;

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();

      // Filter lines and sparkles based on time
      linesRef.current = linesRef.current.filter(
          (line) => currentTime - line.timestamp < 800,
      );
      sparklesRef.current = sparklesRef.current.filter(
          (sparkle) => currentTime - sparkle.timestamp < 1000,
      );

      // Draw lines
      linesRef.current.forEach((line) => {
        const timePassed = currentTime - line.timestamp;
        const opacity = Math.max(0, 1 - timePassed / 5000);

        context.beginPath();
        context.strokeStyle = `hsla(${line.hue}, 100%, 50%, ${opacity})`;
        context.moveTo(line.start.x, line.start.y - scrollYRef.current);
        context.lineTo(line.end.x, line.end.y - scrollYRef.current);
        context.stroke();

        // Draw beam
        context.shadowColor = `hsla(${line.hue}, 100%, 50%, ${opacity * 0.5})`;
        context.shadowBlur = 10;
        context.stroke();
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
      });

      // Draw sparkles
      sparklesRef.current.forEach((sparkle) => {
        const timePassed = currentTime - sparkle.timestamp;
        const opacity = Math.max(0, 1 - timePassed / 1000);
        const size = sparkle.size * (1 - timePassed / 1000);

        context.beginPath();
        context.fillStyle = `hsla(${sparkle.hue}, 100%, 50%, ${opacity})`;
        context.arc(sparkle.x, sparkle.y - scrollYRef.current, size, 0, Math.PI * 2);
        context.fill();
      });

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    setIsDrawing(true);
    const point = getPointFromEvent(e);
    lastPointRef.current = point;
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const newPoint = getPointFromEvent(e);
    const newLine: Line = {
      start: lastPointRef.current!,
      end: newPoint,
      hue,
      timestamp: Date.now(),
    };
    linesRef.current.push(newLine);

    // Create new sparkles
    for (let i = 0; i < 5; i++) {
      const sparkle: Sparkle = {
        x: newPoint.x + (Math.random() - 0.5) * 30,
        y: newPoint.y + (Math.random() - 0.5) * 30,
        size: Math.random() * 4 + 2,
        hue: (hue + Math.random() * 60 - 30 + 360) % 360,
        timestamp: Date.now(),
      };
      sparklesRef.current.push(sparkle);
    }

    setHue((prevHue) => (prevHue + 1) % 360);
    lastPointRef.current = newPoint;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const getPointFromEvent = (
      e: MouseEvent | TouchEvent,
  ): { x: number; y: number } => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    if ("touches" in e && e.touches[0]) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top + scrollYRef.current,
      };
    } else {
      const mouseEvent = e as MouseEvent;
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top + scrollYRef.current,
      };
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) =>
      startDrawing(e.nativeEvent as MouseEvent | TouchEvent);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) =>
      draw(e.nativeEvent as MouseEvent | TouchEvent);
  const handleMouseUp = () => stopDrawing();
  const handleMouseOut = () => stopDrawing();
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) =>
      startDrawing(e.nativeEvent as MouseEvent | TouchEvent);
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) =>
      draw(e.nativeEvent as MouseEvent | TouchEvent);
  const handleTouchEnd = () => stopDrawing();

  return (
      <canvas
          ref={canvasRef}
          className="pointer-events-auto fixed inset-0 z-[1] h-full w-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
      />
  );
};

export default CanvasDrawing;