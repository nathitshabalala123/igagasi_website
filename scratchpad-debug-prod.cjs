const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));
  page.on('requestfailed', (req) => console.log('REQUEST FAILED:', req.url(), req.failure()?.errorText));

  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('config.yml')) {
      console.log('RESPONSE for', url, '-> status', res.status());
      try {
        const text = await res.text();
        console.log('BODY LENGTH:', text.length);
        console.log('BODY (first 300 chars):', text.slice(0, 300));
      } catch (e) {
        console.log('Could not read body:', e.message);
      }
    }
  });

  await page.goto('https://igagasi-website.vercel.app/admin', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  await browser.close();
})();
