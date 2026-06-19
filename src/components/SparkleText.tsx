"use client";

import { useRef, useEffect, useCallback } from "react";

const SPARKLE_URL =
  "https://lottie.host/aa8461b8-0395-40aa-9916-3aa8737d127d/wgZlYJ42zU.lottie";

interface SparkleTextProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  className?: string;
}

export default function SparkleText({
  children,
  autoPlay = false,
  className = "",
}: SparkleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { DotLottie } = await import("@lottiefiles/dotlottie-web");
      if (cancelled || !canvasRef.current) return;

      playerRef.current = new DotLottie({
        canvas: canvasRef.current,
        loop: true,
        autoplay: autoPlay,
        src: SPARKLE_URL,
      });
    }

    init();

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [autoPlay]);

  const handleMouseEnter = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!autoPlay) playerRef.current?.pause();
  }, [autoPlay]);

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block", cursor: "default" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          height: 240,
          pointerEvents: "none",
          zIndex: 2,
          filter: "drop-shadow(0 0 6px #FFD36B88)",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}