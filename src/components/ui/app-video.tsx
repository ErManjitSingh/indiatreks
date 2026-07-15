"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AppVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  ariaLabel?: string;
}

/** Loads media only when in viewport — never autoplays heavy MP4 on paint. */
export function AppVideo({
  src,
  poster,
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
  ariaLabel = "Video content",
}: AppVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-2xl bg-dark", className)}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- lightweight poster before video mounts
        <img
          src={poster}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition",
            ready && "opacity-0",
          )}
          loading="lazy"
          decoding="async"
        />
      ) : !ready ? (
        <div className="absolute inset-0 skeleton" aria-hidden />
      ) : null}

      {visible ? (
        <video
          className={cn(
            "h-full w-full object-cover transition duration-500",
            ready ? "opacity-100" : "opacity-0",
          )}
          src={src}
          poster={poster}
          autoPlay={autoPlay && visible}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          preload="none"
          aria-label={ariaLabel}
          onLoadedData={() => setReady(true)}
        />
      ) : null}
    </div>
  );
}
