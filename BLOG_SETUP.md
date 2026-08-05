# Blog cloud setup: Replit + hosted Sanity Studio

The website stays in the existing Replit application: Vite builds the React client, Express serves that client and the API on port 5000, and Replit's Run button starts `npm run dev`. Replit Deployments use `npm run build` followed by `npm run start` as defined in `.replit`. Sanity stores articles and images and provides managed editor accounts. No SQL migration, local computer, local server, or custom blog password is involved.

The blog is public in the existing website navigation, client routes, public API, RSS feed, and sitemap. Published Sanity articles appear automatically when the website server has the Sanity project configuration below. The protected `/blog/preview/:id` route remains available so an authorized editor can preview a draft; it still requires the preview bearer secret and server-only Sanity Viewer token and is always `noindex, nofollow`.

## 1. Create the Sanity project

1. Sign in at [sanity.io/manage](https://sanity.io/manage) with the organization owner account and select **Create project**.
2. Name it **Columbia Founders Editorial**. Create or select the dataset named `production`. A public dataset is sufficient because only published documents are publicly queryable; drafts remain protected by Sanity.
3. Copy the **Project ID** from **Project → Settings**. It resembles `a1b2c3d4` and is not a secret.
4. Open **API → Tokens**, create a token named **CFC website draft previews**, and give it the **Viewer** role. Copy it once. This token is server-only and must never have a `VITE_` or `SANITY_STUDIO_` prefix.
5. Open **API → CORS origins**. Add the exact Replit development origin shown in Replit's webview, such as `https://hamptonconnect.username.repl.co` or the current `https://<repl-slug>.<user>.replit.dev` URL. Add the final production origin `https://columbiafounders.com`. Leave **Allow credentials** off.

## 2. Configure the Replit project

No `.env` file is needed. In the Replit workspace, confirm that the **Run** button opens the website and that the Console reports port 5000. The checked-in `.replit` already provides:

- Development Run button: `npm run dev`
- Deployment build: `npm run build`
- Deployment run: `npm run start`
- One Express process serving both `/api/*` and the built React application, including nested SPA route refreshes

In Replit **Deployments**, use **Autoscale** and keep those build/run commands. Do not deploy the `studio` folder as another permanent Replit service; it is deployed once to Sanity's hosting from the Replit Shell.

## 3. Add Replit Secrets

Open **Tools → Secrets** in Replit and add every row below. Replit Secrets are available to the development process and deployment only after they are also added/configured for that Deployment in Replit's deployment settings. Stop and restart the Run process after changes; rebuild and redeploy the production Deployment after changes marked build-time.

| Variable | Used by | Source and placeholder format | Exposure | Restart? |
| --- | --- | --- | --- | --- |
| `SANITY_PROJECT_ID` | Website server | Sanity Project Settings; `a1b2c3d4` | Public identifier | Yes |
| `SANITY_DATASET` | Website server | Dataset selected above; `production` | Public identifier | Yes |
| `SANITY_API_READ_TOKEN` | Website server only | Sanity API Viewer token; `sk...` | **Server-only secret** | Yes |
| `BLOG_PREVIEW_SECRET` | Website server | Generate in Replit Shell with `openssl rand -base64 32`; `mR8...Q=` | **Server-only bearer secret** | Yes |
| `PUBLIC_SITE_URL` | Website server | Replit review origin first, production domain at launch; `https://<repl-slug>.<user>.replit.dev` | Public URL | Yes |
| `SESSION_SECRET` | Existing Express sessions | Generate in Replit Shell with `openssl rand -base64 32`; `qP2...A=` | **Server-only secret** | Yes |
| `GOOGLE_CALENDAR_API_KEY` | Existing Events integration | Existing Google Cloud key; `AIza...` | Server-only | Yes |
| `SANITY_STUDIO_PROJECT_ID` | Studio deployment build | Same value as `SANITY_PROJECT_ID`; `a1b2c3d4` | Public identifier embedded in Studio | Before Studio deploy |
| `SANITY_STUDIO_DATASET` | Studio deployment build | Same value as `SANITY_DATASET`; `production` | Public identifier embedded in Studio | Before Studio deploy |
| `SANITY_STUDIO_SITE_URL` | Studio preview link | Exact active Replit review or production origin; `https://<repl-slug>.<user>.replit.dev` | Public URL embedded in Studio | Redeploy Studio |
| `SANITY_STUDIO_PREVIEW_SECRET` | Studio preview link | Same value as `BLOG_PREVIEW_SECRET` | Sensitive bearer value available only to authenticated Studio users, but embedded in the Studio build and preview URL | Redeploy Studio |

Sanity Studio variables are also stored in Replit Secrets solely so the Replit Shell can supply them while deploying Studio. `SANITY_STUDIO_PREVIEW_SECRET` cannot be server-only because a hosted Studio must construct the preview URL; protect Studio membership, rotate both matching preview-secret values if a link is disclosed, and redeploy Studio after rotation. The Sanity Viewer token remains server-only and is the second control required to retrieve a draft.

## 4. Deploy the Sanity Studio

This is the only npm command outside the normal Replit Run/Deploy buttons. Open the **Shell inside the Replit workspace** (not a terminal on your computer) and run:

```bash
cd studio
npm install
npm run deploy
```

Sign in to Sanity when the CLI opens its browser authorization page. When prompted for a Studio hostname, choose a unique name such as `columbia-founders-editorial`. The hosted URL will be `https://columbia-founders-editorial.sanity.studio` (the exact hostname depends on availability). Vision/query tooling is intentionally not installed: it is unnecessary for editors and was the dependency that previously received a registry 403.

The Studio receives its project ID and dataset from the `SANITY_STUDIO_*` Replit Secrets during deployment. Its **Open preview** document action uses `SANITY_STUDIO_SITE_URL` and adds the document ID and matching preview secret automatically; editors never copy or type a secret. When switching previews from the Replit review URL to `https://columbiafounders.com`, change `SANITY_STUDIO_SITE_URL` in Replit Secrets and run `npm run deploy` again from the `studio` directory in the Replit Shell.

## 5. Preview the blog in Replit

1. Add all Secrets above.
2. Stop and restart the Replit Run process so the server reads the Sanity configuration.
3. Open the Replit webview in a new tab and append `/blog` to its HTTPS origin.
4. With no published articles, confirm the **Stories are on the way** empty state.
5. Create a draft in hosted Studio, then use the document menu's **Open preview** action. It opens the draft on the configured Replit URL without asking for a secret.
6. A missing or invalid preview secret returns an authorization error; a valid preview displays a yellow draft banner and sets `noindex, nofollow` in both the API response and page metadata.

## 6. Publish articles and invite the board member

In Sanity Manage, open **Members → Invite members**, enter the board member's email, and grant the least-privileged **Editor** role—not Administrator. Send only the hosted `https://<chosen-hostname>.sanity.studio` URL. She does not need Replit, Codex, GitHub, or any preview secret.

The editor workflow is:

1. Sign in to hosted Studio and create reusable **Authors** and **Categories** as needed.
2. Open **Articles → Create**. In **Article**, enter the required title, click **Generate** for the unique slug, write the excerpt and content, upload a featured image, and add the required alt text.
3. In **Author**, select an existing author or create one. A headshot and job title are optional.
4. In **Publishing**, select the publication date/time, optionally mark the article featured, and leave reading time blank for automatic calculation.
5. Use **Categories & tags** and optional **SEO & sharing** fields. Blank SEO title, description, and social image automatically fall back to the article title, excerpt, and featured image.
6. Leave the document unpublished to keep it as a private draft. Choose **Open preview** for one-click review.
7. To publish now, choose the current date/time and click **Publish**. To schedule, set a future date/time and publish; public queries continue hiding it until that instant.
8. To edit, update the document and publish the revision. To remove it publicly, choose **Unpublish**. To delete it, unpublish first, choose **Delete**, and confirm.

Sanity stores uploaded originals, generated image assets, drafts, and document history. An administrator can create an off-site dataset backup from Sanity Manage's dataset export interface; no board-member action is needed.

## 7. Deploy the website

1. In Replit **Deployments**, create or update the Autoscale deployment.
2. Add the same website Secrets from section 3 to the Deployment. Set `PUBLIC_SITE_URL=https://columbiafounders.com`.
3. Set the build command exactly to `npm run build`.
4. Set the run command exactly to `npm run start`.
5. Deploy. Express serves `dist/public` and the API from one process, and its static fallback returns `index.html` for direct refreshes of `/blog/:slug`.
6. After approval, update `SANITY_STUDIO_SITE_URL` to the production origin, redeploy Studio, and confirm the production URLs below.

## 8. Troubleshooting

- **`/blog` shows the empty state:** confirm `SANITY_PROJECT_ID` is configured on the website server and that at least one Sanity article is published with a slug and non-future publication date.
- **Empty state despite a Studio document:** confirm the document is published, has a slug and publication date, and its date is not in the future. Drafts and unpublished/future documents are intentionally absent from the index, public API, related articles, sitemap, and RSS.
- **Preview says unauthorized:** ensure `BLOG_PREVIEW_SECRET` and `SANITY_STUDIO_PREVIEW_SECRET` match exactly, then restart Replit and redeploy Studio. Confirm the Viewer token is in `SANITY_API_READ_TOKEN`.
- **Preview opens the wrong site:** update `SANITY_STUDIO_SITE_URL` to the exact HTTPS Replit or production origin and redeploy Studio.
- **Sanity request fails:** verify both project ID values, both dataset values, the Viewer token, and CORS origins in Sanity Manage. The website server, not the browser, requests content.
- **Studio deploy receives an npm registry error:** confirm `@sanity/vision` is absent, use the Replit Shell command in section 4, and retry. If Replit's package proxy blocks `sanity` itself, use Sanity's browser-based project tooling/support rather than running Studio as a permanent Replit service.
- **Nested route refresh:** the Replit URL should return the React application for `/blog/<slug>`. If a proxy-level 404 appears, verify the Deployment run command is `npm run start`, not a static-site deployment.

## URLs and visual QA

Replace `<replit-origin>` with the exact HTTPS URL opened by Replit:

- `<replit-origin>/blog`
- `<replit-origin>/blog/<published-slug>`
- `<replit-origin>/api/blog/posts`
- `<replit-origin>/sitemap.xml`
- `<replit-origin>/blog/rss.xml`
- A one-click draft URL opened from hosted Studio

Check desktop, tablet, and approximately 320px mobile widths; desktop/mobile navigation and footer; long-title wrapping; consistent 16:10 cards and 16:9 hero image; narrow article measure; headings/lists/quotes/body images/captions/dividers; no horizontal overflow; keyboard focus; mobile menu label; meaningful alt text; color contrast; empty/error states; copy-link and LinkedIn labels; no promotional sidebar; SEO/OG/canonical/BlogPosting data; draft `noindex`; and regressions on Home, About, Contact, Events, Apply, and Portal.
