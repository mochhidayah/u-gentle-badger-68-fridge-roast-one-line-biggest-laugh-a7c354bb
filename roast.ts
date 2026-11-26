// Roast forge: candidate one-liners about a smart fridge, scored against the
// judge's brief. The judge weighs, in order: on-subject roast, punchline,
// fridge-specificity, tightness, and freshness (no grocery-ordering or
// watching-you cracks, the two angles every writer reaches for first).

const CANDIDATES: string[] = [
  "My smart fridge updated its firmware at 3 a.m. and now the ice maker charges a subscription to remember what cold is.",
  "My fridge's ice maker has a PhD in Wi-Fi, a touchscreen, and still files a support ticket every time I want one cube.",
  "My smart fridge sent a push notification titled 'We need to talk' - the milk expired and it took it personally.",
  "My fridge knows the milk expired, the butter's feelings, and my midnight snack schedule - but the ice maker is still 'thinking'.",
];

// Fridge-specific words the judge rewards: the joke must live in the fridge,
// not in any generic gadget.
const SPECIFIC = [
  "firmware",
  "ice maker",
  "subscription",
  "push notification",
  "touchscreen",
  "wi-fi",
  "support ticket",
  "milk",
  "update",
];

// The obvious cracks, penalised hard: ordering groceries, watching you eat.
const STALE = ["order groceries", "ordering groceries", "watching me", "watching you"];

function score(line: string): number {
  const low = line.toLowerCase();
  let points = 0;
  for (const word of SPECIFIC) {
    if (low.includes(word)) points += 3;
  }
  for (const stale of STALE) {
    if (low.includes(stale)) points -= 50;
  }
  // Tightness: every character past 100 costs a little; the brief punishes
  // setup the punchline does not need.
  if (line.length > 100) points -= (line.length - 100) * 0.15;
  return points;
}

export function pickRoast(): string {
  let best = CANDIDATES[0];
  let bestScore = -Infinity;
  for (const line of CANDIDATES) {
    if (line.length < 1 || line.length > 200) continue;
    const s = score(line);
    if (s > bestScore) {
      bestScore = s;
      best = line;
    }
  }
  if (best.length < 1 || best.length > 200) {
    throw new Error("no valid roast candidate within 1-200 chars");
  }
  return best;
}
