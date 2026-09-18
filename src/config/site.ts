const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000");

export const siteName = "Ruben Sagnier Photographie";

export const defaultDescription =
  "Photographie de surf, océan et paysages. Capturer l'instant, sublimer la vague.";
