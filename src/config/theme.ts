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

export const transitions = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "A propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
