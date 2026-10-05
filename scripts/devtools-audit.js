import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9235;
const BASE_URL = "http://localhost:3001";

const testRoutes = [
  { path: '/', label: 'Home Page' },
  { path: '/products/vci-paper-fabric-reinforced', label: 'VCI Paper Subpage' },
  { path: '/products/company-overview', label: 'Company Overview (About Us)' },
  { path: '/products/leadership', label: 'Leadership (About Us)' },
  { path: '/products/certifications', label: 'Certifications (About Us)' },
  { path: '/products/recognitions', label: 'Recognitions (About Us)' },
  { path: '/products/blown-films', label: 'Blown Films Subpage' },
  { path: '/products/vci-alupack', label: 'VCI Alupack Subpage' },
  { path: '/products/kraft-paper-reinforced-fabric-scrim', label: 'Reinforced Scrim (Composites)' },
  { path: '/products/automotive', label: 'Automotive Sector (Applications)' }
];

async function runDevToolsAudit() {
  console.log('================================================================================');
  console.log('   CHROME DEVTOOLS PROTOCOL (CDP) LIVE CONSOLE & NETWORK AUDIT SUITE           ');
  console.log('================================================================================');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-extensions',
    '--disable-gpu',
    '--user-data-dir=' + process.env.TEMP + '\\cdp-full-audit-' + Date.now(),
    `${BASE_URL}/`
  ]);

  // Wait for DevTools endpoint
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
    console.error('Failed to connect to Chrome CDP endpoint.');
    chromeProc.kill();
    process.exit(1);
  }

  console.log(`Connected to Chrome DevTools Protocol at: ${wsUrl}\n`);
  const ws = new WebSocket(wsUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let msgId = 1;
  const pendingRequests = new Map();

  function sendCommand(method, params = {}) {
    const id = msgId++;
    return new Promise(resolve => {
      pendingRequests.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const consoleErrors = [];
  const consoleWarnings = [];
  const networkErrors = [];
  const networkSuccesses = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingRequests.has(data.id)) {
      pendingRequests.get(data.id)(data.result);
      pendingRequests.delete(data.id);
      return;
    }

    if (data.method === 'Runtime.consoleAPICalled') {
      const type = data.params.type;
      const text = data.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
      if (type === 'error') {
        consoleErrors.push(text);
      } else if (type === 'warning') {
        consoleWarnings.push(text);
      }
    } else if (data.method === 'Runtime.exceptionThrown') {
      const desc = data.params.exceptionDetails?.exception?.description || data.params.exceptionDetails?.text;
      consoleErrors.push(`[Uncaught Exception] ${desc}`);
    } else if (data.method === 'Network.responseReceived') {
      const resp = data.params.response;
      if (resp.status >= 400) {
        networkErrors.push({ url: resp.url, status: resp.status });
      } else {
        networkSuccesses.push({ url: resp.url, status: resp.status });
      }
    }
  };

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Network.enable');

  const auditResults = [];

  for (const item of testRoutes) {
    const targetUrl = `${BASE_URL}${item.path}`;
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`▶ AUDITING: ${item.label.toUpperCase()}`);
    console.log(`  URL: ${targetUrl}`);

    consoleErrors.length = 0;
    consoleWarnings.length = 0;
    networkErrors.length = 0;
    networkSuccesses.length = 0;

    await sendCommand('Page.navigate', { url: targetUrl });

    // Allow 2.5 seconds for complete React rendering, hydration, and network calls
    await new Promise(r => setTimeout(r, 2500));

    // Evaluate live DOM stats in Chrome
    const titleRes = await sendCommand('Runtime.evaluate', { expression: 'document.title' });
    const h1Res = await sendCommand('Runtime.evaluate', { 
      expression: 'document.querySelector("h1") ? document.querySelector("h1").innerText.trim().replace(/\\s+/g, " ") : "No H1"' 
    });
    const imgEval = await sendCommand('Runtime.evaluate', { 
      expression: `
        (() => {
          const imgs = Array.from(document.querySelectorAll("img"));
          const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src);
          const loaded = imgs.filter(i => i.naturalWidth > 0).length;
          return { total: imgs.length, loaded, broken };
        })()
      `,
      returnByValue: true
    });

    const pageTitle = titleRes?.result?.value || '';
    const h1Text = h1Res?.result?.value || '';
    const imgStats = imgEval?.result?.value || { total: 0, loaded: 0, broken: [] };

    const routeResult = {
      label: item.label,
      path: item.path,
      pageTitle,
      h1: h1Text,
      totalImages: imgStats.total,
      loadedImages: imgStats.loaded,
      brokenImages: imgStats.broken,
      consoleErrors: [...consoleErrors],
      consoleWarnings: [...consoleWarnings],
      networkErrors: [...networkErrors]
    };

    auditResults.push(routeResult);

    console.log(`  ✓ Document Title:  "${pageTitle}"`);
    console.log(`  ✓ Primary Heading: "${h1Text.substring(0, 75)}..."`);
    console.log(`  ✓ Images Status:   ${imgStats.loaded}/${imgStats.total} Loaded (Broken: ${imgStats.broken.length})`);
    console.log(`  ✓ Console Errors:  ${consoleErrors.length}`);
    console.log(`  ✓ Network Errors:  ${networkErrors.length}`);

    if (imgStats.broken.length > 0) {
      console.log(`    ⚠ Broken Images:`, imgStats.broken);
    }
    if (consoleErrors.length > 0) {
      console.log(`    ⚠ Console Errors:`, consoleErrors);
    }
    if (networkErrors.length > 0) {
      console.log(`    ⚠ Network 4xx/5xx:`, networkErrors);
    }
  }

  console.log('\n================================================================================');
  console.log('                          FINAL AUDIT SUMMARY REPORT                            ');
  console.log('================================================================================');

  const totalConsoleErrors = auditResults.reduce((acc, r) => acc + r.consoleErrors.length, 0);
  const totalNetworkErrors = auditResults.reduce((acc, r) => acc + r.networkErrors.length, 0);
  const totalBrokenImgs = auditResults.reduce((acc, r) => acc + r.brokenImages.length, 0);
  const totalImagesVerified = auditResults.reduce((acc, r) => acc + r.loadedImages, 0);

  console.log(`Total Routes Verified:         ${auditResults.length}`);
  console.log(`Total Images Rendered & Active: ${totalImagesVerified}`);
  console.log(`Total Broken Images (404/0px):  ${totalBrokenImgs}`);
  console.log(`Total Console Exceptions:      ${totalConsoleErrors}`);
  console.log(`Total Network Failures (4xx):  ${totalNetworkErrors}`);

  if (totalConsoleErrors === 0 && totalNetworkErrors === 0 && totalBrokenImgs === 0) {
    console.log('\nSTATUS: 100% HEALTHY - ALL URLS, IMAGES, AND DEVTOOLS CHECKS PASSED PERFECTLY!');
  } else {
    console.log('\nSTATUS: ATTENTION NEEDED ON DETECTED ISSUES ABOVE.');
  }

  ws.close();
  chromeProc.kill();
  process.exit(0);
}

runDevToolsAudit().catch(err => {
  console.error('DevTools Audit failed:', err);
  process.exit(1);
});
