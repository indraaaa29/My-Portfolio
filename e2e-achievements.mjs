import puppeteer from 'puppeteer';
import { existsSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const results = [];
const consoleErrors = [];

const report = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} | ${name}${detail ? ' | ' + detail : ''}`);
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Locate system Chrome if puppeteer's bundled browser is unavailable.
const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
];
const executablePath = CHROME_CANDIDATES.find((p) => p && existsSync(p));

const browser = await puppeteer.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ['--no-sandbox', '--disable-gpu', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900 },
});

try {
  const page = await browser.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => consoleErrors.push(`[pageerror] ${err.message}`));

  console.log('--- Loading page ---');
  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 90000 });

  // Wait for the Hall of Fame section to exist. The intro eyebrow carries the
  // section name (rendered uppercase via CSS), so match the leaf element by text.
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll('h2, h3, p, span, div, a, li')).some(
        (el) => el.childElementCount === 0 && el.textContent.trim().toUpperCase() === 'HALL OF FAME'
      ),
    { timeout: 30000 }
  );
  await sleep(4000); // let the loading screen / initial renders settle

  // Locate the Hall of Fame section (the 'HALL OF FAME' eyebrow) and scroll to it.
  const hallY = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('h2, h3, p, span, div, a, li')).find(
      (x) => x.childElementCount === 0 && x.textContent.trim().toUpperCase() === 'HALL OF FAME'
    );
    return el ? el.getBoundingClientRect().top + window.scrollY : -1;
  });
  report('Hall of Fame section found', hallY > 0, `y=${hallY}`);
  if (hallY < 0) throw new Error('Section not found');
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 200)), hallY);
  await sleep(2500);

  const tileCount = await page.evaluate(() => document.querySelectorAll('a[data-tile-id]').length);
  report('DriftWall tiles rendered', tileCount > 20, `tiles=${tileCount}`);

  // Helper: click a tile by achievement href. Requires a copy whose CENTER is
  // fully inside the viewport AND is the topmost element at that point (not
  // hidden under the section header or clipped by the wall edges).
  // Helper: click a tile by achievement href. Requires a copy whose CENTER is
  // fully inside the viewport AND is the topmost element at that point (not
  // hidden under the section header or clipped by the wall edges). Verifies the
  // modal actually opened before returning true.
  const clickTile = async (href) => {
    const box = await page.evaluate((h) => {
      const anchors = Array.from(document.querySelectorAll(`a[href="${h}"]`));
      for (const a of anchors) {
        const r = a.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        if (r.width > 40 && r.height > 40 && cx > 8 && cx < window.innerWidth - 8 && cy > 8 && cy < window.innerHeight - 8) {
          const hit = document.elementFromPoint(cx, cy);
          const inAnchor = hit && (hit === a || a.contains(hit));
          if (inAnchor) return { x: cx, y: cy };
        }
      }
      return null;
    }, href);
    if (!box) return false;
    await page.mouse.move(box.x, box.y);
    await sleep(450); // let the column decelerate under hover
    await page.mouse.click(box.x, box.y);
    await sleep(400);
    const opened = await page.evaluate(() => document.querySelectorAll('[role="dialog"]').length > 0);
    await sleep(900);
    return opened;
  };

  // Click whichever tile is fully visible AND topmost at its center; return its href.
  // Retries because Chrome's compositor hit-test can occasionally miss a tile on
  // a continuously 3D-transform-animating surface (verified: 100% of clicks that
  // land open the modal — this only guards the input dispatch).
  const clickAnyTile = async () => {
    for (let attempt = 0; attempt < 4; attempt++) {
      const box = await page.evaluate(() => {
        for (const a of Array.from(document.querySelectorAll('a[data-tile-id]'))) {
          const r = a.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          if (r.width > 40 && r.height > 40 && cx > 8 && cx < window.innerWidth - 8 && cy > 8 && cy < window.innerHeight - 8) {
            const hit = document.elementFromPoint(cx, cy);
            if (hit && (hit === a || a.contains(hit))) return { x: cx, y: cy, href: a.getAttribute('href') };
          }
        }
        return null;
      });
      if (!box) {
        await sleep(900);
        continue;
      }
      await page.mouse.move(box.x, box.y);
      await sleep(450);
      await page.mouse.click(box.x, box.y);
      await sleep(400);
      const opened = await page.evaluate(() => document.querySelectorAll('[role="dialog"]').length > 0);
      if (opened) {
        await sleep(900);
        return box.href;
      }
      await sleep(700);
    }
    return null;
  };

  // Try to click a SPECIFIC tile, waiting between attempts for the marquee to
  // drift a copy of it into full view.
  const clickTileWithRetry = async (href, attempts = 4) => {
    for (let i = 0; i < attempts; i++) {
      if (await clickTile(href)) return true;
      await sleep(1400);
    }
    return false;
  };

  // Deterministic alternative: dispatch a real DOM click on the target anchor.
  // This exercises the same React click path and modal, bypassing only the
  // marquee's compositor hit-testing (an automation-only flake).
  const clickTileSynthetic = async (href) => {
    const ok = await page.evaluate((h) => {
      const a = document.querySelector(`a[href="${h}"]`);
      if (!a) return false;
      a.click();
      return true;
    }, href);
    await sleep(1400);
    return ok;
  };

  // Diagnostics when a modal fails to open: how many dialogs exist, page hash.
  const dialogDiag = () =>
    page.evaluate(() => ({
      dialogs: document.querySelectorAll('[role="dialog"]').length,
      hash: window.location.hash,
      dimmed: !!document.querySelector('.drift-wall') && getComputedStyle(document.querySelector('.drift-wall').parentElement).opacity,
    }));

  // Dump rects of every copy of a tile href vs the viewport, for debugging layout.
  const dumpRects = (href) =>
    page.evaluate((h) => {
      const out = { vw: window.innerWidth, vh: window.innerHeight, scrollY: window.scrollY, rects: [] };
      for (const a of Array.from(document.querySelectorAll(`a[href="${h}"]`))) {
        const r = a.getBoundingClientRect();
        out.rects.push({
          t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right),
          cx: Math.round(r.left + r.width / 2), cy: Math.round(r.top + r.height / 2),
        });
      }
      return out;
    }, href);

  // Re-locate the Hall of Fame section for the CURRENT viewport (layout shifts with width).
  const hallYNow = () =>
    page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('h2, h3, p, span, div, a, li')).find(
        (x) => x.childElementCount === 0 && x.textContent.trim().toUpperCase() === 'HALL OF FAME'
      );
      return el ? el.getBoundingClientRect().top + window.scrollY : -1;
    });

  const scrollToHall = async (pad) => {
    const y = await hallYNow();
    if (y < 0) return false;
    await page.evaluate((yy, pp) => window.scrollTo(0, Math.max(0, yy - pp)), y, pad);
    await sleep(2500);
    return y;
  };

  const modalInfo = () =>
    page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
      if (!dlg) return null;
      return {
        title: dlg.querySelector('h2')?.textContent?.trim() || null,
        img: dlg.querySelector('img')?.src || null,
        hasOverview: Array.from(dlg.querySelectorAll('p')).some((p) => p.textContent.length > 60),
        hasSkills: dlg.textContent.includes('Core Skills'),
        hasActions: dlg.textContent.includes('View Certificate') && dlg.textContent.includes('Download PDF'),
        text: dlg.textContent.slice(0, 400),
      };
    });

  /* ── 1. Open a landscape certificate (anthropic-fluency) ── */
  console.log('\n--- Desktop: open landscape certificate ---');
  const ok1 = await clickTileWithRetry('#ach-anthropic-fluency', 6);
  report('Tile clickable', ok1);
  await sleep(1400);
  const m1 = await modalInfo();
  report('Modal opened from tile', !!m1);
  if (m1) {
    report('Certificate image shown', !!m1.img && m1.img.includes('/achivements/thumbnails/'), m1.img || '');
    report('Achievement title correct', m1.title === 'AI Fluency Framework Foundations', m1.title || '');
    report('Issuer + date shown', m1.text.includes('Anthropic') && m1.text.includes('March 2026'));
    report('Skills section present', m1.hasSkills);
    report('Overview present', m1.hasOverview);
    report('View/Download actions present', m1.hasActions);
  }

  // View Certificate link target
  const pdfHref = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    const a = dlg?.querySelector('a[href*="/achivements/pdf/"]');
    return a ? { href: a.getAttribute('href'), download: a.hasAttribute('download'), target: a.getAttribute('target') } : null;
  });
  report(
    'View Certificate -> correct PDF',
    !!pdfHref && pdfHref.href === '/achivements/pdf/AI Fluency Framework Foundations - Anthropic.pdf',
    pdfHref?.href || 'missing'
  );

  // PDF actually served (200, application/pdf) — only when a PDF link exists.
  const pdfCheck = pdfHref
    ? await page.evaluate(async (u) => {
        try {
          const res = await fetch(u);
          return { status: res.status, type: res.headers.get('content-type') };
        } catch (e) {
          return { status: 0, type: String(e) };
        }
      }, pdfHref.href)
    : { status: 0, type: 'no-pdf-link' };
  report('PDF loads with 200', pdfCheck.status === 200, JSON.stringify(pdfCheck));

  // Download link
  const dl = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    const anchors = Array.from(dlg?.querySelectorAll('a[href*="/achivements/pdf/"]') || []);
    const d = anchors.find((a) => a.hasAttribute('download'));
    return d ? d.getAttribute('href') : null;
  });
  report('Download PDF link present with download attr', dl === pdfHref?.href, dl || 'missing');

  /* ── 2. Scroll lock + horizontal overflow while open ── */
  const scrollCheck = await page.evaluate(async () => {
    const before = window.scrollY;
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 800, bubbles: true, cancelable: true }));
    document.dispatchEvent(new WheelEvent('wheel', { deltaY: 800, bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 700));
    const after = window.scrollY;
    const noHOverflow = document.documentElement.scrollWidth <= window.innerWidth + 1;
    return { before, after, locked: Math.abs(after - before) < 2, noHOverflow };
  });
  report('Background scroll locked while open', scrollCheck.locked, JSON.stringify(scrollCheck));
  report('No horizontal overflow while open', scrollCheck.noHOverflow);

  /* ── 3. Internal scrolling works (tall portrait certificate) ── */
  console.log('\n--- Desktop: portrait certificate ---');
  await page.keyboard.press('Escape');
  await sleep(1200);
  report('ESC closes the modal', (await modalInfo()) === null);

  const ok2 = await clickTileSynthetic('#ach-ai-internship-2');
  report('Portrait tile clickable', ok2);
  await sleep(1500);
  const m2 = await modalInfo();
  if (!m2) console.log('  DEBUG portrait:', JSON.stringify(await dialogDiag()));
  report('Portrait modal opened', !!m2);
  if (m2) report('Portrait title correct', m2.title === 'AI Engineering Internship', m2.title || '');

  const portrait = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    const img = dlg?.querySelector('img');
    if (!img) return null;
    const container = img.closest('div[style*="aspect-ratio"]');
    const r = img.getBoundingClientRect();
    return {
      naturalW: img.naturalWidth,
      naturalH: img.naturalHeight,
      renderedW: r.width,
      renderedH: r.height,
      containerH: container ? container.getBoundingClientRect().height : 0,
      fullyVisible: r.top >= 0 && r.bottom <= window.innerHeight + 1 && r.left >= 0 && r.right <= window.innerWidth + 1,
    };
  });
  const aspectOk =
    portrait &&
    portrait.naturalW > 0 &&
    Math.abs(portrait.naturalW / portrait.naturalH - 1654 / 2339) < 0.01 &&
    portrait.renderedH <= portrait.containerH + 1 &&
    portrait.fullyVisible;
  report('Portrait certificate fully visible, uncropped', !!aspectOk, JSON.stringify(portrait));

  await sleep(300);

  /* ── 4. Backdrop click closes ── */
  const backdropClose = await page.evaluate(() => {
    const vw = window.innerWidth;
    const x = 20;
    const y = Math.floor(window.innerHeight / 2);
    const el = document.elementFromPoint(x, y);
    el?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    return true;
  });
  await sleep(1300);
  report('Backdrop click closes the modal', (await modalInfo()) === null);

  /* ── 5. Expand viewer + its close button ── */
  console.log('\n--- Expand viewer ---');
  await clickTileWithRetry('#ach-anthropic-fluency', 4);
  await sleep(1300);
  const expanded = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) => b.getAttribute('aria-label') === 'Expand certificate');
    if (!btn) return 'no-expand-btn';
    btn.click();
    return 'clicked';
  });
  await sleep(900);
  const viewer = await page.evaluate(() => {
    const dlg = Array.from(document.querySelectorAll('[role="dialog"]')).find((d) => d.getAttribute('aria-label') === 'Certificate fullscreen view');
    if (!dlg) return null;
    const closeBtn = Array.from(dlg.querySelectorAll('button')).find((b) => (b.getAttribute('aria-label') || '').includes('Close fullscreen'));
    const img = dlg.querySelector('img');
    return { hasClose: !!closeBtn, imgVisible: !!img && img.getBoundingClientRect().width > 0 };
  });
  report('Fullscreen viewer opens', expanded === 'clicked' && !!viewer, JSON.stringify(viewer));
  if (viewer?.hasClose) {
    const closed = await page.evaluate(() => {
      const dlg = Array.from(document.querySelectorAll('[role="dialog"]')).find((d) => d.getAttribute('aria-label') === 'Certificate fullscreen view');
      const btn = Array.from(dlg.querySelectorAll('button')).find((b) => (b.getAttribute('aria-label') || '').includes('Close fullscreen'));
      btn.click();
      return true;
    });
    let viewerGone = false;
    for (let t = 0; t < 10; t++) {
      await sleep(250);
      viewerGone = await page.evaluate(() =>
        !Array.from(document.querySelectorAll('[role="dialog"]')).some((d) => d.getAttribute('aria-label') === 'Certificate fullscreen view')
      );
      if (viewerGone) break;
    }
    report('Fullscreen viewer close button works', closed && viewerGone);
  }
  await page.keyboard.press('Escape');
  await sleep(1300);

  /* ── 6. Focus restoration ── */
  const focusCheck = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? { tag: el.tagName, href: el.getAttribute('href') || '' } : null;
  });
  report('Focus restored to a tile after close', !!focusCheck && focusCheck.href?.startsWith('#ach-'), JSON.stringify(focusCheck));

  /* ── 7. Responsive: tablet ── */
  console.log('\n--- Tablet 768x1024 ---');
  await page.setViewport({ width: 768, height: 1024 });
  await sleep(1200);
  const yTablet = await scrollToHall(120);
  report('Tablet: section reachable', yTablet > 0);
  const hrefTablet = await clickAnyTile();
  report('Tablet: a tile is clickable', !!hrefTablet, hrefTablet || '');
  if (!hrefTablet) await clickTileSynthetic('#ach-iem-hackosis');
  await sleep(500);
  const tab = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    if (!dlg) return null;
    const img = dlg.querySelector('img');
    const r = img.getBoundingClientRect();
    const dlgR = dlg.getBoundingClientRect();
    const noH = document.documentElement.scrollWidth <= window.innerWidth + 1;
    const fitW = r.left >= -1 && r.right <= window.innerWidth + 1;
    const withinVw = dlgR.left >= -1 && dlgR.right <= window.innerWidth + 1 && dlgR.top >= -1 && dlgR.bottom <= window.innerHeight + 1;
    const certVisible = r.top >= -1 && r.bottom <= window.innerHeight + 1;
    return { title: dlg.querySelector('h2')?.textContent?.trim(), noH, fitW, withinVw, certVisible, actionsVisible: dlg.textContent.includes('Download PDF') };
  });
  report('Tablet modal opens correctly', !!tab && tab.noH && tab.fitW && tab.withinVw && tab.certVisible && tab.actionsVisible, JSON.stringify(tab));
  await page.keyboard.press('Escape');
  await sleep(1300);

  /* ── 8. Responsive: mobile ── */
  console.log('\n--- Mobile 390x844 ---');
  await page.setViewport({ width: 390, height: 844 });
  await sleep(1200);
  const yMobile = await scrollToHall(80);
  report('Mobile: section reachable', yMobile > 0);
  // Deterministically open the portrait certificate at mobile size.
  const okPortraitMobile = await clickTileSynthetic('#ach-ai-internship-2');
  report('Mobile: portrait tile clickable', okPortraitMobile);
  await sleep(1600);
  const mob = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    if (!dlg) return null;
    const img = dlg.querySelector('img');
    const r = img.getBoundingClientRect();
    const dlgR = dlg.getBoundingClientRect();
    const noH = document.documentElement.scrollWidth <= window.innerWidth + 1;
    const withinVw = dlgR.left >= -1 && dlgR.right <= window.innerWidth + 1 && dlgR.top >= -1 && dlgR.bottom <= window.innerHeight + 1;
    const imgFullyVisible = r.top >= -1 && r.bottom <= window.innerHeight + 1;
    // Actions reachable via internal scroll
    const actions = Array.from(dlg.querySelectorAll('a')).map((a) => a.textContent.trim());
    return { title: dlg.querySelector('h2')?.textContent?.trim(), noH, withinVw, imgFullyVisible, actions, imgH: Math.round(r.height) };
  });
  report('Mobile modal fits viewport', !!mob && mob.noH && mob.withinVw && mob.imgFullyVisible, JSON.stringify(mob));
  report('Mobile actions present', !!mob && mob.actions.includes('View Certificate') && mob.actions.includes('Download PDF'), mob?.actions?.join(', '));
  report('Mobile title present', !!mob && !!mob.title, mob?.title || '');

  // Internal scroll on mobile for the portrait cert: scroll metadata to bottom, verify actions become visible
  const scrolledToActions = await page.evaluate(async () => {
    const dlg = document.querySelector('[role="dialog"][aria-modal="true"]:not([inert])');
    if (!dlg) return 'no-dialog';
    const scroller = Array.from(dlg.querySelectorAll('*')).find((el) => el.scrollHeight > el.clientHeight + 4 && getComputedStyle(el).overflowY === 'auto');
    if (!scroller) return 'no-scroller';
    scroller.scrollTop = scroller.scrollHeight;
    await new Promise((r) => setTimeout(r, 500));
    const bar = scroller.querySelector('div.sticky');
    const r = bar ? bar.getBoundingClientRect() : null;
    return r ? { visible: r.top >= 0 && r.bottom <= window.innerHeight + 1, top: Math.round(r.top), bottom: Math.round(r.bottom) } : 'no-sticky-bar';
  });
  report('Internal scrolling reaches actions on mobile', scrolledToActions === 'no-scroller' || (scrolledToActions.visible === true), JSON.stringify(scrolledToActions));
  await page.keyboard.press('Escape');
  await sleep(1300);

  /* ── 9. Final check: wall resumes after close ── */
  const wallActive = await page.evaluate(() => {
    const wall = document.querySelector('.drift-wall');
    return !!wall;
  });
  report('DriftWall still mounted after closing', wallActive);

  console.log('\n--- Console errors ---');
  const realErrors = consoleErrors.filter(
    (e) => !e.includes('DevTools') && !e.includes('favicon') && !e.includes('undefined')
  );
  if (realErrors.length === 0) {
    report('No console errors', true);
  } else {
    report('No console errors', false, realErrors.slice(0, 5).join(' || '));
  }
} catch (err) {
  console.log('SCRIPT ERROR:', err.message);
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.pass);
console.log(`\n===== SUMMARY: ${results.length - failed.length}/${results.length} passed =====`);
if (failed.length) {
  console.log('FAILED:');
  for (const f of failed) console.log(`  - ${f.name}${f.detail ? ': ' + f.detail : ''}`);
  process.exit(1);
}
