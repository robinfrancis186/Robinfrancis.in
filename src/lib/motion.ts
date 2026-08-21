/**
 * Shared scroll-reveal settings.
 *
 * The previous per-component settings used a negative viewport margin, which
 * shrinks the detection box and makes an element reveal only once it is well
 * inside the viewport. Combined with lazy section mounting that read as a blank
 * page for a second or two at normal scroll speed.
 *
 * These settings do the opposite: start the reveal before the element scrolls
 * in, trigger on the first sliver of it, and never hide it again.
 */
export const revealViewport = {
  once: true,
  amount: 0.05,
  /* Expand the bottom edge so the reveal begins ahead of the scroll. */
  margin: "0px 0px 220px 0px",
} as const;

/** Short enough that the content is readable almost immediately. */
export const revealTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
} as const;

/** Small offsets; large ones re-introduce the "content is missing" feeling. */
export const revealFrom = {
  up: { opacity: 0, y: 12 },
  left: { opacity: 0, x: -12 },
} as const;

export const revealTo = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
} as const;
