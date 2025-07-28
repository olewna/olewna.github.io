import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Portfolio/);
});

test('go to projekty', async ({ page }) => {
  // Click the get started link.
  await page.click('nav >> text=Projekty');

  // expect link to have projects in it
  await expect(page).toHaveURL(/\/projects$/);
});
