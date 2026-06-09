#!/usr/bin/env node

import { chromium } from 'playwright';
import fg from 'fast-glob';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif', 'ico'];
const IMAGE_CANDIDATE_RE = new RegExp(String.raw`[^,|'"()\s]+?\.(?:${IMAGE_EXTENSIONS.join('|')})(?:\?[^,|'"()\s]*)?`, 'gi');
const STRING_LITERAL_RE = /(['"`])((?:\\\1|(?:(?!\1).))*?)\1/g;
const URL_RE = /url\((['"]?)(.*?)\1\)/gi;
const SRCSET_SPLIT_RE = /\s*,\s*/;
const MAX_PAGES = Number.parseInt(process.env.AUDIT_MAX_PAGES || '80', 10);
const POST_LOAD_WAIT_MS = Number.parseInt(process.env.AUDIT_POST_LOAD_WAIT_MS || '3000', 10);
const SCROLL_STEP_PX = Number.parseInt(process.env.AUDIT_SCROLL_STEP_PX || '420', 10);
const SCROLL_DELAY_MS = Number.parseInt(process.env.AUDIT_SCROLL_DELAY_MS || '180', 10);
const IMAGE_CHECK_CONCURRENCY = Number.parseInt(process.env.AUDIT_IMAGE_CHECK_CONCURRENCY || '12', 10);
const NAV_SELECTOR = [
  'nav a[href]',
  'header a[href]',
  'a[href*="/collections"]',
  'a[href*="/products"]',
  'a[href="/cart"]',
  'a[href*="/cart"]',
  'a[href*="/password"]'
].join(',');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themeRoot = path.resolve(__dirname, '..');
const reportsDir = path.join(themeRoot, 'reports');
const startUrlArg = process.argv[2];

if (!startUrlArg || startUrlArg === '--help' || startUrlArg === '-h') {
  console.error('Usage: node scripts/audit-broken-images.mjs "https://store.myshopify.com?preview_theme_id=123"');
  process.exit(startUrlArg ? 0 : 1);
}

function csvEscape(value) {
  const stringValue = value === undefined || value === null ? '' : String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

function toCsv(rows, columns) {
  const header = columns.join(',');
  const body = rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','));
  return [header, ...body].join('\n') + '\n';
}

function normalizeUrl(rawUrl, pageUrl) {
  if (!rawUrl || !String(rawUrl).trim()) return { url: '', error: 'empty src' };
  const trimmed = String(rawUrl).trim();
  if (/^(data|blob|mailto|tel|javascript):/i.test(trimmed)) {
    return { url: trimmed, special: true };
  }
  try {
    return { url: new URL(trimmed, pageUrl).toString() };
  } catch (error) {
    return { url: trimmed, error: `invalid URL: ${error.message}` };
  }
}

function parseSrcset(srcset) {
  if (!srcset || !String(srcset).trim()) return [];
  return String(srcset)
    .split(SRCSET_SPLIT_RE)
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function parseCssUrls(value) {
  if (!value || value === 'none') return [];
  const urls = [];
  for (const match of value.matchAll(URL_RE)) {
    if (match[2]) urls.push(match[2]);
  }
  return urls;
}

function imageCandidatesFromText(value) {
  if (!value || !String(value).match(/\.(png|jpe?g|webp|gif|svg|avif|ico)/i)) return [];
  return [...String(value).matchAll(IMAGE_CANDIDATE_RE)].map((match) => match[0]);
}

function filenameFromUrl(imageUrl) {
  try {
    const parsed = new URL(imageUrl);
    return decodeURIComponent(path.basename(parsed.pathname));
  } catch {
    return path.basename(String(imageUrl).split('?')[0] || '');
  }
}

function recommendedFilename(imageUrl) {
  const filename = filenameFromUrl(imageUrl);
  return filename || 'unknown-image-file';
}

function suggestedFix(row) {
  if (!row.image_src) return 'Remove empty image reference or bind it to a valid Shopify image/file setting.';
  if (String(row.status_code).includes('naturalWidth=0') || String(row.status_code).includes('naturalHeight=0')) {
    return 'Confirm the rendered image URL exists and is a valid image; replace the theme setting or asset reference.';
  }
  if (String(row.image_src).includes('/cdn/shop/files/')) {
    return 'Upload the missing file in Shopify Admin -> Content -> Files, then update the file_url/reference if the filename changed.';
  }
  if (String(row.image_src).includes('/cdn/shop/t/')) {
    return 'Add the file to theme assets and reference it with asset_url, or update the Liquid/CSS filename to an existing asset.';
  }
  if (/^https?:\/\//i.test(row.image_src)) {
    return 'Replace the remote URL or upload the image to Shopify Files and reference it with file_url.';
  }
  return 'Update the local theme reference to an existing asset filename or upload the missing image.';
}

function likelySourceTypeFromReference(reference) {
  if (reference.includes('/cdn/shop/files/')) return 'shopify_file_url';
  if (reference.includes('/cdn/shop/t/')) return 'theme_asset_url';
  if (/^https?:\/\//i.test(reference)) return 'external_url';
  if (reference.includes('{{') || reference.includes('| asset_url')) return 'liquid_asset_reference';
  return 'local_theme_reference';
}

function sameSiteUrl(url, start) {
  try {
    const parsed = new URL(url);
    return parsed.origin === start.origin;
  } catch {
    return false;
  }
}

function withPreviewParam(url, start) {
  const previewThemeId = start.searchParams.get('preview_theme_id');
  if (!previewThemeId) return url;
  const parsed = new URL(url);
  if (parsed.origin === start.origin && !parsed.searchParams.has('preview_theme_id')) {
    parsed.searchParams.set('preview_theme_id', previewThemeId);
  }
  return parsed.toString();
}

function isCrawlCandidate(url, start) {
  if (!sameSiteUrl(url, start)) return false;
  const parsed = new URL(url);
  if (/\.(png|jpe?g|webp|gif|svg|avif|ico|pdf|zip)$/i.test(parsed.pathname)) return false;
  return parsed.pathname === '/'
    || parsed.pathname === '/cart'
    || parsed.pathname === '/password'
    || parsed.pathname.includes('/collections')
    || parsed.pathname.includes('/products')
    || parsed.pathname.includes('/pages')
    || parsed.pathname.includes('/search');
}

function compactSelector(selector) {
  return String(selector || '').replace(/\s+/g, ' ').slice(0, 240);
}

async function collectPageImages(page, pageUrl) {
  return page.evaluate(() => {
    const URL_RE_IN_BROWSER = /url\((['"]?)(.*?)\1\)/gi;

    function selectorFor(element) {
      if (!element || element.nodeType !== 1) return '';
      if (element.id) return `${element.tagName.toLowerCase()}#${element.id}`;
      const parts = [];
      let current = element;
      while (current && current.nodeType === 1 && parts.length < 5) {
        let part = current.tagName.toLowerCase();
        const classNames = Array.from(current.classList || []).slice(0, 3);
        if (classNames.length) part += `.${classNames.join('.')}`;
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((sibling) => sibling.tagName === current.tagName);
          if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
        }
        parts.unshift(part);
        current = parent;
      }
      return parts.join(' > ');
    }

    function sectionHintFor(element) {
      const section = element.closest('section, header, footer, main, [data-section-id], [id], [class*="section"], [class*="hero"], [class*="product"], [class*="collection"]');
      if (!section) return '';
      const tag = section.tagName.toLowerCase();
      const id = section.id ? `#${section.id}` : '';
      const classes = Array.from(section.classList || []).slice(0, 4).map((className) => `.${className}`).join('');
      const dataSection = section.getAttribute('data-section-id') ? `[data-section-id="${section.getAttribute('data-section-id')}"]` : '';
      return `${tag}${id}${classes}${dataSection}`;
    }

    function isVisibleElement(element) {
      if (!element || element.nodeType !== 1) return false;
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }

    function backgroundUrls(value) {
      if (!value || value === 'none') return [];
      return [...value.matchAll(URL_RE_IN_BROWSER)].map((match) => match[2]).filter(Boolean);
    }

    const records = [];
    const pushRecord = (element, raw, sourceType, alt = '') => {
      records.push({
        page_url: location.href,
        raw_src: raw || '',
        alt_text: alt || element.getAttribute?.('alt') || '',
        element_selector: selectorFor(element),
        section_hint: sectionHintFor(element),
        likely_source_type: sourceType,
        natural_width: element instanceof HTMLImageElement ? element.naturalWidth : '',
        natural_height: element instanceof HTMLImageElement ? element.naturalHeight : '',
        complete: element instanceof HTMLImageElement ? element.complete : '',
        rendered_broken: element instanceof HTMLImageElement
          ? (!element.currentSrc || !element.complete || element.naturalWidth === 0 || element.naturalHeight === 0)
          : ''
      });
    };

    document.querySelectorAll('img').forEach((img) => {
      pushRecord(img, img.currentSrc || '', 'img[currentSrc]', img.getAttribute('alt') || '');
      pushRecord(img, img.getAttribute('src') || '', 'img[src]', img.getAttribute('alt') || '');
      const srcset = img.getAttribute('srcset');
      if (srcset) pushRecord(img, srcset, 'img[srcset]', img.getAttribute('alt') || '');
      ['data-src', 'data-srcset', 'data-image', 'data-bg', 'data-background'].forEach((attr) => {
        const value = img.getAttribute(attr);
        if (value) pushRecord(img, value, `img[${attr}]`, img.getAttribute('alt') || '');
      });
    });

    document.querySelectorAll('picture source[srcset], source[srcset]').forEach((source) => {
      pushRecord(source, source.getAttribute('srcset') || '', 'picture source[srcset]', '');
    });

    document.querySelectorAll('[data-src], [data-srcset], [data-image], [data-bg], [data-background]').forEach((element) => {
      if (element.tagName.toLowerCase() === 'img') return;
      ['data-src', 'data-srcset', 'data-image', 'data-bg', 'data-background'].forEach((attr) => {
        const value = element.getAttribute(attr);
        if (value) pushRecord(element, value, `[${attr}]`, element.getAttribute('aria-label') || '');
      });
    });

    document.querySelectorAll('[style*="background"]').forEach((element) => {
      const inlineBackground = element.getAttribute('style') || '';
      backgroundUrls(inlineBackground).forEach((url) => {
        pushRecord(element, url, 'inline style background-image', element.getAttribute('aria-label') || '');
      });
    });

    document.querySelectorAll('*').forEach((element) => {
      if (!isVisibleElement(element)) return;
      const background = getComputedStyle(element).backgroundImage;
      backgroundUrls(background).forEach((url) => {
        pushRecord(element, url, 'css background-image', element.getAttribute('aria-label') || '');
      });
    });

    return records;
  }, pageUrl);
}

async function collectPageLinks(page, start) {
  const hrefs = await page.$$eval(NAV_SELECTOR, (links) => links.map((link) => link.href).filter(Boolean));
  const extras = [
    new URL('/cart', start).toString(),
    new URL('/password', start).toString(),
    new URL('/collections/all', start).toString()
  ];
  return [...hrefs, ...extras]
    .map((href) => {
      try {
        return withPreviewParam(href, start);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((href) => isCrawlCandidate(href, start));
}

async function checkImageUrl(requestContext, row) {
  if (!row.image_src) {
    return { status_code: 'empty src', is_broken: true };
  }
  if (/^(data|blob):/i.test(row.image_src)) {
    return { status_code: 'inline/skipped', is_broken: false };
  }
  if (row.url_error) {
    return { status_code: row.url_error, is_broken: true };
  }

  let statusCode = '';
  let broken = false;
  try {
    const response = await requestContext.get(row.image_src, {
      timeout: 15000,
      failOnStatusCode: false
    });
    statusCode = response.status();
    broken = statusCode === 403 || statusCode === 404 || statusCode >= 500 || statusCode >= 400;
  } catch (error) {
    statusCode = `request failed: ${error.message}`;
    broken = true;
  }

  return { status_code: statusCode, is_broken: broken };
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

async function checkImage(requestContext, row, urlStatusCache) {
  const cacheKey = [row.image_src, row.url_error].join('||');
  let urlStatus = urlStatusCache.get(cacheKey);
  if (!urlStatus) {
    urlStatus = await checkImageUrl(requestContext, row);
    urlStatusCache.set(cacheKey, urlStatus);
  }

  let statusCode = urlStatus.status_code;
  let broken = urlStatus.is_broken;

  const isRenderedImg = row.likely_source_type.startsWith('img');
  const naturalWidth = Number(row.natural_width);
  const naturalHeight = Number(row.natural_height);
  if (isRenderedImg && !row.image_src) {
    statusCode = 'empty currentSrc/src';
    broken = true;
  } else if (isRenderedImg && row.rendered_broken === true) {
    const reasons = [];
    if (row.complete === false) reasons.push('complete=false');
    if (naturalWidth === 0) reasons.push('naturalWidth=0');
    if (naturalHeight === 0) reasons.push('naturalHeight=0');
    if (!reasons.length) reasons.push('rendered_broken');
    statusCode = broken ? `${statusCode}; ${reasons.join('; ')}` : reasons.join('; ');
    broken = true;
  }

  return {
    ...row,
    status_code: statusCode,
    is_broken: broken,
    suggested_fix: broken ? suggestedFix({ ...row, status_code: statusCode }) : ''
  };
}

function expandImageRecords(records, pageUrl) {
  const expanded = [];
  for (const record of records) {
    const raw = record.raw_src || '';
    const candidates = [];
    const isBackgroundRecord = record.likely_source_type.includes('background-image');

    if (record.likely_source_type.includes('srcset')) {
      candidates.push(...parseSrcset(raw));
    } else if (record.likely_source_type === 'css background-image') {
      const urls = parseCssUrls(raw);
      candidates.push(...(urls.length ? urls : [raw]));
    } else {
      candidates.push(raw);
    }

    if (isBackgroundRecord && !candidates.length) continue;
    if (!candidates.length) candidates.push('');

    for (const candidate of candidates) {
      const normalized = normalizeUrl(candidate, pageUrl);
      const imageSrc = normalized.url || '';
      expanded.push({
        page_url: record.page_url,
        image_src: imageSrc,
        status_code: '',
        alt_text: record.alt_text || '',
        element_selector: compactSelector(record.element_selector),
        section_hint: record.section_hint || '',
        recommended_filename: recommendedFilename(imageSrc),
        likely_source_type: record.likely_source_type,
        suggested_fix: '',
        natural_width: record.natural_width,
        natural_height: record.natural_height,
        complete: record.complete,
        rendered_broken: record.rendered_broken,
        url_error: normalized.error || ''
      });
    }
  }
  return expanded;
}

async function waitForRenderedStorefront(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 45000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(POST_LOAD_WAIT_MS);
}

async function slowScrollPage(page) {
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForTimeout(250);

  const documentHeight = await page.evaluate(() => Math.max(
    document.body?.scrollHeight || 0,
    document.documentElement?.scrollHeight || 0
  )).catch(() => 0);

  for (let position = 0; position <= documentHeight + SCROLL_STEP_PX; position += SCROLL_STEP_PX) {
    await page.evaluate((nextPosition) => window.scrollTo(0, nextPosition), position).catch(() => {});
    await page.waitForTimeout(SCROLL_DELAY_MS);
  }

  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  await page.waitForTimeout(750);
}

async function crawlSite(startUrl) {
  const start = new URL(startUrl);
  console.log(`Starting URL: ${start.toString()}`);
  console.log(`Max pages: ${MAX_PAGES}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: 'MorganicsImageAudit/1.0'
  });
  const page = await context.newPage();
  const queue = [withPreviewParam(start.toString(), start)];
  const visited = new Set();
  const allImageRows = [];
  let totalCandidates = 0;
  const pageErrors = [];

  while (queue.length && visited.size < MAX_PAGES) {
    const currentUrl = queue.shift();
    if (!currentUrl || visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    try {
      console.log(`Crawling page ${visited.size}: ${currentUrl}`);
      await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await waitForRenderedStorefront(page);

      const beforeScrollRecords = await collectPageImages(page, currentUrl);
      totalCandidates += beforeScrollRecords.length;

      await slowScrollPage(page);

      const afterScrollRecords = await collectPageImages(page, currentUrl);
      totalCandidates += afterScrollRecords.length;

      allImageRows.push(...expandImageRecords([...beforeScrollRecords, ...afterScrollRecords], currentUrl));

      const links = await collectPageLinks(page, start);
      for (const link of links) {
        if (!visited.has(link) && queue.length + visited.size < MAX_PAGES) queue.push(link);
      }
    } catch (error) {
      pageErrors.push({
        page_url: currentUrl,
        image_src: '',
        status_code: `page failed: ${error.message}`,
        alt_text: '',
        element_selector: '',
        section_hint: '',
        recommended_filename: '',
        likely_source_type: 'page',
        suggested_fix: 'Open this page manually and confirm it is accessible from the preview URL.'
      });
    }
  }

  const uniqueMap = new Map();
  for (const row of allImageRows) {
    const key = [row.page_url, row.image_src, row.element_selector, row.likely_source_type].join('||');
    if (!uniqueMap.has(key)) uniqueMap.set(key, row);
  }

  const checkedRows = [];
  const urlStatusCache = new Map();
  checkedRows.push(...await mapWithConcurrency(
    [...uniqueMap.values()],
    IMAGE_CHECK_CONCURRENCY,
    (row) => checkImage(context.request, row, urlStatusCache)
  ));

  await browser.close();

  return {
    visitedPages: [...visited],
    totalCandidates,
    allRows: [...checkedRows, ...pageErrors],
    brokenRows: [...checkedRows.filter((row) => row.is_broken), ...pageErrors]
  };
}

async function scanLocalThemeAssets() {
  const assetFiles = await fg(['assets/**/*'], { cwd: themeRoot, onlyFiles: true, dot: false });
  const assetBasenames = new Set(assetFiles.map((file) => path.basename(file)));
  const assetRelative = new Set(assetFiles.map((file) => file.replace(/^assets\//, '')));
  const sourceFiles = await fg([
    'sections/**/*.{liquid,json}',
    'snippets/**/*.{liquid,json}',
    'templates/**/*.{liquid,json}',
    'layout/**/*.{liquid,json}',
    'assets/**/*.{css,js,json,liquid}',
    'config/**/*.json'
  ], { cwd: themeRoot, onlyFiles: true, dot: false });

  const rows = [];
  for (const sourceFile of sourceFiles) {
    const absolute = path.join(themeRoot, sourceFile);
    const content = await readFile(absolute, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      const literalValues = [...line.matchAll(STRING_LITERAL_RE)].map((match) => match[2]);
      const cssUrlValues = parseCssUrls(line);
      const references = [...literalValues, ...cssUrlValues].flatMap((value) => imageCandidatesFromText(value));
      for (const reference of references) {
        if (!reference || /^(https?:|data:|\/\/)/i.test(reference)) continue;
        const cleanReference = reference.split('?')[0].replace(/^\.?\//, '');
        const basename = path.basename(cleanReference);
        const exists = assetBasenames.has(basename) || assetRelative.has(cleanReference);
        if (!exists) {
          const flattened = cleanReference.replaceAll('/', '-');
          rows.push({
            referenced_file: cleanReference,
            source_file: sourceFile,
            line: index + 1,
            likely_source_type: likelySourceTypeFromReference(line),
            recommended_filename: flattened,
            local_match: '',
            suggested_fix: `Add ${basename} to theme assets, rename the local asset to ${flattened}, or update this reference to an existing asset filename.`
          });
        }
      }
    });
  }
  return rows;
}

async function main() {
  await mkdir(reportsDir, { recursive: true });

  const { visitedPages, totalCandidates, allRows, brokenRows } = await crawlSite(startUrlArg);
  const missingLocalRows = await scanLocalThemeAssets();

  const imageColumns = [
    'page_url',
    'image_src',
    'status_code',
    'alt_text',
    'element_selector',
    'section_hint',
    'recommended_filename',
    'likely_source_type',
    'suggested_fix'
  ];
  const missingColumns = [
    'referenced_file',
    'source_file',
    'line',
    'likely_source_type',
    'recommended_filename',
    'local_match',
    'suggested_fix'
  ];

  await writeFile(path.join(reportsDir, 'all-images-found.csv'), toCsv(allRows, imageColumns), 'utf8');
  await writeFile(path.join(reportsDir, 'broken-images-report.csv'), toCsv(brokenRows, imageColumns), 'utf8');
  await writeFile(path.join(reportsDir, 'missing-local-assets.csv'), toCsv(missingLocalRows, missingColumns), 'utf8');

  console.log('Morganics broken image audit complete.');
  console.log(`Starting URL: ${startUrlArg}`);
  console.log(`Pages crawled: ${visitedPages.length}`);
  console.log(`Total image candidates found: ${totalCandidates}`);
  console.log(`Total unique images found: ${allRows.length}`);
  console.log(`Broken images found: ${brokenRows.length}`);
  console.log(`Missing local asset references: ${missingLocalRows.length}`);
  console.log(`Reports saved to: ${reportsDir}`);
  console.log('- reports/broken-images-report.csv');
  console.log('- reports/all-images-found.csv');
  console.log('- reports/missing-local-assets.csv');
  if (allRows.length === 0) {
    console.log('WARNING: No images found. Audit did not inspect rendered storefront correctly.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
