import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
export default defineConfig({ name: "default", title: "Columbia Founders Editorial", projectId, dataset, plugins: [structureTool()], schema: { types: schemaTypes },
  document: { productionUrl: async (previous, { document }) => {
    if (document._type !== "post") return previous;
    const site = (process.env.SANITY_STUDIO_SITE_URL || "http://localhost:5000").replace(/\/$/, "");
    return `${site}/blog/preview/${document._id.replace(/^drafts\./, "")}?secret=${encodeURIComponent(process.env.SANITY_STUDIO_PREVIEW_SECRET || "")}`;
  }}
});
