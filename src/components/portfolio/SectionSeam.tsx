/**
 * SectionSeam — understated boundary between portfolio chapters.
 *
 * Replaces the former hard `border-t` rule with a soft, atmosphere-lit seam:
 * a faint amber glow plus a hairline that dissolves at both edges. The page's
 * sections share one dark environment, so the seam reads as a change in light,
 * not a change in surface.
 *
 * Pure CSS and static — no animation, so it needs no prefers-reduced-motion
 * handling, and it costs nothing at runtime. It is anchored to the top of a
 * `relative` section and sized to live inside the section's existing top
 * padding, so it adds zero layout height.
 */
export default function SectionSeam({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 overflow-hidden ${
        compact ? 'h-12' : 'h-24 md:h-28'
      }`}
    >
      {/* Ambient glow — felt, not noticed */}
      <div
        className={`absolute inset-x-[7.5%] top-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.055),transparent_72%)] ${
          compact ? 'h-12' : 'h-full'
        }`}
      />
      {/* Hairline that dissolves at both edges */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/25 to-transparent" />
    </div>
  );
}
