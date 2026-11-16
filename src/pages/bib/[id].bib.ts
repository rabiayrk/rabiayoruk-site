import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { bibtex } from '../../lib/pubs';

export const getStaticPaths: GetStaticPaths = async () => {
  const pubs = await getCollection('publications');
  return pubs.map((p) => ({ params: { id: p.id }, props: { p } }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(bibtex((props as { p: CollectionEntry<'publications'> }).p), {
    headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' },
  });
