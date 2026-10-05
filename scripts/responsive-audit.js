import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9258;
const BASE_URL = "http://localhost:3001";

const testDevices = [
  { name: 'iPhone SE (320px)', width: 320, height: 568, deviceScaleFactor: 2, isMobile: true },
  { name: 'iPhone 8 / SE (375px)', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
  { name: 'iPhone 14/15 Pro (393px)', width: 393, height: 852, deviceScaleFactor: 3, isMobile: true },
  { name: 'Samsung Galaxy / Pixel (412px)', width: 412, height: 915, deviceScaleFactor: 2.6, isMobile: true },
  { name: 'iPad Portrait (768px)', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'iPad Landscape (1024px)', width: 1024, height: 768, deviceScaleFactor: 2, isMobile: true },
  { name: 'Compact Laptop (1280px)', width: 1280, height: 800, deviceScaleFactor: 1, isMobile: false },
  { name: 'Full HD Desktop (1920px)', width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false }
];

const testRoutes = [
  '/',
  '/products/vci-paper-fabric-reinforced',
  '/products/company-overview',
  '/products/leadership'
];

async function runResponsiveAudit() {
  console.log('================================================================================');
  console.log('      COMPREHENSIVE MULTI-DEVICE RESPONSIVENESS & BREAKPOINT AUDIT              ');
  console.log('================================================================================');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-extensions',
    '--disable-gpu',
    '--user-data-dir=' + process.env.TEMP + '\\cdp-responsive-audit-' + Date.now(),
    `${BASE_URL}/`
  ]);

  let wsUrl = null;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await res.json();
      const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension'));
      if (pageTab && pageTab.webSocketDebuggerUrl) {
        wsUrl = pageTab.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Failed to connect to Chrome DevTools endpoint.');
    chromeProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let msgId = 1;
  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await send('Page.enable');
  await send('DOM.enable');

  let totalTests = 0;
  let totalOverflows = 0;
  const issues = [];

  for (const device of testDevices) {
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`📱 TESTING DEVICE: ${device.name} [Viewport: ${device.width}x${device.height}]`);
    console.log(`--------------------------------------------------------------------------------`);

    // Override Device Metrics
    await send('Emulation.setDeviceMetricsOverride', {
      width: device.width,
      height: device.height,
      deviceScaleFactor: device.deviceScaleFactor,
      mobile: device.isMobile
    });

    for (const route of testRoutes) {
      totalTests++;
      const url = `${BASE_URL}${route}`;
      await send('Page.navigate', { url });
      await new Promise(r => setTimeout(r, 900));

      // Evaluate document metrics & check for horizontal overflow
      const metricsEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const body = document.body;
            const doc = document.documentElement;
            const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
            const clientWidth = window.innerWidth;
            const hasHorizontalScroll = scrollWidth > clientWidth + 1; // 1px threshold for subpixels

            // Find elements that bleed past clientWidth (excluding children clipped by scrollable/hidden parents)
            const overflowingElements = [];
            if (hasHorizontalScroll) {
              const allElements = document.querySelectorAll('*');
              for (const el of allElements) {
                const rect = el.getBoundingClientRect();
                if (rect.right > clientWidth + 2 && rect.width > 0 && rect.height > 0) {
                  let isClipped = false;
                  let p = el.parentElement;
                  while (p && p !== document.body && p !== document.documentElement) {
                    const s = window.getComputedStyle(p);
                    if (s.overflowX === 'hidden' || s.overflowX === 'auto' || s.overflowX === 'scroll' || s.overflow === 'hidden') {
                      isClipped = true;
                      break;
                    }
                    p = p.parentElement;
                  }
                  if (!isClipped) {
                    const tag = el.tagName.toLowerCase();
                    const cls = el.className ? (typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') : '';
                    const id = el.id ? '#' + el.id : '';
                    overflowingElements.push({
                      selector: tag + id + cls,
                      right: Math.round(rect.right),
                      width: Math.round(rect.width),
                      overflow: Math.round(rect.right - clientWidth)
                    });
                  }
                }
              }
            }

            // Check if burger menu is visible when width <= 1280
            const mobileBurger = document.querySelector('.menu-btn');
            const burgerVisible = mobileBurger ? window.getComputedStyle(mobileBurger).display !== 'none' : false;

            // Check floating elements spacing (WhatsApp & Ask SIPL)
            const waBtn = document.querySelector('.whatsapp-float-btn');
            const askBtn = document.querySelector('.ask-sipl-launcher');
            let widgetsOverlap = false;
            if (waBtn && askBtn) {
              const waRect = waBtn.getBoundingClientRect();
              const askRect = askBtn.getBoundingClientRect();
              widgetsOverlap = !(waRect.right < askRect.left || 
                                 waRect.left > askRect.right || 
                                 waRect.bottom < askRect.top || 
                                 waRect.top > askRect.bottom);
            }

            return {
              scrollWidth,
              clientWidth,
              hasHorizontalScroll,
              overflowAmount: scrollWidth - clientWidth,
              overflowingCount: overflowingElements.length,
              topOverflows: overflowingElements.slice(0, 5),
              burgerVisible,
              widgetsOverlap
            };
          })()
        `,
        returnByValue: true
      });

      const res = metricsEval.result.value;

      if (res.hasHorizontalScroll) {
        totalOverflows++;
        console.log(`  ❌ Route: ${route} - OVERFLOW DETECTED: scrollWidth=${res.scrollWidth}px > viewport=${res.clientWidth}px (+${res.overflowAmount}px)`);
        if (res.topOverflows.length > 0) {
          console.log(`     Culprits: ${res.topOverflows.map(o => `${o.selector} (+${o.overflow}px)`).join(', ')}`);
        }
        issues.push({
          device: device.name,
          route,
          overflow: res.overflowAmount,
          elements: res.topOverflows
        });
      } else {
        console.log(`  ✓ Route: ${route.padEnd(38)} [No Horizontal Overflow: width=${res.clientWidth}px]`);
      }

      if (device.width <= 1280 && !res.burgerVisible) {
        console.log(`     ⚠️ Warning: Hamburger menu button not visible on ${device.name}`);
      }

      if (res.widgetsOverlap) {
        console.log(`     ⚠️ Warning: Floating WhatsApp and Ask SIPL chat buttons overlap on ${device.name}`);
      }
    }
  }

  console.log('\n================================================================================');
  console.log('                          RESPONSIVE AUDIT SUMMARY REPORT                       ');
  console.log('================================================================================');
  console.log(`Total Device-Route Tests:   ${totalTests}`);
  console.log(`Horizontal Overflows Found: ${totalOverflows}`);

  if (totalOverflows === 0) {
    console.log('\nSTATUS: 100% PERFECT RESPONSIVENESS ACROSS ALL TESTED DEVICES & VIEWPORTS!');
  } else {
    console.log(`\nSTATUS: ${totalOverflows} RESPONSIVE ISSUES DETECTED - NEEDS ATTENTION.`);
  }

  ws.close();
  chromeProc.kill();
  process.exit(totalOverflows > 0 ? 1 : 0);
}

runResponsiveAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
