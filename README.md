# What I Do

Professional engineering website for infrastructure and systems work. The site presents projects as technical case
studies, with an emphasis on constraints, architecture, failure modes, and evidence.

The site is built with Astro, has no client-side application framework, and is deployed as static files to GitHub
Pages at `https://shanurwan.github.io/what-i-do/`.

## Local development

Requires a current Node.js release supported by Astro and npm.

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm run check    # Astro and TypeScript diagnostics
npm run build    # check, then create the production site in dist/
npm run preview  # serve the production build locally
```

## Content

- `src/content/projects/` contains project case studies.
- `src/content/writing/` contains Markdown or MDX articles.
- `src/content.config.ts` defines and validates both content schemas.
- `src/config/profile.ts` contains the display name and external profile/contact links.

### Add a project

Create a Markdown file in `src/content/projects/` and follow the frontmatter structure of an existing project. Fields
such as architecture, constraints, decisions, failure modes, evidence, and links are optional. Set `featured: true`
to include the project on the homepage, and use `order` to control display order.

### Add an article

Copy `src/content/writing/authorization-is-not-a-moment.md`, then update its title, slug, description, date, tags, and
body. Draft articles are visible in local development but are excluded from production routes, listings, RSS, and the
sitemap. Change `draft` to `false` when the article is ready to publish.

## GitHub Pages deployment

`astro.config.mjs` sets the production origin and `/what-i-do` project-page base path. All internal links use the
central `withBase()` helper so they work both locally and under GitHub Pages.

The workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`, and can also be run manually.
In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the deployment source. Do not
commit `dist/`; the workflow publishes the build artifact directly.

Before publishing, add any available LinkedIn, email, or résumé URL to `src/config/profile.ts`. Unset values are not
rendered.
