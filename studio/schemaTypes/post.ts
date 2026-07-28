import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post", title: "Articles", type: "document",
  groups: [
    { name: "article", title: "Article", default: true },
    { name: "author", title: "Author" },
    { name: "publishing", title: "Publishing" },
    { name: "taxonomy", title: "Categories & tags" },
    { name: "seo", title: "SEO & sharing" },
  ],
  fields: [
    defineField({ name: "title", title: "Article title", type: "string", group: "article", validation: rule => rule.required().max(100).error("Add a title of no more than 100 characters.") }),
    defineField({ name: "slug", title: "URL slug", description: "Click Generate to create this from the title. Each article needs a unique slug.", type: "slug", group: "article", options: { source: "title", maxLength: 80, isUnique: (value, context) => context.defaultIsUnique(value, context) }, validation: rule => rule.required().error("Generate a URL slug before publishing.") }),
    defineField({ name: "eyebrow", title: "Eyebrow", description: "Optional short label shown above the headline.", type: "string", group: "article", validation: rule => rule.max(40).warning("Keep the eyebrow under 40 characters.") }),
    defineField({ name: "excerpt", title: "Excerpt", description: "A concise summary used on article cards and as the default SEO description.", type: "text", rows: 3, group: "article", validation: rule => rule.required().min(40).max(240).error("Write an excerpt between 40 and 240 characters.") }),
    defineField({ name: "featuredImage", title: "Featured image", type: "image", group: "article", options: { hotspot: true }, validation: rule => rule.required().error("Choose a featured image before publishing."), fields: [defineField({ name: "alt", title: "Alt text", description: "Describe the image for someone who cannot see it.", type: "string", validation: rule => rule.required().min(5).error("Add meaningful alt text of at least 5 characters.") })] }),
    defineField({ name: "body", title: "Article content", type: "array", group: "article", validation: rule => rule.required().min(1).error("Add article content before publishing."), of: [
      defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Quote", value: "blockquote" }], marks: { annotations: [{ name: "link", title: "Link", type: "object", fields: [{ name: "href", title: "URL", type: "url", validation: rule => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }).required().error("Enter a valid web, email, or site-relative link.") }] }] } }),
      defineArrayMember({ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string", validation: rule => rule.required().error("Describe this image for readers using assistive technology.") }, { name: "caption", title: "Caption", type: "string" }] }),
      defineArrayMember({ type: "object", name: "divider", title: "Divider", fields: [] }),
    ] }),
    defineField({ name: "author", title: "Author", description: "Select an existing author or create one here.", type: "reference", group: "author", to: [{ type: "author" }], validation: rule => rule.required().error("Select an author before publishing.") }),
    defineField({ name: "publishedAt", title: "Publication date and time", description: "Use the current time to publish now. A future time schedules when the article becomes public.", type: "datetime", group: "publishing", validation: rule => rule.required().error("Choose when this article should become public.") }),
    defineField({ name: "featured", title: "Feature on blog landing page", type: "boolean", group: "publishing", initialValue: false }),
    defineField({ name: "readingMinutes", title: "Reading time override (minutes)", description: "Optional. Leave blank to calculate reading time automatically.", type: "number", group: "publishing", validation: rule => rule.integer().positive().error("Use a whole number greater than zero.") }),
    defineField({ name: "categories", title: "Categories", description: "Select existing categories or create one here.", type: "array", group: "taxonomy", of: [{ type: "reference", to: [{ type: "category" }] }] }),
    defineField({ name: "tags", title: "Tags", type: "array", group: "taxonomy", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "seoTitle", title: "SEO title", description: "Optional. The article title is used when blank.", type: "string", group: "seo", validation: rule => rule.max(60).warning("Search results may truncate titles longer than 60 characters.") }),
    defineField({ name: "metaDescription", title: "Meta description", description: "Optional. The excerpt is used when blank.", type: "text", rows: 3, group: "seo", validation: rule => rule.max(160).warning("Search results may truncate descriptions longer than 160 characters.") }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", description: "Optional. Leave blank to use this article's Columbia Founders URL.", type: "url", group: "seo" }),
    defineField({ name: "socialImage", title: "Social-sharing image", description: "Optional. The featured image is used when blank.", type: "image", group: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "author.name", media: "featuredImage" } },
});
