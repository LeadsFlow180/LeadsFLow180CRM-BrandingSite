import fs from "fs";

const site = fs.readFileSync("src/lib/site.ts", "utf8");
const md = fs.readFileSync("docs/LeadsFlow180_Team_Profiles_SEO_AEO_Content.md", "utf8");
const profilesSrc = fs.readFileSync("src/lib/agentProfiles.ts", "utf8");

const agentBlock = site.slice(site.indexOf("export const agents"), site.indexOf("export const filters"));
const agentIds = [...agentBlock.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const names = [...agentBlock.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);

const packSections = [...md.matchAll(/^#\s+(\d+)\.\s+(.+?)\s+—/gm)].map((m) => ({
  n: Number(m[1]),
  heading: m[2].trim(),
}));

const start = profilesSrc.indexOf("PROFILE_BY_ID");
const end = profilesSrc.indexOf("function officePhotoFor");
const block = profilesSrc.slice(start, end);
const profileKeys = [...block.matchAll(/^\s{2}([a-z]+):\s*\{/gm)].map((m) => m[1]);

/** Normalize names for JoJo / Dante apostrophe variants. */
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[“”"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function packSectionFor(name) {
  const n = norm(name);
  const first = n.split(" ")[0];
  // JoJo special
  if (first === "jojo" || n.includes("jojo")) {
    return packSections.find((s) => /jojo/i.test(s.heading));
  }
  if (first === "dante") {
    return packSections.find((s) => /dante/i.test(s.heading));
  }
  return packSections.find((s) => {
    const h = norm(s.heading);
    return h.includes(n) || h.startsWith(first + " ");
  });
}

function packBodyFor(section) {
  if (!section) return null;
  const re = new RegExp(`^#\\s+${section.n}\\.\\s+`, "m");
  const m = md.match(re);
  if (!m) return null;
  const from = m.index;
  const rest = md.slice(from + 1);
  const next = rest.search(/^#\s+\d+\./m);
  return next < 0 ? md.slice(from) : md.slice(from, from + 1 + next);
}

function profileBodyFor(id) {
  const m = block.match(new RegExp(`^\\s{2}${id}:\\s*\\{`, "m"));
  if (!m || m.index == null) return null;
  const from = m.index;
  const rest = block.slice(from + m[0].length);
  const next = rest.search(/^\s{2}[a-z]+:\s*\{/m);
  return next < 0 ? block.slice(from) : block.slice(from, from + m[0].length + next);
}

const packChecks = [
  ["Specialty label", /\*\*Specialty label:\*\*/i],
  ["Page title", /\*\*Page title:\*\*/i],
  ["Meta description", /\*\*Meta description:\*\*/i],
  ["Hero headline", /\*\*Hero headline:\*\*/i],
  ["Intro", /\*\*Intro:\*\*/i],
  ["CTA", /\*\*CTA:\*\*/i],
  ["Facts", /\*\*Facts about/i],
  ["Portfolio", /\*\*Portfolio concepts/i],
  ["About", /\*\*About /i],
  ["Core skills", /\*\*Core skills:\*\*/i],
  ["FAQs", /\*\*FAQs\*\*/i],
  ["Get started", /\*\*How to get started:\*\*/i],
  ["Free guide", /\*\*Free quick guide:\*\*/i],
  ["Download CTA", /\*\*Download CTA:\*\*/i],
];

const wiredChecks = [
  ["specialtyLabel", /specialtyLabel\s*:/],
  ["pageTitle", /pageTitle\s*:/],
  ["metaDescription", /metaDescription\s*:/],
  ["tagline (hero)", /tagline\s*:/],
  ["intro|bio", /(intro|bio)\s*:/],
  ["askCta", /askCta\s*:/],
  ["personality|facts", /personality\s*:/],
  ["work (portfolio)", /work\s*:/],
  ["skills", /skills\s*:/],
  ["faqs", /faqs\s*:/],
  ["getStarted", /getStarted\s*:/],
  ["guide", /guide\s*:/],
];

function countArrayItems(src, key) {
  const m = src.match(new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`, "m"));
  if (!m) return 0;
  // count object entries or string entries
  const body = m[1];
  const objs = [...body.matchAll(/\{\s*\n/g)].length;
  if (objs) return objs;
  return [...body.matchAll(/"[^"]+"/g)].length;
}

console.log("=== Coverage counts ===");
console.log(`site.ts agents:          ${agentIds.length}`);
console.log(`SEO pack # sections:     ${packSections.length}`);
console.log(`PROFILE_BY_ID entries:   ${profileKeys.length}`);
console.log(
  `Missing profiles:        ${agentIds.filter((id) => !profileKeys.includes(id)).join(", ") || "none"}`,
);
console.log(
  `Extra profiles:          ${profileKeys.filter((id) => !agentIds.includes(id)).join(", ") || "none"}`,
);
console.log("");

let ok = 0;
const rows = [];

for (let i = 0; i < agentIds.length; i++) {
  const id = agentIds[i];
  const name = names[i];
  const section = packSectionFor(name);
  const packBody = packBodyFor(section);
  const wired = profileBodyFor(id);

  const packMissing = [];
  if (!packBody) packMissing.push("SECTION");
  else {
    for (const [label, re] of packChecks) {
      if (!re.test(packBody)) packMissing.push(label);
    }
  }

  const wiredMissing = [];
  const counts = {};
  if (!wired) wiredMissing.push("PROFILE");
  else {
    for (const [label, re] of wiredChecks) {
      if (!re.test(wired)) wiredMissing.push(label);
    }
    counts.faqs = countArrayItems(wired, "faqs");
    counts.skills = countArrayItems(wired, "skills");
    counts.work = countArrayItems(wired, "work");
    counts.getStarted = countArrayItems(wired, "getStarted");
    counts.personality = countArrayItems(wired, "personality");
    if (counts.faqs < 3) wiredMissing.push(`faqs(${counts.faqs}<3)`);
    if (counts.skills < 3) wiredMissing.push(`skills(${counts.skills}<3)`);
    if (counts.work < 2) wiredMissing.push(`work(${counts.work}<2)`);
    if (counts.getStarted < 3) wiredMissing.push(`getStarted(${counts.getStarted}<3)`);
    if (!/guide:\s*\{[\s\S]*?title\s*:/.test(wired)) wiredMissing.push("guide.title");
    if (!/guide:\s*\{[\s\S]*?steps\s*:/.test(wired)) wiredMissing.push("guide.steps");
  }

  const status = packMissing.length === 0 && wiredMissing.length === 0 ? "OK" : "GAP";
  if (status === "OK") ok++;
  rows.push({ id, name, status, pack: section?.n, packMissing, wiredMissing, counts });
}

for (const r of rows) {
  const packLabel = r.pack ? `#${r.pack}` : "MISSING";
  if (r.status === "OK") {
    console.log(
      `[OK] ${r.id.padEnd(8)} ${r.name.padEnd(22)} pack ${packLabel}  faqs=${r.counts.faqs} skills=${r.counts.skills} work=${r.counts.work} steps=${r.counts.getStarted}`,
    );
  } else {
    console.log(`[GAP] ${r.id.padEnd(8)} ${r.name.padEnd(22)} pack ${packLabel}`);
    if (r.packMissing.length) console.log(`      pack: ${r.packMissing.join(", ")}`);
    if (r.wiredMissing.length) console.log(`      wired: ${r.wiredMissing.join(", ")}`);
  }
}

console.log("");
console.log(`Result: ${ok}/${agentIds.length} agents fully OK`);
console.log("");
console.log("=== SEO pack order vs site.ts order ===");
for (const s of packSections) {
  const match = names.find((n) => {
    const sec = packSectionFor(n);
    return sec && sec.n === s.n;
  });
  console.log(`#${String(s.n).padStart(2)} ${s.heading.padEnd(36)} → site: ${match || "(name mismatch)"}`);
}
