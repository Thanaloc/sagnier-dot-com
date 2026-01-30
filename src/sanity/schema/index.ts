import { type SchemaTypeDefinition } from "sanity";
import { photo } from "./photo";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, siteSettings],
};
