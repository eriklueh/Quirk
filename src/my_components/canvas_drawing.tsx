"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAchievements } from "~/my_components/achievement/achievement";

interface Line {
  start: { x: number; y: number };
  end: { x: number; y: number };
  hue: number;
  timestamp: number;
}

interface CanvasDrawingProps {
  onDraw: () => void;
}

const MINIMUM_DRAW_DISTANCE = 100; // pixels

const CanvasDrawing: React.FC<CanvasDrawingProps> = ({ onDraw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hue, setHue] = useState(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const linesRef = useRef<Line[]>([]);
  const scrollYRef = useRef(0);
  const hasDrawnRef = useRef(false);
  const totalDistanceRef = useRef(0);
  const { unlockAchievement } = useAchievements();

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

      linesRef.current = linesRef.current.filter(
          (line) => currentTime - line.timestamp < 800
      );

      linesRef.current.forEach((line) => {
        const timePassed = currentTime - line.timestamp;
        const opacity = Math.max(0, 1 - timePassed / 5000);

        context.beginPath();
        context.strokeStyle = `hsla(${line.hue}, 100%, 50%, ${opacity})`;
        context.moveTo(line.start.x, line.start.y - scrollYRef.current);
        context.lineTo(line.end.x, line.end.y - scrollYRef.current);
        context.stroke();

        context.shadowColor = `hsla(${line.hue}, 100%, 50%, ${opacity * 0.5})`;
        context.shadowBlur = 10;
        context.stroke();
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
      });

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getPointFromEvent = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    if ('touches' in e && e.touches[0]) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top + scrollYRef.current,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + scrollYRef.current,
      };
    }
    return { x: 0, y: 0 };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getPointFromEvent(e);
    lastPointRef.current = point;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const newPoint = getPointFromEvent(e);
    const newLine: Line = {
      start: lastPointRef.current!,
      end: newPoint,
      hue,
      timestamp: Date.now(),
    };
    linesRef.current.push(newLine);

    // Calculate distance
    const distance = Math.sqrt(
        Math.pow(newPoint.x - lastPointRef.current!.x, 2) +
        Math.pow(newPoint.y - lastPointRef.current!.y, 2)
    );
    totalDistanceRef.current += distance;

    // Check if the minimum distance has been reached
    if (totalDistanceRef.current >= MINIMUM_DRAW_DISTANCE && !hasDrawnRef.current) {
      hasDrawnRef.current = true;
      unlockAchievement('art_lover');
      onDraw();
    }

    setHue((prevHue) => (prevHue + 1) % 360);
    lastPointRef.current = newPoint;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  return (
      <canvas
          ref={canvasRef}
          className="z-5 pointer-events-auto fixed inset-0 h-full w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
      />
  );
};

export default CanvasDrawing;

