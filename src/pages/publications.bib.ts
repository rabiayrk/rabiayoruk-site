import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { bibtex } from '../lib/pubs';

export const GET: APIRoute = async () => {
  const pubs = await getCollection('publications');
  const body = `% Publications of Rabia Yoruk. Generated from src/data/publications.json.\n\n${pubs.map(bibtex).join('\n')}`;
  return new Response(body, { headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' } });
};
