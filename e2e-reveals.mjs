import puppeteer from 'puppeteer';
import { existsSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CAND = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
];
const exe = CAND.find((p) => p && existsSync(p));

let failures = 0;
let passed = 0;
const report = (name, ok, detail = '') => {
  if (ok) passed++;
  else failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

const HEADERS = [
  { key: 'about', text: 'Building Meaningful' },
  { key: 'experience', text: 'Professional' },
  { key: 'skills', text: 'Technical' },
  { key: 'leadership', text: 'Google Student' },
  { key: 'logo-loop', text: 'Engineering Ecosystem' },
  { key: 'contact', text: "Let's Build Something" },
];

const browser = await puppeteer.launch({
  headless: true,
  ...(exe ? { executablePath: exe } : {}),
  args: ['--no-sandbox'],
  defaultViewport: { width: 1440, height: 900 },
});

async function freshPage(width, height, reduced = false) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  page.setDefaultTimeout(30000);
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  if (reduced) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  }
  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 90000 });
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll('h2')).some((x) => x.textContent.includes('Building Meaningful')),
    { timeout: 90000 }
  );
  await sleep(3000); // let loading screen + hero settle
  return { page, consoleErrors };
}

async function wrapperState(page, text) {
  return page.evaluate((t) => {
    const h = Array.from(document.querySelectorAll('h2')).find((x) => x.textContent.includes(t));
    if (!h) return null;
    const wrapper = h.parentElement ? h.parentElement.parentElement : null;
    if (!wrapper) return null;
    const cs = getComputedStyle(wrapper);
    return { opacity: cs.opacity, transform: cs.transform };
  }, text);
}

async function scrollToHeader(page, text) {
  const y = await page.evaluate((t) => {
    const h = Array.from(document.querySelectorAll('h2')).find((x) => x.textContent.includes(t));
    if (!h) return null;
    return h.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
  }, text);
  if (y === null) return false;
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await sleep(1400);
  return true;
}

const identityTransform = (t) => t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)';

/* ───────────────────────── Desktop / Tablet / Mobile reveal audit ───────────────────────── */
for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const { page, consoleErrors } = await freshPage(vp.width, vp.height);
  console.log(`\n=== ${vp.name.toUpperCase()} (${vp.width}x${vp.height}) ===`);

  // Pre-reveal: on load (no scroll), the About header should be hidden at opacity 0.
  if (vp.name === 'desktop') {
    const pre = await wrapperState(page, 'Building Meaningful');
    report('pre-reveal state: header hidden before scroll', pre && pre.opacity === '0', JSON.stringify(pre));
  }

  for (const h of HEADERS) {
    const ok = await scrollToHeader(page, h.text);
    const st = await wrapperState(page, h.text);
    const revealed = ok && st && st.opacity === '1';
    report(`${h.key} header reveals`, !!revealed, JSON.stringify(st));
  }

  // Once-only: scroll back to About — it must stay revealed (no re-hide, no jitter).
  await scrollToHeader(page, 'Building Meaningful');
  const again = await wrapperState(page, 'Building Meaningful');
  report('once-only: About stays revealed after scroll-away-and-back',
    !!again && again.opacity === '1' && identityTransform(again.transform), JSON.stringify(again));

  // No horizontal overflow: the page must never be able to scroll sideways.
  const hScroll = await page.evaluate(async () => {
    window.scrollTo(5000, 0);
    await new Promise((r) => setTimeout(r, 150));
    const x = window.scrollX;
    window.scrollTo(0, 0);
    return {
      x,
      htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
    };
  });
  report('no horizontal scrolling', hScroll.x === 0, JSON.stringify(hScroll));

  report(`${vp.name}: zero console errors`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

  await page.close();
}

/* ───────────────────────── Reduced motion audit ───────────────────────── */
{
  const { page, consoleErrors } = await freshPage(1440, 900, true);
  console.log('\n=== REDUCED MOTION (1440x900) ===');

  // Pre-reveal under reduced motion: content is hidden until it enters view.
  const pre = await wrapperState(page, 'Building Meaningful');
  report('reduced-motion pre-reveal: header hidden',
    !!pre && pre.opacity === '0', JSON.stringify(pre));

  // No transform interpolation: trigger the reveal and sample the transform over time.
  // The transform must resolve instantly (12px pose -> none) and never pass through
  // an intermediate value — proof that transform-based movement is truly disabled.
  await scrollToHeader(page, 'Building Meaningful');
  const samples = [];
  let elapsed = 0;
  for (const target of [100, 300, 600]) {
    await sleep(target - elapsed);
    elapsed = target;
    samples.push((await wrapperState(page, 'Building Meaningful')).transform);
  }
  const intermediate = samples.some((t) => {
    if (identityTransform(t)) return false;
    const m = /matrix\(1, 0, 0, 1, 0, ([0-9.]+)\)/.exec(t);
    if (!m) return true; // any non-identity, non-y-only matrix counts as intermediate
    const y = parseFloat(m[1]);
    return y > 0.5 && y < 11.5; // strictly between the pose and the rest position
  });
  report('reduced-motion: transform never interpolates (no movement)',
    !intermediate, JSON.stringify(samples));

  for (const h of HEADERS) {
    await scrollToHeader(page, h.text);
    const st = await wrapperState(page, h.text);
    report(`reduced-motion ${h.key}: visible, never moved`,
      !!st && st.opacity === '1' && identityTransform(st.transform), JSON.stringify(st));
  }

  // DriftWall must be static under reduced motion.
  await scrollToHeader(page, 'Engineering Ecosystem');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1500);
  const wall = await page.evaluate(() => {
    const plane = document.querySelector('.drift-wall__plane');
    if (!plane) return null;
    const a = getComputedStyle(plane).transform;
    return { a };
  });
  await sleep(400);
  const wall2 = await page.evaluate(() => {
    const plane = document.querySelector('.drift-wall__plane');
    return plane ? getComputedStyle(plane).transform : null;
  });
  // The wall always carries a 3D perspective tilt; "static" means the matrix
  // is byte-identical between two samples 400ms apart (no drift translation).
  report('reduced-motion: DriftWall static (no drift)',
    !!wall && wall.a === wall2, JSON.stringify({ a: wall && wall.a, b: wall2 }));

  // Modal still opens + ESC closes under reduced motion.
  const modal = await page.evaluate(() => {
    const a = document.querySelector('.drift-wall__plane a[href]');
    if (!a) return false;
    (a).click();
    return true;
  });
  report('reduced-motion: tile click dispatched', modal);
  await sleep(1200);
  const dialogOpen = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
  report('reduced-motion: AchievementModal opens', dialogOpen);
  await page.keyboard.press('Escape');
  await sleep(800);
  const dialogClosed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
  report('reduced-motion: ESC closes modal', dialogClosed);

  report('reduced-motion: zero console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
  await page.close();
}

await browser.close();
console.log(`\n=== AUDIT SUMMARY: ${passed} passed, ${failures} failed ===`);
process.exit(failures === 0 ? 0 : 1);
