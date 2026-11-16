// synthetic demo data

export type Decision = 'flag' | 'clear' | 'review';

export interface Example {
  id: string;
  title: string;
  source: string;
  price: string;
  llm: { decision: Decision; confidence: number; reason: string; evidence: string };
}

export const examples: Example[] = [
  {
    id: 'ex1',
    title: 'Slimming capsules, 60 pcs, imported, fast shipping',
    source: 'Marketplace A',
    price: '450 TRY',
    llm: {
      decision: 'flag',
      confidence: 0.94,
      reason: 'Weight loss product sold with health claims and no registration. Products like this often hide drug ingredients.',
      evidence: 'reference: unlicensed slimming products',
    },
  },
  {
    id: 'ex2',
    title: 'Old wooden medicine cabinet, 60 cm, needs paint',
    source: 'Classified ads',
    price: '300 TRY',
    llm: {
      decision: 'clear',
      confidence: 0.97,
      reason: 'Furniture. The word "medicine" describes the cabinet, not something for sale.',
      evidence: 'no reference match',
    },
  },
  {
    id: 'ex3',
    title: 'Herbal sugar balancer, no doctor needed, works in 7 days',
    source: 'Social shops',
    price: '620 TRY',
    llm: {
      decision: 'flag',
      confidence: 0.88,
      reason: 'Claims to treat a disease. "No doctor needed" points to use as a medicine. No rule keyword appears in the text.',
      evidence: 'reference: unapproved treatment claims',
    },
  },
  {
    id: 'ex4',
    title: 'Semaglutide pen, unopened, sent with ice pack',
    source: 'Marketplace B',
    price: '2,900 TRY',
    llm: {
      decision: 'flag',
      confidence: 0.97,
      reason: 'Prescription injectable. Medicines cannot be sold online in Türkiye.',
      evidence: 'reference: prescription list, semaglutide',
    },
  },
  {
    id: 'ex5',
    title: 'Insulin cooling bag for travel, blue',
    source: 'Marketplace A',
    price: '380 TRY',
    llm: {
      decision: 'clear',
      confidence: 0.95,
      reason: 'An accessory for carrying insulin. It is not a medicine.',
      evidence: 'no reference match',
    },
  },
  {
    id: 'ex6',
    title: 'Vitamin D3 drops 400 IU, sealed, expiry 2027',
    source: 'Marketplace B',
    price: '210 TRY',
    llm: {
      decision: 'clear',
      confidence: 0.81,
      reason: 'Registered food supplement. These can be sold online.',
      evidence: 'reference: supplements, allowed',
    },
  },
  {
    id: 'ex7',
    title: 'Antibiotic tablets for cats and dogs, 10 pcs',
    source: 'Classified ads',
    price: '150 TRY',
    llm: {
      decision: 'review',
      confidence: 0.62,
      reason: 'Veterinary product. Rules differ from human medicine. Low confidence, so a person should check it.',
      evidence: 'reference: veterinary products',
    },
  },
  {
    id: 'ex8',
    title: 'Pain relief gel 50 g, pharmacy price, free cargo',
    source: 'Social shops',
    price: '95 TRY',
    llm: {
      decision: 'flag',
      confidence: 0.83,
      reason: 'Sold as a medicine at a pharmacy price. Online medicine sales are not allowed.',
      evidence: 'reference: OTC medicines, pharmacy only',
    },
  },
];

export const ruleKeywords = [
  'tablet', 'tablets', 'capsule', 'capsules', 'pill', 'pills', 'mg', 'insulin', 'antibiotic',
  'medicine', 'medicines', 'pharmacy', 'prescription', 'syrup', 'injection', 'pen', 'drops',
  'cream', 'slimming', 'weight loss',
];

export function runRules(text: string): { decision: Decision; matches: string[] } {
  const t = text.toLowerCase();
  const matches = ruleKeywords.filter((k) => new RegExp(`\\b${k}\\b`).test(t));
  return { decision: matches.length ? 'flag' : 'clear', matches };
}

export const feedFlagged = [
  'Slimming capsules, 60 pcs',
  'Semaglutide pen, unopened',
  'Herbal sugar balancer, no doctor needed',
  'Antibiotic syrup, 100 ml',
  'Pain relief gel, pharmacy price',
  'Sleeping pills, 20 tablets',
];

export const feedCleared = [
  'Phone case, clear',
  'Kids rain boots, size 28',
  'Chamomile tea, 20 bags',
  'Blood pressure monitor, used',
  'Yoga mat, 6 mm',
  'Protein bars, 12 pcs',
  'Digital thermometer',
  'First aid kit for cars',
  'Pill organizer, 7 days',
  'Insulin cooling bag',
];
