import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
  });
}

test('the approved preview loads real assets, eight synthetic units and clear notices', async ({ page }, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('./');
  await settle(page);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bývanie, práca');
  await expect(page.locator('.preview-badge')).toHaveText('Náhled');
  await expect(page.locator('.preview-notice')).toContainText('fiktívne fotografie');
  await expect(page.locator('#unit-rows tr')).toHaveCount(8);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  expect(await page.locator('img[src]').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('600 16px Manrope'))).toBe(true);
  expect(errors).toEqual([]);
  await page.getByRole('link', { name: 'Dom BALCON, úvodná stránka', exact: true }).click();
  await expect(page).toHaveURL(/\/index\.html$/);
  await expect(page.locator('#unit-rows tr')).toHaveCount(8);
  await settle(page);
  await page.screenshot({ path: `.impeccable/review/${info.project.name}.png`, fullPage: true, animations: 'disabled' });
});

test('type and status filters compose, including reset from an empty result', async ({ page }, info) => {
  await page.goto('./');
  await page.locator('#type-filter').selectOption('administrativa');
  await expect(page.locator('#unit-rows tr')).toHaveCount(2);
  await page.locator('#status-filter').selectOption('Rezervované');
  await expect(page.locator('#unit-rows tr')).toHaveCount(1);
  await expect(page.locator('#unit-rows')).toContainText('A2.2');
  await page.locator('#type-filter').selectOption('obchod');
  await expect(page.locator('#empty-state')).toBeVisible();
  await expect(page.locator('#result-count')).toHaveText('Zobrazených 0 z 8 jednotiek');
  await page.screenshot({ path: `.impeccable/review/${info.project.name}-empty.png`, fullPage: true });
  await page.locator('#reset-filters').click();
  await expect(page.locator('#unit-rows tr')).toHaveCount(8);
  await expect(page.locator('#type-filter')).toBeFocused();
});

test('every unit has a shareable detail and correctly separated areas', async ({ page }, info) => {
  await page.goto('./#jednotka/P5.1');
  const dialog = page.getByRole('dialog', { name: 'Jednotka P5.1' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('#inquiry-form')).not.toBeVisible();
  await expect(dialog.locator('.detail-type')).toContainText('Podkrovný apartmán');
  await expect(dialog.locator('.area-list')).toContainText('84,2');
  await expect(dialog.locator('.area-list')).toContainText('12,0');
  await expect(dialog.locator('.detail-note').first()).toContainText('Fiktívne');
  await settle(page);
  await page.screenshot({ path: `.impeccable/review/${info.project.name}-detail.png` });
  await page.reload();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Kopírovať odkaz na jednotku' }).click();
  await expect(dialog.locator('#share-result')).not.toBeEmpty();
  if (await dialog.locator('#share-fallback').isVisible()) await expect(dialog.locator('#share-fallback')).toHaveValue(/#jednotka\/P5.1$/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  expect(page.url()).not.toContain('#jednotka/');
  for (const id of ['B3.1','B3.2','B4.1','B4.2','A2.1','A2.2','O1.1','P5.1']) {
    await page.goto(`./#jednotka/${id}`);
    await expect(page.getByRole('heading', { name: `Jednotka ${id}`, exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
  }
});

test('inquiry preselects its unit, validates fields and never sends or stores personal data', async ({ page, context }, info) => {
  const posts = [];
  page.on('request', request => { if (request.method() !== 'GET') posts.push(request.url()); });
  await page.goto('./');
  await page.getByRole('link', { name: 'Mám záujem o jednotku B3.1', exact: true }).click();
  await expect(page).toHaveURL(/#dopyt\/B3.1$/);
  const dialog = page.locator('#unit-dialog');
  await expect(dialog.locator('#inquiry-form')).toBeVisible();
  await expect(dialog.getByLabel('Meno', { exact: true })).toBeFocused();
  await expect(dialog.locator('#inquiry-form')).toContainText('B3.1');
  await expect(dialog.getByRole('button', { name: 'Zavrieť detail', exact: true })).toBeInViewport();
  await page.screenshot({ path: `.impeccable/review/${info.project.name}-inquiry.png` });
  await dialog.getByRole('button', { name: 'Vyskúšať formulár' }).click();
  await expect(dialog.locator('#form-result')).not.toBeVisible();
  await dialog.getByLabel('Meno', { exact: true }).fill('Ukážkové meno');
  await dialog.getByLabel('E-mail', { exact: true }).fill('not-an-email');
  await dialog.getByRole('button', { name: 'Vyskúšať formulár' }).click();
  await expect(dialog.locator('#form-result')).not.toBeVisible();
  await dialog.getByLabel('E-mail', { exact: true }).fill('demo@example.com');
  await dialog.getByRole('button', { name: 'Vyskúšať formulár' }).click();
  await expect(dialog.locator('#form-result')).toContainText('Nič sa neodoslalo ani neuložilo');
  await expect(dialog.getByRole('button', { name: 'Zavrieť detail', exact: true })).toBeInViewport();
  await expect(dialog.getByLabel('Meno', { exact: true })).toHaveValue('');
  expect(posts).toEqual([]);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0,0]);
  await page.screenshot({ path: `.impeccable/review/${info.project.name}-inquiry-result.png` });
  await dialog.getByRole('button', { name: 'Zavrieť detail', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Mám záujem o jednotku B3.1', exact: true })).toBeFocused();
});

test('gallery can be enlarged and dismissed with the keyboard', async ({ page }, info) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Zväčšiť ilustráciu interiéru bytu' }).click();
  await expect(page.getByRole('dialog', { name: 'Interiér bytu — ilustrácia' })).toBeVisible();
  await settle(page);
  await page.screenshot({ path: `.impeccable/review/${info.project.name}-gallery.png` });
  await page.keyboard.press('Escape');
  await expect(page.locator('#image-dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Zväčšiť ilustráciu interiéru bytu' })).toBeFocused();
});

test('navigation works at narrow widths without horizontal overflow', async ({ page }, info) => {
  await page.goto('./');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded','true');
    await page.getByRole('link', { name: 'Ponuka', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded','false');
    await expect(page).toHaveURL(/#ponuka$/);
  }
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `horizontal overflow at ${width}px`).toBe(true);
  }
});

test('core page and unit detail pass automated accessibility checks', async ({ page }) => {
  await page.goto('./');
  await settle(page);
  const main = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(main.violations).toEqual([]);
  await page.goto('./#jednotka/A2.1');
  await expect(page.locator('#unit-dialog')).toBeVisible();
  const detail = await new AxeBuilder({ page }).include('#unit-dialog').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(detail.violations).toEqual([]);
});
