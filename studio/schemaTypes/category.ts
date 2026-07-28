import { defineField, defineType } from "sanity";
export const category = defineType({ name: "category", title: "Categories", type: "document", fields: [defineField({ name: "title", title: "Title", type: "string", validation: rule => rule.required() })] });
