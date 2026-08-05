# Blog content workflow

The website blog reads Markdown files from this folder (`content/blog`). Each public post should be a `.md` file with YAML-style frontmatter followed by Markdown body content.

## Add a new post

1. Create a new Markdown file in this folder, for example `my-founder-story.md`.
2. Add frontmatter at the top of the file between `---` markers.
3. Write the article body in Markdown below the frontmatter.
4. Run the test suite and open `/blog` or `/blog/<slug>` locally to verify the post.

## Frontmatter fields

Required fields:

- `title`: The article title.
- `publishedAt`: An ISO date/time string. Future dates are hidden until that date.

Recommended fields:

- `slug`: URL path segment. If omitted, the filename is used.
- `excerpt`: Short summary used on listing pages and metadata.
- `eyebrow`: Small label above the article title.
- `author`: Author display name.
- `featured`: Set to `true` to pin this post as the featured article.
- `categories`: List used for filtering, for example `[Community, Updates]`.
- `tags`: List of topic tags, for example `[fundraising, growth]`.
- `updatedAt`: ISO date/time string for the last update.
- `seoTitle`: Custom browser/search title.
- `metaDescription`: Custom search/social description.
- `featuredImage`: Public image URL or site asset path.
- `featuredImageAlt`: Accessible alt text for the featured image.

## Example

```md
---
title: "My Founder Story"
slug: "my-founder-story"
excerpt: "A short summary of the post."
publishedAt: "2025-03-01T12:00:00Z"
author: "Jane Founder"
featured: false
categories: [Founder Stories]
tags: [growth, product]
---

## What we learned

Write your post content here.
```
