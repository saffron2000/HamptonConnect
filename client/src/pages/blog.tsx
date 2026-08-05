import { FormEvent, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost } from "@shared/blog";
import { PostCard, formatDate } from "@/components/blog/post-card";
import { usePageMeta } from "@/hooks/use-page-meta";

const pageSize = 6;

export default function Blog() {
  const [category, setCategory] = useState(() => new URLSearchParams(location.search).get("category") || "All");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [subscribed, setSubscribed] = useState(false);
  const { data: posts = [], isLoading, isError } = useQuery<BlogPost[]>({ queryKey: ["/api/blog/posts"] });
  usePageMeta({ title: "Columbia Founders Insights | CFC", description: "Practical insights from founders, operators, investors, and members of the Columbia community.", canonical: `${location.origin}/blog` });
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.flatMap(post => post.categories))).sort()], [posts]);
  const featured = posts.find(post => post.featured) || posts[0];
  const visible = posts.filter(post => post._id !== featured?._id && (category === "All" || post.categories.includes(category)));
  const paged = visible.slice(0, visibleCount);
  const choose = (value: string) => { setCategory(value); setVisibleCount(pageSize); history.pushState({}, "", value === "All" ? "/blog" : `/blog?category=${encodeURIComponent(value)}`); };
  const subscribe = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubscribed(true); };
  return <div className="bg-white">
    <header className="border-b bg-columbia-blue/40 py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[.18em] text-navy-blue">Columbia Founders Insights</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-navy-blue sm:text-5xl lg:text-6xl">Ideas, experience, and perspective from our founder community.</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">Practical insights from founders, operators, investors, and members of the Columbia community.</p>
    </div></header>
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section aria-labelledby="newsletter-heading" className="rounded-2xl bg-navy-blue px-6 py-8 text-white shadow-lg sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-columbia-blue">Newsletter</p><h2 id="newsletter-heading" className="mt-3 text-3xl font-bold">Founder insights in your inbox</h2><p className="mt-3 text-blue-100">Get new Columbia Founders articles and community perspectives as they are published.</p></div>
        <form className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0" onSubmit={subscribe}>
          <label className="sr-only" htmlFor="blog-newsletter-email">Email address</label>
          <input id="blog-newsletter-email" name="email" type="email" required placeholder="Email address" className="min-w-0 rounded-md border border-white/20 px-4 py-3 text-navy-blue shadow-sm focus:outline-none focus:ring-2 focus:ring-columbia-blue sm:w-80" />
          <button type="submit" className="rounded-md bg-white px-6 py-3 font-semibold text-navy-blue transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-columbia-blue">Sign Up</button>
        </form>
        {subscribed && <p className="mt-4 text-sm font-semibold text-columbia-blue lg:absolute lg:mt-24">Thanks for signing up.</p>}
      </section>
    </div>
    <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      {isLoading && <p role="status">Loading articles…</p>}
      {isError && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6"><h2 className="text-xl font-bold">Articles are temporarily unavailable.</h2><p className="mt-2">Please try again shortly.</p></div>}
      {!isLoading && !isError && !featured && <section className="rounded-xl border bg-light-gray px-6 py-16 text-center"><h2 className="text-3xl font-bold text-navy-blue">Stories are on the way.</h2><p className="mx-auto mt-3 max-w-xl text-gray-700">The Columbia founder community is preparing practical ideas and perspectives to share here.</p></section>}
      {featured && <section aria-labelledby="featured-heading"><p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-navy-blue">Featured article</p><article className="grid items-center gap-8 border-b pb-16 lg:grid-cols-2 lg:gap-14">
        <Link href={`/blog/${featured.slug}`} className="overflow-hidden rounded-xl focus-visible:ring-4 focus-visible:ring-columbia-blue">{featured.featuredImage ? <img src={featured.featuredImage.url} alt={featured.featuredImage.alt} width={featured.featuredImage.width || 1200} height={featured.featuredImage.height || 675} className="aspect-[16/10] w-full object-cover" /> : <div className="aspect-[16/10] bg-columbia-blue" />}</Link>
        <div>{(featured.categories[0] || featured.tags[0] || featured.eyebrow) && <p className="text-xs font-bold uppercase tracking-[.16em] text-navy-blue">{featured.categories[0] || featured.tags[0] || featured.eyebrow}</p>}<h2 id="featured-heading" className="mt-3 text-3xl font-bold leading-tight text-navy-blue sm:text-4xl">{featured.title}</h2><p className="mt-5 text-lg leading-relaxed text-gray-700">{featured.excerpt}</p><p className="mt-5 text-sm text-gray-600">By {featured.author.name} · {formatDate(featured.publishedAt)} · {featured.readingMinutes} min read</p><Link href={`/blog/${featured.slug}`} className="mt-7 inline-flex font-semibold text-navy-blue underline decoration-2 underline-offset-4 hover:no-underline focus-visible:ring-2 focus-visible:ring-navy-blue">Read More <span className="sr-only">: {featured.title}</span> →</Link></div>
      </article></section>}
      {posts.length > 1 && <section className="pt-14" aria-labelledby="latest-heading"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><h2 id="latest-heading" className="text-3xl font-bold text-navy-blue">Latest insights</h2>{categories.length > 2 && <label className="text-sm font-semibold text-gray-700">Filter by category <select className="ml-2 rounded-md border bg-white px-3 py-2 focus:ring-2 focus:ring-navy-blue" value={category} onChange={event => choose(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>}</div>
        {visible.length ? <><div className="mt-9 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{paged.map(post => <PostCard key={post._id} post={post} />)}</div>{visible.length > visibleCount && <div className="mt-12 text-center"><button type="button" onClick={() => setVisibleCount(count => count + pageSize)} className="rounded-md border border-navy-blue px-6 py-3 font-semibold text-navy-blue transition-colors hover:bg-columbia-blue focus:outline-none focus:ring-2 focus:ring-navy-blue">Load More</button></div>}</> : <p className="mt-10 rounded-lg bg-light-gray p-8 text-center text-gray-700">No other articles match this category yet.</p>}
      </section>}
    </div>
  </div>;
}
