export type PortableTextChild = { _key?: string; _type?: string; text?: string; marks?: string[] };
export type PortableTextBlock = {
  _key: string; _type: string; style?: string; listItem?: "bullet" | "number";
  level?: number; children?: PortableTextChild[]; markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  asset?: { url?: string; metadata?: { dimensions?: { width: number; height: number } } }; alt?: string; caption?: string;
};

export type BlogPost = {
  _id: string; title: string; slug: string; eyebrow?: string; excerpt: string;
  featuredImage?: { url: string; alt: string; width?: number; height?: number };
  author: { name: string; title?: string; bio?: string; headshot?: { url: string; alt?: string } };
  body?: PortableTextBlock[]; publishedAt: string; _updatedAt: string; readingMinutes: number;
  featured?: boolean; categories: string[]; tags: string[]; seoTitle?: string; metaDescription?: string;
  canonicalUrl?: string; socialImage?: string;
};
