import test from "node:test";
import assert from "node:assert/strict";
import { getPublishedPost, getPublishedPosts, __testing } from "./blog";

test("Markdown blog reads public posts from content/blog", async () => {
  const posts = await getPublishedPosts();
  assert.ok(posts.some(post => post.slug === "welcome-to-columbia-founders"));
  const welcome = await getPublishedPost("welcome-to-columbia-founders");
  assert.equal(welcome?.title, "Welcome to Columbia Founders");
  assert.equal(welcome?.featured, true);
  assert.deepEqual(welcome?.categories, ["Community", "Updates"]);
});

test("Markdown frontmatter and body are normalized for the API", () => {
  const post = __testing.normalizeMarkdownPost("/tmp/example-post.md", `---
title: "Example Post"
excerpt: "Summary"
publishedAt: "2025-02-19T12:00:00Z"
author: "Jane Founder"
featured: false
categories: [Founder Stories, Updates]
tags: [growth]
---

## Heading

A useful paragraph.

- First point
- Second point
`);
  assert.equal(post?.slug, "example-post");
  assert.equal(post?.author.name, "Jane Founder");
  assert.equal(post?.readingMinutes, 1);
  assert.equal(post?.body?.[0].style, "h2");
  assert.equal(post?.body?.[2].listItem, "bullet");
});

test("defense in depth removes future Markdown posts", () => {
  const future = __testing.normalizeMarkdownPost("/tmp/future.md", `---
title: Future
publishedAt: "2999-01-01T00:00:00Z"
---

Not public yet.
`);
  assert.ok(future);
  assert.equal(__testing.isCurrentlyPublic(future!), false);
});
