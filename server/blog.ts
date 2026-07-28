import type { BlogPost } from "@shared/blog";

const apiVersion = "2025-02-19";
const getProjectId = () => process.env.SANITY_PROJECT_ID;
const getDataset = () => process.env.SANITY_DATASET || "production";

const projection = `{_id,title,"slug":slug.current,eyebrow,excerpt,"featuredImage":featuredImage{alt,"url":asset->url,"width":asset->metadata.dimensions.width,"height":asset->metadata.dimensions.height},"author":author->{name,title,bio,"headshot":headshot{"url":asset->url,alt}},"body":body[]{...,asset->{url,metadata}},publishedAt,_updatedAt,"readingMinutes":coalesce(readingMinutes,round(length(pt::text(body))/1200)+1),featured,"categories":coalesce(categories[]->title,[]),"tags":coalesce(tags,[]),seoTitle,metaDescription,canonicalUrl,"socialImage":socialImage.asset->url}`;

export const blogConfigured = () => Boolean(getProjectId());

async function querySanity<T>(query: string, params: Record<string, string> = {}, token?: string): Promise<T> {
  const projectId = getProjectId();
  if (!projectId) return [] as T;
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${getDataset()}`);
  url.searchParams.set("query", query);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(`$${key}`, JSON.stringify(value)));
  if (token) url.searchParams.set("perspective", "previewDrafts");
  const response = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
  if (!response.ok) throw new Error(`Sanity request failed (${response.status})`);
  const data = await response.json() as { result: T };
  return data.result;
}

const published = `_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;
function normalizePost(post: Partial<BlogPost> | null): BlogPost | null {
  if (!post || typeof post.title !== "string" || typeof post.slug !== "string") return null;
  const body = Array.isArray(post.body) ? post.body : [];
  const words = body.flatMap(block => block.children || []).map(child => child.text || "").join(" ").trim().split(/\s+/).filter(Boolean).length;
  const featuredImage = post.featuredImage?.url && post.featuredImage.alt ? post.featuredImage : undefined;
  return {
    _id: String(post._id || ""), title: post.title, slug: post.slug,
    excerpt: typeof post.excerpt === "string" ? post.excerpt : "",
    eyebrow: typeof post.eyebrow === "string" ? post.eyebrow : undefined,
    featuredImage, author: post.author?.name ? post.author : { name: "Columbia Founder Community" }, body,
    publishedAt: post.publishedAt || "", _updatedAt: post._updatedAt || post.publishedAt || "",
    readingMinutes: Number.isFinite(post.readingMinutes) && Number(post.readingMinutes) > 0 ? Math.ceil(Number(post.readingMinutes)) : Math.max(1, Math.ceil(words / 200)),
    featured: Boolean(post.featured), categories: Array.isArray(post.categories) ? post.categories.filter(item => typeof item === "string") : [],
    tags: Array.isArray(post.tags) ? post.tags.filter(item => typeof item === "string") : [],
    seoTitle: post.seoTitle, metaDescription: post.metaDescription, canonicalUrl: post.canonicalUrl, socialImage: post.socialImage,
  };
}
function isCurrentlyPublic(post: BlogPost): boolean {
  return Boolean(post.slug && post.publishedAt && !post._id.startsWith("drafts.") && !Number.isNaN(Date.parse(post.publishedAt)) && Date.parse(post.publishedAt) <= Date.now());
}
export function getPublishedPosts(): Promise<BlogPost[]> {
  return querySanity<Partial<BlogPost>[]>(`*[${published} && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) ${projection}`).then(posts => posts.map(normalizePost).filter((post): post is BlogPost => Boolean(post) && isCurrentlyPublic(post!)));
}
export function getPublishedPost(slug: string): Promise<BlogPost | null> {
  return querySanity<Partial<BlogPost> | null>(`*[${published} && !(_id in path("drafts.**")) && slug.current == $slug][0] ${projection}`, { slug }).then(post => { const normalized = normalizePost(post); return normalized && isCurrentlyPublic(normalized) ? normalized : null; });
}
export function getPreviewPost(id: string): Promise<BlogPost | null> {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) throw new Error("Preview token is not configured");
  return querySanity<Partial<BlogPost> | null>(`*[_type == "post" && (_id == $id || _id == "drafts." + $id)][0] ${projection}`, { id: id.replace(/^drafts\./, "") }, token).then(normalizePost);
}

export const __testing = { normalizePost, isCurrentlyPublic };
