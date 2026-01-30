import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Photo d'accueil (Hero)",
      type: "image",
      description: "La grande photo de fond sur la page d'accueil, derrière \"Ruben Sagnier\"",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre accueil",
      type: "string",
      description: "Le texte sous \"Ruben Sagnier\" sur la page d'accueil",
      initialValue: "Capturer l'instant, sublimer la vague",
    }),
    defineField({
      name: "aboutPortrait",
      title: "Portrait (page A propos)",
      type: "image",
      description: "La photo portrait affichée sur la page A propos",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutTexts",
      title: "Textes A propos",
      type: "array",
      description: "Les paragraphes de la page A propos (le premier est mis en avant)",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "contactBackground",
      title: "Photo de fond (page Contact)",
      type: "image",
      description: "La photo de fond en filigrane sur la page Contact",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Paramètres du site" };
    },
  },
});
