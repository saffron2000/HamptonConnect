import { defineField, defineType } from "sanity";
export const author = defineType({ name: "author", title: "Authors", type: "document", fields: [
  defineField({ name: "name", title: "Name", type: "string", validation: rule => rule.required() }),
  defineField({ name: "title", title: "Title", type: "string" }), defineField({ name: "bio", title: "Short biography", type: "text", rows: 4 }),
  defineField({ name: "headshot", title: "Headshot", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] })
] });
