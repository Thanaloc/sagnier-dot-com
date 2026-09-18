/**
 * Shared layout spacing scale.
 *
 * Every constant must stay a complete, literal Tailwind class string. The
 * Tailwind 4 scanner reads source files as plain text: a class assembled by
 * concatenation or a template literal is never emitted.
 */

/** Horizontal gutter for every page wrapper. */
export const pageGutter = "px-8 md:px-16 lg:px-24";

/** Top padding clearing the fixed navigation. */
export const pageTop = "pt-32 md:pt-40";

/** Bottom padding closing a page before the footer. */
export const pageBottom = "pb-24 md:pb-32";

/**
 * Full page envelope: gutter plus vertical rhythm.
 *
 * Spelled out rather than composed from the three constants above, for the
 * same scanner reason. Keep it in sync with them by hand.
 */
export const pageShell = "px-8 md:px-16 lg:px-24 pt-32 md:pt-40 pb-24 md:pb-32";

/** Gutter for full-bleed sections, where images carry the layout. */
export const bleedGutter = "px-4";

/** Breathing room between the main content and the footer. */
export const mainBottom = "pb-16 md:pb-24";
