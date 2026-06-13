import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BREAKPOINTS = [320, 375, 390, 414, 768, 820, 1024, 1280, 1440, 1920];
const PAGES = ['index.html', 'shop.html', 'contact.html'];

async function runAudit() {
  console.log('Starting Responsive & Layout Audit (Playwright)...');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let totalErrors = 0;

  for (const pageName of PAGES) {
    const filePath = path.resolve(__dirname, '..', '..', pageName);
    const fileUrl = `file://${filePath}`;
    console.log(`\nAuditing ${pageName} at ${fileUrl}...`);

    for (const width of BREAKPOINTS) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(fileUrl);
      await page.waitForTimeout(300); // Allow styles to render

      // Check for horizontal overflow
      const { scrollWidth, clientWidth } = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      const hasOverflow = scrollWidth > clientWidth;
      if (hasOverflow) {
        console.warn(`[FAIL] ${pageName} at ${width}px has horizontal overflow: scrollWidth=${scrollWidth}px, viewportWidth=${clientWidth}px`);
        totalErrors++;
      } else {
        console.log(`[PASS] ${pageName} at ${width}px: width=${clientWidth}px, no overflow`);
      }
    }
  }

  await browser.close();
  console.log(`\nAudit finished with ${totalErrors} overflow errors.`);
  process.exit(totalErrors > 0 ? 1 : 0);
}

runAudit().catch((err) => {
  console.error('Audit failed to run:', err);
  process.exit(1);
});
