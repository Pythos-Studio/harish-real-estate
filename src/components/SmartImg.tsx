import { useState, type CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
}

/** Image with lazy loading and an elegant gradient fallback if the photo fails to load. */
export default function SmartImg({ src, alt, className = "", eager = false, style }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-ink via-charcoal to-bronze/60 ${className}`}
        style={style}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
