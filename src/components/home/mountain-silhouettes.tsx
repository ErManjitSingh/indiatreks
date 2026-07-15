export function MountainSilhouettes() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 overflow-hidden sm:h-32 md:h-44"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-[-5%] w-[70%] text-dark/50"
        viewBox="0 0 800 220"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0 220 L120 90 L210 150 L320 40 L430 130 L520 70 L650 160 L800 50 L800 220 Z" />
      </svg>
      <svg
        className="absolute bottom-0 right-[-8%] w-[75%] text-forest-dark/65"
        viewBox="0 0 800 220"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0 220 L90 130 L180 170 L300 60 L410 140 L550 30 L680 120 L800 80 L800 220 Z" />
      </svg>
    </div>
  );
}
