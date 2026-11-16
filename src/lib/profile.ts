import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

export interface Profile {
  name: string;
  title: string;
  email: string;
  site: string;
  location: string;
  intro: string;
  lede: string;
  links: { label: string; url: string }[];
  research: { title: string; text: string }[];
  inPreparation: string[];
  education: { period: string; title: string; org: string; note?: string }[];
  experience: { period: string; role: string; org: string; place: string; text: string }[];
  service: { period: string; role: string; org: string; text: string; url?: string }[];
}

export const profile = yaml.load(readFileSync(join(process.cwd(), 'src/data/profile.yaml'), 'utf8')) as Profile;
