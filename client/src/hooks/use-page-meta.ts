import { useEffect } from "react";

type Meta = { title: string; description: string; canonical: string; image?: string; type?: string; noindex?: boolean; publishedAt?: string; modifiedAt?: string; author?: string };
export function usePageMeta(meta: Meta) {
  useEffect(() => {
    document.title = meta.title;
    const upsert = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) { element = document.createElement(attributes.rel ? "link" : "meta"); document.head.appendChild(element); }
      Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
    };
    upsert('meta[name="description"]', { name: "description", content: meta.description });
    upsert('link[rel="canonical"]', { rel: "canonical", href: meta.canonical });
    [["og:title", meta.title], ["og:description", meta.description], ["og:url", meta.canonical], ["og:type", meta.type || "website"], ["og:image", meta.image || `${location.origin}/cfc-logo.jpg`]].forEach(([property, content]) => upsert(`meta[property="${property}"]`, { property, content }));
    upsert('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    const optional = (selector: string, attributes: Record<string, string>, value?: string) => value ? upsert(selector, attributes) : document.head.querySelector(selector)?.remove();
    optional('meta[property="article:published_time"]', { property: "article:published_time", content: meta.publishedAt || "" }, meta.publishedAt);
    optional('meta[property="article:modified_time"]', { property: "article:modified_time", content: meta.modifiedAt || "" }, meta.modifiedAt);
    optional('meta[property="article:author"]', { property: "article:author", content: meta.author || "" }, meta.author);
    if (meta.noindex) upsert('meta[name="robots"]', { name: "robots", content: "noindex, nofollow" });
    return () => { if (meta.noindex) document.head.querySelector('meta[name="robots"]')?.remove(); };
  }, [meta.title, meta.description, meta.canonical, meta.image, meta.type, meta.noindex, meta.publishedAt, meta.modifiedAt, meta.author]);
}
