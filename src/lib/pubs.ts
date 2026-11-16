import type { CollectionEntry } from 'astro:content';

type Pub = CollectionEntry<'publications'>;

export const isMe = (a: string) => /^Y[oö]r[uü]k, Rabia$/.test(a);

export const short = (a: string) => {
  const [family, given = ''] = a.split(', ');
  const initials = given.split(' ').map((g) => `${g[0]}.`).join(' ');
  return `${initials} ${family}`.trim();
};

const escape = (s: string) => s.replace(/([&%$#_{}])/g, '\\$1');

export function bibtex(p: Pub): string {
  const d = p.data;
  const kind = d.type === 'book' ? 'book' : d.type === 'entry' ? 'incollection' : 'article';
  const fields: [string, string | undefined][] = [
    ['title', `{${escape(d.title)}}`],
    ['author', d.authors.join(' and ')],
    [kind === 'article' ? 'journal' : kind === 'incollection' ? 'booktitle' : 'publisher', escape(d.venue)],
    ['publisher', kind !== 'book' ? d.publisher : undefined],
    ['year', String(d.year)],
    ['volume', d.volume],
    ['number', d.issue],
    ['pages', d.pages?.replace('-', '--')],
    ['eid', d.articleNumber],
    ['doi', d.doi],
    ['url', d.url],
    ['language', d.language === 'tr' ? 'turkish' : undefined],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n');
  return `@${kind}{${p.id},\n${body}\n}\n`;
}

export function scholarlyArticle(p: Pub, personId: string) {
  const d = p.data;
  return {
    '@type': d.type === 'book' ? 'Book' : 'ScholarlyArticle',
    '@id': `https://rabiayoruk.com/#${p.id}`,
    name: d.title,
    headline: d.title,
    datePublished: d.date ?? String(d.year),
    inLanguage: d.language,
    author: d.authors.map((a) =>
      isMe(a) ? { '@id': personId } : { '@type': 'Person', name: a.split(', ').reverse().join(' ') },
    ),
    ...(d.type === 'article' && {
      isPartOf: {
        '@type': 'PublicationIssue',
        ...(d.issue && { issueNumber: d.issue }),
        isPartOf: { '@type': 'Periodical', name: d.venue, ...(d.volume && { volumeNumber: d.volume }) },
      },
    }),
    ...(d.pages && { pagination: d.pages }),
    ...(d.doi && { sameAs: `https://doi.org/${d.doi}` }),
    ...(d.url && { url: d.url }),
    ...(d.publisher && { publisher: { '@type': 'Organization', name: d.publisher } }),
  };
}
