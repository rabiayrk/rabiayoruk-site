// og images -> public/og (runs before astro build)
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import yaml from 'js-yaml';

const root = process.cwd();
const font = (pkg, file) => readFileSync(join(root, 'node_modules', pkg, 'files', file));
const fonts = [
  { name: 'Grotesk', data: font('@fontsource/schibsted-grotesk', 'schibsted-grotesk-latin-500-normal.woff'), weight: 500 },
  { name: 'Grotesk', data: font('@fontsource/schibsted-grotesk', 'schibsted-grotesk-latin-700-normal.woff'), weight: 700 },
  { name: 'Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400 },
];

const C = { bg: '#f5f4f0', ink: '#17191b', ink3: '#62676c', accent: '#965600', signal: '#e0a43b', rule: '#d6d3cb' };
const h = (type, style, children) => ({ type, props: { style, children } });

function card({ kicker, title, metric, metricLabel }) {
  return h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: C.bg, padding: '64px 72px', fontFamily: 'Grotesk', color: C.ink }, [
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Mono', fontSize: 24, color: C.ink3, borderBottom: `2px solid ${C.ink}`, paddingBottom: 20 }, [
      h('span', {}, 'RABIA YORUK'),
      h('span', { color: C.accent }, kicker),
    ]),
    h('div', { display: 'flex', flexDirection: 'column' }, [
      h('div', { fontSize: title.length > 60 ? 54 : 66, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1000 }, title),
    ]),
    h('div', { display: 'flex', alignItems: 'baseline', gap: 24 }, [
      h('div', { width: 18, height: 18, borderRadius: 9, background: C.signal }, ''),
      h('span', { fontSize: 44, fontWeight: 700 }, metric),
      h('span', { fontFamily: 'Mono', fontSize: 24, color: C.ink3 }, metricLabel),
    ]),
  ]);
}

async function render(name, node) {
  const svg = await satori(node, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(join(root, 'public/og', `${name}.png`), png);
}

mkdirSync(join(root, 'public/og'), { recursive: true });

const profile = yaml.load(readFileSync(join(root, 'src/data/profile.yaml'), 'utf8'));
await render('home', card({ kicker: 'DATA · ML · LLM SYSTEMS', title: profile.intro, metric: '60,000', metricLabel: 'records a day on average, Scrapus' }));

const dir = join(root, 'src/content/projects');
for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const fm = yaml.load(readFileSync(join(dir, f), 'utf8').split('---')[1]);
  await render(f.replace(/\.md$/, ''), card({ kicker: 'CASE STUDY', title: fm.title, metric: fm.metric, metricLabel: fm.metricLabel }));
}
console.log('og: images written to public/og/');
