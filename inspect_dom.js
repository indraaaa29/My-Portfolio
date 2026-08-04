const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture console messages for warnings
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll down to trigger lazy loading and GSAP scroll triggers
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight || totalHeight > 20000) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  // Wait for images to render
  await new Promise(r => setTimeout(r, 2000));

  const findings = await page.evaluate(() => {
    const images = document.querySelectorAll('img[src*="project-0"]');
    if (images.length === 0) return { error: 'No project images found in DOM' };

    const results = [];

    images.forEach((img, i) => {
      const parent = img.parentElement;
      const grandparent = parent ? parent.parentElement : null;
      const greatGrandparent = grandparent ? grandparent.parentElement : null;

      const getDetails = (el, name) => {
        if (!el) return null;
        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          name,
          tagName: el.tagName,
          className: el.className,
          computedPosition: computed.position,
          computedDisplay: computed.display,
          computedWidth: computed.width,
          computedHeight: computed.height,
          computedAspectRatio: computed.aspectRatio,
          rect: {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
          },
          offsetWidth: el.offsetWidth,
          offsetHeight: el.offsetHeight,
          styleText: el.getAttribute('style')
        };
      };

      results.push({
        imageSrc: img.src,
        hierarchy: {
          image: getDetails(img, 'Image'),
          parent: getDetails(parent, 'Parent (innerRef)'),
          grandparent: getDetails(grandparent, 'Grandparent (containerRef)'),
          greatGrandparent: getDetails(greatGrandparent, 'GreatGrandparent (Variant wrapper)')
        }
      });
    });

    return results;
  });

  console.log(JSON.stringify(findings, null, 2));

  await browser.close();
})();
