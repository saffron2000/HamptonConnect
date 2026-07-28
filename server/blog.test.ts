import test from "node:test";
import assert from "node:assert/strict";

test("published query excludes drafts and future articles", async () => {
  process.env.SANITY_PROJECT_ID = "example";
  let requestedQuery = "";
  global.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input)); requestedQuery = url.searchParams.get("query") || "";
    return new Response(JSON.stringify({ result: [] }), { status: 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  const { getPublishedPosts } = await import(`./blog.ts?test=${Date.now()}`);
  assert.deepEqual(await getPublishedPosts(), []);
  assert.match(requestedQuery, /defined\(publishedAt\)/);
  assert.match(requestedQuery, /publishedAt <= now\(\)/);
  assert.match(requestedQuery, /order\(featured desc, publishedAt desc\)/);
});

test("unconfigured CMS returns an empty public collection", async () => {
  delete process.env.SANITY_PROJECT_ID;
  const { getPublishedPosts } = await import(`./blog.ts?empty=${Date.now()}`);
  assert.deepEqual(await getPublishedPosts(), []);
});

test("normalization supplies safe optional-field and reading-time fallbacks", async () => {
  process.env.SANITY_PROJECT_ID = "example";
  const words = Array.from({ length: 401 }, () => "founder").join(" ");
  global.fetch = (async () => new Response(JSON.stringify({ result: [{ _id: "post-1", title: "A useful article", slug: "useful", excerpt: "Summary", publishedAt: "2020-01-01T00:00:00Z", _updatedAt: "2020-01-01T00:00:00Z", body: [{ _key: "b1", _type: "block", children: [{ text: words }] }] }] }), { status: 200 })) as typeof fetch;
  const { getPublishedPosts } = await import(`./blog.ts?fallback=${Date.now()}`);
  const [post] = await getPublishedPosts();
  assert.equal(post.readingMinutes, 3);
  assert.equal(post.author.name, "Columbia Founder Community");
  assert.equal(post.featuredImage, undefined);
  assert.deepEqual(post.categories, []);
});

test("defense in depth removes draft and future results", async () => {
  process.env.SANITY_PROJECT_ID = "example";
  const base = { title: "Article", slug: "article", excerpt: "Summary", author: { name: "Author" }, body: [], _updatedAt: "2020-01-01T00:00:00Z" };
  global.fetch = (async () => new Response(JSON.stringify({ result: [
    { ...base, _id: "published", publishedAt: "2020-01-01T00:00:00Z" },
    { ...base, _id: "drafts.draft", slug: "draft", publishedAt: "2020-01-01T00:00:00Z" },
    { ...base, _id: "future", slug: "future", publishedAt: "2999-01-01T00:00:00Z" },
  ] }), { status: 200 })) as typeof fetch;
  const { getPublishedPosts } = await import(`./blog.ts?privacy=${Date.now()}`);
  assert.deepEqual((await getPublishedPosts()).map(post => post._id), ["published"]);
});
