import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { BlogPost, PortableTextBlock } from "@shared/blog";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const blogDir = path.join(rootDir, "content", "blog");

type Frontmatter = Record<string, string | string[] | boolean | number>;

function slugFromFilename(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

function parseFrontmatter(markdown: string): { frontmatter: Frontmatter; content: string } {
  if (!markdown.startsWith("---\n")) return { frontmatter: {}, content: markdown.trim() };
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: {}, content: markdown.trim() };
  const frontmatter = markdown.slice(4, end).split("\n").reduce<Frontmatter>((data, line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return data;
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    if (!key) return data;
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue.slice(1, -1).split(",").map(item => item.trim().replace(/^['\"]|['\"]$/g, "")).filter(Boolean);
    } else if (rawValue === "true" || rawValue === "false") {
      data[key] = rawValue === "true";
    } else if (/^\d+(\.\d+)?$/.test(rawValue)) {
      data[key] = Number(rawValue);
    } else {
      data[key] = rawValue.replace(/^['\"]|['\"]$/g, "");
    }
    return data;
  }, {});
  return { frontmatter, content: markdown.slice(end + 4).trim() };
}

function textBlock(text: string, style = "normal", listItem?: "bullet" | "number", index = 0): PortableTextBlock {
  return { _key: `block-${index}`, _type: "block", style, listItem, level: listItem ? 1 : undefined, markDefs: [], children: [{ _type: "span", text, marks: [] }] };
}

function markdownToPortableText(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  let paragraph: string[] = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(textBlock(paragraph.join(" "), "normal", undefined, blocks.length));
    paragraph = [];
  };
  markdown.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); return; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) { flushParagraph(); blocks.push(textBlock(heading[2], `h${heading[1].length}`, undefined, blocks.length)); return; }
    const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
    if (bullet) { flushParagraph(); blocks.push(textBlock(bullet[1], "normal", "bullet", blocks.length)); return; }
    const numbered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (numbered) { flushParagraph(); blocks.push(textBlock(numbered[1], "normal", "number", blocks.length)); return; }
    paragraph.push(trimmed);
  });
  flushParagraph();
  return blocks;
}

function frontmatterString(value: Frontmatter, key: string): string | undefined {
  const item = value[key];
  return typeof item === "string" ? item : undefined;
}

function frontmatterList(value: Frontmatter, key: string): string[] {
  const item = value[key];
  return Array.isArray(item) ? item.filter(entry => typeof entry === "string") : [];
}

function normalizeMarkdownPost(filePath: string, markdown: string): BlogPost | null {
  const { frontmatter, content } = parseFrontmatter(markdown);
  const title = frontmatterString(frontmatter, "title");
  const publishedAt = frontmatterString(frontmatter, "publishedAt");
  if (!title || !publishedAt) return null;
  const slug = frontmatterString(frontmatter, "slug") || slugFromFilename(filePath);
  const body = markdownToPortableText(content);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const authorName = frontmatterString(frontmatter, "author") || "Columbia Founder Community";
  const featuredImageUrl = frontmatterString(frontmatter, "featuredImage");
  const featuredImageAlt = frontmatterString(frontmatter, "featuredImageAlt") || title;
  return {
    _id: `markdown-${slug}`,
    title,
    slug,
    excerpt: frontmatterString(frontmatter, "excerpt") || "",
    eyebrow: frontmatterString(frontmatter, "eyebrow"),
    featuredImage: featuredImageUrl ? { url: featuredImageUrl, alt: featuredImageAlt } : undefined,
    author: { name: authorName, title: frontmatterString(frontmatter, "authorTitle"), bio: frontmatterString(frontmatter, "authorBio") },
    body,
    publishedAt,
    _updatedAt: frontmatterString(frontmatter, "updatedAt") || publishedAt,
    readingMinutes: typeof frontmatter.readingMinutes === "number" ? Math.ceil(frontmatter.readingMinutes) : Math.max(1, Math.ceil(words / 200)),
    featured: frontmatter.featured === true,
    categories: frontmatterList(frontmatter, "categories"),
    tags: frontmatterList(frontmatter, "tags"),
    seoTitle: frontmatterString(frontmatter, "seoTitle"),
    metaDescription: frontmatterString(frontmatter, "metaDescription"),
    canonicalUrl: frontmatterString(frontmatter, "canonicalUrl"),
    socialImage: frontmatterString(frontmatter, "socialImage"),
  };
}

async function readMarkdownPosts(): Promise<BlogPost[]> {
  const entries = await readdir(blogDir, { withFileTypes: true });
  const files = entries.filter(entry => entry.isFile() && entry.name.endsWith(".md") && entry.name.toLowerCase() !== "readme.md").map(entry => entry.name);
  const posts = await Promise.all(files.map(async file => normalizeMarkdownPost(path.join(blogDir, file), await readFile(path.join(blogDir, file), "utf8"))));
  return posts.filter((post): post is BlogPost => Boolean(post) && isCurrentlyPublic(post!)).sort((a, b) => Number(b.featured) - Number(a.featured) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export const blogConfigured = () => true;

function isCurrentlyPublic(post: BlogPost): boolean {
  return Boolean(post.slug && post.publishedAt && !post._id.startsWith("drafts.") && !Number.isNaN(Date.parse(post.publishedAt)) && Date.parse(post.publishedAt) <= Date.now());
}

export function getPublishedPosts(): Promise<BlogPost[]> {
  return readMarkdownPosts();
}
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  return (await readMarkdownPosts()).find(post => post.slug === slug) || null;
}
export function getPreviewPost(_id: string): Promise<BlogPost | null> {
  throw new Error("Preview is not available for Markdown blog posts");
}

export const __testing = { parseFrontmatter, markdownToPortableText, normalizeMarkdownPost, isCurrentlyPublic };
