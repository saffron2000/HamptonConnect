import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { request } from "node:http";
import { registerRoutes } from "./routes";

const article = { _id: "published", title: "Public article", slug: "public-article", excerpt: "A practical article for founders.", author: { name: "CFC Author" }, body: [], publishedAt: "2020-01-01T00:00:00Z", _updatedAt: "2020-01-02T00:00:00Z", categories: [], tags: [] };

function get(port: number, path: string): Promise<{ status: number; body: string; headers: Record<string, string | string[] | undefined> }> {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path }, response => {
      let body = ""; response.setEncoding("utf8"); response.on("data", chunk => body += chunk);
      response.on("end", () => resolve({ status: response.statusCode || 0, body, headers: response.headers }));
    });
    req.on("error", reject); req.end();
  });
}

test("blog routes enforce flag, preview authorization, and public feeds", async t => {
  process.env.SANITY_PROJECT_ID = "example";
  process.env.SANITY_API_READ_TOKEN = "viewer-token";
  process.env.BLOG_PREVIEW_SECRET = "valid-preview-secret";
  process.env.PUBLIC_SITE_URL = "https://columbiafounders.com";
  const hidden = [{ ...article, _id: "drafts.private", slug: "private-draft", title: "Private draft" }, { ...article, _id: "future", slug: "future-post", title: "Future post", publishedAt: "2999-01-01T00:00:00Z" }];
  global.fetch = (async (_input, init) => new Response(JSON.stringify({ result: init?.headers ? article : [article, ...hidden] }), { status: 200, headers: { "content-type": "application/json" } })) as typeof fetch;

  const app = express(); app.use(express.json()); const server = await registerRoutes(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); if (!address || typeof address === "string") throw new Error("Test server failed to listen");
  t.after(() => server.close());

  process.env.VITE_BLOG_ENABLED = "false";
  assert.equal((await get(address.port, "/api/blog/posts")).status, 404);
  assert.doesNotMatch((await get(address.port, "/sitemap.xml")).body, /\/blog/);

  process.env.VITE_BLOG_ENABLED = "true";
  const posts = await get(address.port, "/api/blog/posts");
  assert.equal(posts.status, 200); assert.match(posts.body, /Public article/);
  const invalid = await get(address.port, "/api/blog/preview/published?secret=wrong");
  assert.equal(invalid.status, 401);
  const valid = await get(address.port, "/api/blog/preview/published?secret=valid-preview-secret");
  assert.equal(valid.status, 200); assert.equal(valid.headers["x-robots-tag"], "noindex, nofollow");
  const sitemap = await get(address.port, "/sitemap.xml");
  assert.match(sitemap.body, /\/blog\/public-article/);
  assert.doesNotMatch(sitemap.body, /private-draft|future-post/);
  const rss = await get(address.port, "/blog/rss.xml");
  assert.equal(rss.status, 200); assert.match(rss.body, /Public article/); assert.doesNotMatch(rss.body, /Private draft|Future post/);
});
