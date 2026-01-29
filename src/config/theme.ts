export const colors = {
  background: "#0B3C5D",
  titles: "#0E0E0E",
  body: "#0B3C5D",
  cta: "#E46A2E",
  hover: "#1E88A8",
  detail: "#C9A66B",
  white: "#FAFAFA",
  overlay: "rgba(11, 60, 93, 0.7)",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const tidal = [0.25, 0.1, 0.25, 1] as const;
const drift = [0.4, 0, 0.2, 1] as const;

export const transitions = {
  page: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 1, ease: tidal },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: tidal },
    },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.4, ease: drift },
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: tidal },
    },
  },
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: drift },
    },
  },
  parallaxReveal: {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.6, ease: tidal },
    },
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "A propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
