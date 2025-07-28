import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('check the number of projects', async ({ page }) => {
  await page.goto('http://localhost:4200/projects');

  const projects = page.locator('.card');
  await expect(projects).toHaveCount(6);
  await expect(projects.nth(0)).toContainText('Aplikacja bar z koktajlami');
});

test('check if card is one image and 2 texts', async ({ page }) => {
  await page.goto('http://localhost:4200/projects');

  const project = page.locator('.card').first();

  await expect(project.locator('img')).toHaveCount(1);

  const language = project.locator('.language');
  await expect(language).toBeVisible();
  await expect(language).not.toHaveText('');

  // 3. Sprawdź, że jest <div class="title"> z tekstem
  const title = project.locator('.title');
  await expect(title).toBeVisible();
  await expect(title).not.toHaveText('');

  // Dokładne sprawdzenie opacity
  await expect
    .poll(() => language.evaluate((el) => getComputedStyle(el).opacity), {
      timeout: 5000,
    })
    .toBe('1');

  await expect
    .poll(() => title.evaluate((el) => getComputedStyle(el).opacity), {
      timeout: 5000,
    })
    .toBe('1');
});

test('check if projects details open', async ({ page }) => {
  await page.goto('http://localhost:4200/projects');

  const firstCard = page.locator('.card').first();
  const cardTitle = await firstCard.locator('.title').textContent();

  // Poczekaj aż .card będzie widoczna i gotowa do kliknięcia
  await expect(firstCard).toBeVisible();

  // Kliknij w kartę
  await firstCard.click();

  // Sprawdź, czy URL zmienił się na /details/cokolwiek
  await expect(page).toHaveURL(/\/details\/\d+$/);

  const detailsTitle = await page.locator('.title').textContent();

  // Porównaj tytuły (po trimming – na wypadek spacji)
  expect(detailsTitle).toBe(cardTitle);
});
