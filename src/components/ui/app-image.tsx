import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type AppImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  aspectRatio?: string;
  containerClassName?: string;
  rounded?: boolean;
  zoomOnHover?: boolean;
};

/** Server-friendly image wrapper — no client hydration cost. */
export function AppImage({
  alt,
  className,
  containerClassName,
  aspectRatio,
  rounded = true,
  zoomOnHover = false,
  fill,
  loading,
  priority,
  quality = 75,
  ...props
}: AppImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        rounded && "rounded-2xl",
        aspectRatio,
        containerClassName,
      )}
    >
      <Image
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? undefined : (loading ?? "lazy")}
        quality={quality}
        className={cn(
          "object-cover",
          zoomOnHover && "transition duration-500 group-hover:scale-105",
          className,
        )}
        sizes={props.sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        {...props}
      />
    </div>
  );
}
