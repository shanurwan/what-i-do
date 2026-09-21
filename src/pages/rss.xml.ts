import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { profile } from '../config/profile';
import { withBase } from '../utils/paths';

export async function GET(context: APIContext) {
  const articles = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());

  return rss({
    title: `${profile.displayName} — Writing`,
    description: 'Technical writing on infrastructure, authorization, reliability, isolation, and recovery.',
    site: new URL(withBase(), context.site ?? 'https://shanurwan.github.io').toString(),
    items: articles.map(({ data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.published,
      link: withBase(`writing/${data.slug}/`),
      categories: data.tags,
    })),
    customData: '<language>en</language>',
  });
}
