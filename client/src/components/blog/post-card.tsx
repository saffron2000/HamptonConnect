import { Link } from "wouter";
import type { BlogPost } from "@shared/blog";

export const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
export function PostCard({ post }: { post: BlogPost }) {
  return <article className="group flex h-full flex-col">
    <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg bg-light-gray focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-columbia-blue">
      {post.featuredImage ? <img src={post.featuredImage.url} alt={post.featuredImage.alt} width={post.featuredImage.width || 1200} height={post.featuredImage.height || 675} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" /> : <div className="aspect-[16/10] bg-columbia-blue" aria-hidden="true" />}
    </Link>
    <div className="flex flex-1 flex-col pt-5">
      {post.eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-navy-blue">{post.eyebrow}</p>}
      <h2 className="text-2xl font-bold leading-tight text-navy-blue"><Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-blue">{post.title}</Link></h2>
      <p className="mt-3 flex-1 leading-relaxed text-gray-700">{post.excerpt}</p>
      <p className="mt-5 text-sm text-gray-600">By {post.author.name} <span aria-hidden="true">·</span> {formatDate(post.publishedAt)} <span aria-hidden="true">·</span> {post.readingMinutes} min read</p>
    </div>
  </article>;
}
