const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const sharp = require("sharp");

// Load the same TypeScript data used by Next without adding a test dependency.
const cache = new Map();
function loadData(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  new Function("require", "exports", outputText)(
    (name) => loadData(path.resolve(path.dirname(filename), `${name}.ts`)), exports,
  );
  return exports;
}

async function main() {
  const { MY_EVENTS, matchesEventSearch, matchesEventTopic, eventUnitName } = loadData("src/data/myEvents.ts");
  const { EDSOC_EVENTS_2026 } = loadData("src/data/edsocEvents2026.ts");
  const { EVENT_IMAGE_SIZES } = loadData("src/data/eventImageSizes.ts");
  assert.equal(MY_EVENTS.length, 105);
  assert.equal(new Set(MY_EVENTS.map((event) => event.id)).size, MY_EVENTS.length);
  assert.equal(new Set(MY_EVENTS.map((event) => event.title.toLowerCase())).size, MY_EVENTS.length);
  assert.equal(MY_EVENTS.filter((event) => matchesEventSearch(event, "2023")).length, 18);
  assert.equal(MY_EVENTS.filter((event) => matchesEventSearch(event, "2024")).length, 62);
  assert.equal(MY_EVENTS.filter((event) => matchesEventSearch(event, "2025")).length, 4);
  assert.equal(MY_EVENTS.filter((event) => matchesEventSearch(event, "2026")).length, 21);
  assert.equal(EDSOC_EVENTS_2026.length, 12);
  for (const event of EDSOC_EVENTS_2026) {
    assert.equal(MY_EVENTS.filter((entry) => entry.id === event.id).length, 1);
    assert.equal(event.year, 2026);
    assert(event.role.includes("Student Activities Chair"), `Missing EdSoc team role: ${event.id}`);
    assert.equal(event.unit, "IEEE Education Society Kerala Chapter");
    assert(event.date && event.story.venue && event.gallery.length, `Incomplete EdSoc entry: ${event.id}`);
    assert(!event.story.sourceUrl, `Report links must remain private: ${event.id}`);
    assert(matchesEventSearch(event, "EdSoc 2026"), `Unsearchable EdSoc event: ${event.id}`);
  }
  assert.equal(EDSOC_EVENTS_2026.filter((event) => event.id.startsWith("witech-")).length, 3);
  assert.equal(EDSOC_EVENTS_2026.filter((event) => event.id.startsWith("stride-forward-")).length, 3);
  assert(EDSOC_EVENTS_2026.filter((event) => event.id.startsWith("stride-forward-") || event.id === "inclutalk-2026")
    .every((event) => matchesEventTopic(event, "Assistive tech") && matchesEventTopic(event, "Talks")));
  assert(matchesEventTopic(EDSOC_EVENTS_2026.find((event) => event.id === "witech-agentic-ai-lbsitw-2026"), "Workshops"));
  assert.equal(MY_EVENTS.filter((event) => matchesEventSearch(event, "  ")).length, MY_EVENTS.length);
  const community = MY_EVENTS.filter((event) => event.group === "Community events");
  assert.equal(community.length, 14);
  for (const id of ["shesolve-2026", "thinkable-2026", "assistx-2026"]) {
    assert.equal(community.filter((event) => event.id === id).length, 1);
    assert(community.find((event) => event.id === id).story.paragraphs.some((text) => /across|programme-wide/.test(text)));
  }
  assert(!community.some((event) => event.id === "stride-2026-inclusive-hackathons"));
  const sheSolve = community.find((event) => event.id === "shesolve-2026");
  const thinkable = community.find((event) => event.id === "thinkable-2026");
  const assistX = community.find((event) => event.id === "assistx-2026");
  assert(sheSolve.image.src.endsWith("stride-2026-inclusive-hackathons-3.webp"));
  assert(thinkable.image.src.endsWith("thinkable-2026-audience.webp"));
  assert(assistX.image.src.endsWith("assistx-2026-audience.webp"));
  for (const event of [thinkable, assistX]) {
    assert(event.gallery.some((image) => image.kind === "poster" && image.src.includes(event.id)));
    assert(!JSON.stringify([event.image, ...event.gallery]).includes("not identified"));
  }
  assert.equal(community.filter((event) => event.id === "inclucode-2026").length, 1);
  assert.equal(community.filter((event) => event.id === "stride-2025").length, 1);
  assert.equal(community.filter((event) => event.id === "ieee-yess-2024").length, 1);
  assert(community.every((event) => event.role && event.image && ["www.linkedin.com", "luma.com", "robinfrancis.in"].includes(new URL(event.story.sourceUrl, "https://robinfrancis.in").hostname)));
  assert(community.some((event) => matchesEventSearch(event, "OpenAI 2026")));
  assert(community.some((event) => matchesEventSearch(event, "volunteer IndiaFOSS")));
  assert(MY_EVENTS.some((event) => matchesEventSearch(event, "2024 shone")));
  assert(MY_EVENTS.some((event) => matchesEventSearch(event, "COMPUTER SOCIETY 2023")));
  assert(!MY_EVENTS.some((event) => matchesEventSearch(event, "no-such-programme-xyz")));
  assert.equal(eventUnitName(MY_EVENTS.find((event) => event.id === "pes-tournament").unit), "IEEE Computer Society");
  assert(!/drive\.google\.com|docs\.google\.com/.test(JSON.stringify(MY_EVENTS)));
  const images = new Map();
  for (const event of MY_EVENTS) {
    assert(event.story?.summary && event.story.paragraphs.length >= 2, `Missing story: ${event.id}`);
    assert(event.story.sourceLabel, `Missing evidence: ${event.id}`);
    assert(event.image, `Missing image: ${event.id}`);
    assert(!event.endDate || event.endDate >= event.date, `Invalid date range: ${event.id}`);
    for (const image of [event.image, ...(event.gallery ?? []), ...(event.sessions ?? []).map((session) => session.image)]) {
      assert(image.alt && image.src.startsWith("/images/events/"));
      images.set(image.src, image);
    }
  }
  const infinia = MY_EVENTS.find((event) => event.id === "techx-infinia");
  assert.equal(infinia.sessions.length, 25);
  assert(infinia.sessions.every((session) => session.summary?.length > 50));
  assert.equal(MY_EVENTS.filter((event) => event.group === "TechX Infinia").length, 1);
  for (const src of images.keys()) {
    const metadata = await sharp(path.join("public", src)).metadata();
    assert.deepEqual(EVENT_IMAGE_SIZES[src], [metadata.width, metadata.height], `Wrong intrinsic size: ${src}`);
  }
  assert(EVENT_IMAGE_SIZES[infinia.image.src][0] >= 2000);
  console.log(`PASS: ${MY_EVENTS.length} unique stories, ${images.size} valid images, 25 session stories, dates, year/speaker search and private-link checks.`);

  if (process.env.EVENTS_TEST_URL) {
    let completed = 0;
    for (let offset = 0; offset < MY_EVENTS.length; offset += 5) {
      await Promise.all(MY_EVENTS.slice(offset, offset + 5).map(async (event) => {
        const response = await fetch(`${process.env.EVENTS_TEST_URL}/my-events/${event.id}/`);
        assert.equal(response.status, 200, event.id);
        const html = await response.text();
        const escapeHtml = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
        for (const paragraph of [event.story.summary, ...event.story.paragraphs]) {
          assert(html.includes(escapeHtml(paragraph)), `Unrendered story: ${event.id}`);
        }
        assert(html.includes("Enlarge image:"), `Missing viewer: ${event.id}`);
        assert(!html.includes("This local archive entry records"), `Stale copy: ${event.id}`);
        assert(!/drive\.google\.com|docs\.google\.com/.test(html), `Private link: ${event.id}`);
        completed++;
      }));
    }
    console.log(`PASS: ${completed} individual detail routes returned 200 with image controls and no private Drive links.`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
