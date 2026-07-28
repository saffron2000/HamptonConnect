import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Copy, Linkedin } from "lucide-react";
import type { BlogPost as BlogPostType } from "@shared/blog";
import { PortableText } from "@/components/blog/portable-text";
import { PostCard, formatDate } from "@/components/blog/post-card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useToast } from "@/hooks/use-toast";

export default function BlogPost({ preview = false }: { preview?: boolean }) {
  const params = useParams<{ slug?: string; id?: string }>(); const { toast } = useToast();
  const secret = new URLSearchParams(location.search).get("secret") || "";
  const url = preview ? `/api/blog/preview/${encodeURIComponent(params.id || "")}?secret=${encodeURIComponent(secret)}` : `/api/blog/posts/${encodeURIComponent(params.slug || "")}`;
  const { data: post, isLoading, isError } = useQuery<BlogPostType>({ queryKey: [url], retry: false });
  const canonical = post?.canonicalUrl || `${location.origin}/blog/${post?.slug || params.slug || ""}`;
  usePageMeta({ title: post?.seoTitle || (post ? `${post.title} | CFC` : "Article | CFC"), description: post?.metaDescription || post?.excerpt || "Columbia Founders Insights", canonical, image: post?.socialImage || post?.featuredImage?.url, type: "article", noindex: preview, publishedAt: post?.publishedAt, modifiedAt: post?._updatedAt, author: post?.author.name });
  const { data: all = [] } = useQuery<BlogPostType[]>({ queryKey: ["/api/blog/posts"], enabled: Boolean(post) && !preview });
  if (isLoading) return <div className="mx-auto max-w-3xl px-4 py-24" role="status">Loading article…</div>;
  if (isError || !post) return <div className="mx-auto max-w-3xl px-4 py-24"><h1 className="text-4xl font-bold text-navy-blue">Article not found</h1><p className="mt-4">This article may be unpublished or the link may be incorrect.</p><Link href="/blog" className="mt-6 inline-block font-semibold text-navy-blue underline">Back to all articles</Link></div>;
  const related = all.filter(item => item._id !== post._id && item.categories.some(category => post.categories.includes(category))).slice(0, 3);
  const structured = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, image: post.featuredImage?.url, datePublished: post.publishedAt, dateModified: post._updatedAt, author: { "@type": "Person", name: post.author.name }, mainEntityOfPage: canonical };
  return <article>{preview && <div className="bg-amber-100 px-4 py-3 text-center font-semibold text-amber-950" role="status">Draft preview — this page is not public or indexed.</div>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <header className="mx-auto max-w-4xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">{post.eyebrow && <p className="text-xs font-bold uppercase tracking-[.18em] text-navy-blue">{post.eyebrow}</p>}<h1 className="mt-4 text-4xl font-bold leading-tight text-navy-blue sm:text-5xl lg:text-6xl">{post.title}</h1><p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-700">{post.excerpt}</p><p className="mt-6 text-sm text-gray-600">By <strong>{post.author.name}</strong>{post.author.title && `, ${post.author.title}`} · {formatDate(post.publishedAt)} · {post.readingMinutes} min read</p></header>
    {post.featuredImage && <div className="mx-auto max-w-6xl px-4 sm:px-6"><img src={post.featuredImage.url} alt={post.featuredImage.alt} width={post.featuredImage.width || 1600} height={post.featuredImage.height || 900} className="aspect-[16/9] w-full rounded-xl object-cover" /></div>}
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16"><PortableText value={post.body} />
      <div className="mt-12 flex items-center gap-3 border-y py-5"><span className="mr-2 text-sm font-semibold">Share</span><button onClick={async () => { await navigator.clipboard.writeText(canonical); toast({ title: "Link copied" }); }} aria-label="Copy article link" className="rounded-md border p-2 text-navy-blue hover:bg-columbia-blue focus-visible:ring-2 focus-visible:ring-navy-blue"><Copy className="h-5 w-5" /></button><a aria-label="Share on LinkedIn" className="rounded-md border p-2 text-navy-blue hover:bg-columbia-blue focus-visible:ring-2 focus-visible:ring-navy-blue" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a></div>
      {post.author.bio && <aside className="mt-12 flex gap-5 rounded-xl bg-columbia-blue/40 p-6">{post.author.headshot && <img src={post.author.headshot.url} alt={post.author.headshot.alt || ""} className="h-20 w-20 rounded-full object-cover" />}<div><h2 className="text-xl font-bold text-navy-blue">About {post.author.name}</h2><p className="mt-2 leading-relaxed text-gray-700">{post.author.bio}</p></div></aside>}
      <Link href="/blog" className="mt-10 inline-block font-semibold text-navy-blue underline underline-offset-4">← Back to all articles</Link>
    </div>
    {related.length > 0 && <section className="bg-light-gray py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-navy-blue">Related articles</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{related.map(item => <PostCard key={item._id} post={item} />)}</div></div></section>}
  </article>;
}
