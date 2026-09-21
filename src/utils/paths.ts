/** Resolve a site-relative path under Astro's configured GitHub Pages base. */
export function withBase(path = ''): string {
  const relativePath = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${relativePath}`;
}
