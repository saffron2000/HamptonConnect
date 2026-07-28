import test from "node:test";
import assert from "node:assert/strict";
import { isBlogEnabled } from "./blog-feature";

test("blog feature flag is enabled only by an explicit true value", () => {
  assert.equal(isBlogEnabled("true"), true);
  assert.equal(isBlogEnabled(" TRUE "), true);
  assert.equal(isBlogEnabled("false"), false);
  assert.equal(isBlogEnabled(undefined), false);
});
