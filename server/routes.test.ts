import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import { request } from "node:http";
import { registerRoutes } from "./routes";

function get(port: number, path: string): Promise<{ status: number; body: string; headers: Record<string, string | string[] | undefined> }> {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path }, response => {
      let body = ""; response.setEncoding("utf8"); response.on("data", chunk => body += chunk);
      response.on("end", () => resolve({ status: response.statusCode || 0, body, headers: response.headers }));
    });
    req.on("error", reject); req.end();
  });
}

test("blog routes serve published Markdown content, preview authorization, and public feeds", async t => {
  process.env.BLOG_PREVIEW_SECRET = "valid-preview-secret";
  process.env.PUBLIC_SITE_URL = "https://columbiafounders.com";

  const app = express(); app.use(express.json()); const server = await registerRoutes(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); if (!address || typeof address === "string") throw new Error("Test server failed to listen");
  t.after(() => server.close());

  delete process.env.VITE_BLOG_ENABLED;
  const posts = await get(address.port, "/api/blog/posts");
  assert.equal(posts.status, 200); assert.match(posts.body, /Welcome to Columbia Founders/);
  const invalid = await get(address.port, "/api/blog/preview/published?secret=wrong");
  assert.equal(invalid.status, 401);
  const sitemap = await get(address.port, "/sitemap.xml");
  assert.match(sitemap.body, /\/blog\/welcome-to-columbia-founders/);
  const rss = await get(address.port, "/blog/rss.xml");
  assert.equal(rss.status, 200); assert.match(rss.body, /Welcome to Columbia Founders/);
});
