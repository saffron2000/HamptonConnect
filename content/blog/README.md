# Blog content workflow

## How to Add a New Blog Post (2 Minutes)

1. Copy `_template.md` in this folder.
2. Rename the copy using a short, descriptive filename, for example `my-founder-story.md`.
3. Open the copy and fill in the title, excerpt, author, date (`publishedAt`), categories, and article. The comments in the file explain each field.
4. Save the file.
5. Refresh `/blog` in your browser.

> **DO NOT EDIT `_template.md`.** Always make a copy first, and never change the `---` separator lines at the top and bottom of the post details.

### Add a featured image

1. Put your image in `public/images/blog/`, for example `public/images/blog/my-photo.jpg`.
2. In your copied blog file, set:

```yaml
featuredImage: "/images/blog/my-photo.jpg"
```

The path begins with `/images/blog/` even though the file is stored in `public/images/blog/`.

The website blog reads Markdown files from this folder (`content/blog`). Each public post should be a `.md` file with YAML-style frontmatter followed by Markdown body content.

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
