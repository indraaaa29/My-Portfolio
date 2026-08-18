import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => {
    const container = document.querySelector('.line-waves-container');
    const canvas = container ? container.querySelector('canvas') : null;
    const wrapper = document.querySelector('div:has(> .line-waves-container)') || container?.parentElement;
    
    if (!container) return { error: 'Container not found' };
    if (!canvas) return { error: 'Canvas not found' };

    const cRect = container.getBoundingClientRect();
    const canRect = canvas.getBoundingClientRect();
    const wRect = wrapper.getBoundingClientRect();

    const cStyle = window.getComputedStyle(container);
    const wStyle = window.getComputedStyle(wrapper);

    // Find if something is covering it
    const elementsOverCanvas = document.elementsFromPoint(canRect.left + canRect.width / 2, canRect.top + canRect.height / 2);
    
    return {
      wrapper: {
        width: wRect.width,
        height: wRect.height,
        position: wStyle.position,
        zIndex: wStyle.zIndex,
        opacity: wStyle.opacity,
        display: wStyle.display,
        pointerEvents: wStyle.pointerEvents,
      },
      container: {
        width: cRect.width,
        height: cRect.height,
        position: cStyle.position,
        zIndex: cStyle.zIndex,
        display: cStyle.display,
      },
      canvas: {
        width: canRect.width,
        height: canRect.height,
        webgl: !!canvas.getContext('webgl') || !!canvas.getContext('webgl2')
      },
      elementsOverCanvas: elementsOverCanvas.map(e => ({
        tagName: e.tagName,
        className: e.className,
        id: e.id,
        bg: window.getComputedStyle(e).backgroundColor,
        zIndex: window.getComputedStyle(e).zIndex
      }))
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
