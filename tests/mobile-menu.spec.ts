import { test, expect } from '@playwright/test';

test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
  });

  test('mobile toggle is visible on small screens', async ({ page }) => {
    await expect(page.locator('#mobile-toggle')).toBeVisible();
  });

  test('desktop nav links are hidden on small screens', async ({ page }) => {
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeHidden();
  });

  test('menu opens on toggle click', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);
    await expect(page.locator('#mobile-menu-overlay')).toHaveClass(/active/);
  });

  test('menu closes on Escape key', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/active/);
  });

  test('menu closes on overlay click', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    await page.click('#mobile-menu-overlay');
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/active/);
  });

  test('menu closes on close button click', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    await page.click('#mobile-close');
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/active/);
  });

  test('focus is trapped inside mobile menu', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    // Tab through all focusable elements and verify focus stays inside
    const focusableInMenu = page.locator('#mobile-menu a, #mobile-menu button');
    const count = await focusableInMenu.count();

    // Focus should start on first focusable element
    await expect(focusableInMenu.first()).toBeFocused();

    // Tab through all elements
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
    }

    // After tabbing through all, focus should wrap back to first
    await expect(focusableInMenu.first()).toBeFocused();
  });

  test('focus returns to toggle button after close', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-toggle')).toBeFocused();
  });

  test('clicking a nav link closes the menu', async ({ page }) => {
    await page.click('#mobile-toggle');
    await expect(page.locator('#mobile-menu')).toHaveClass(/active/);

    await page.click('.mobile-link >> text=Directives');
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/active/);
  });

  test('body scroll is locked when menu is open', async ({ page }) => {
    await page.click('#mobile-toggle');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });

  test('body scroll is restored after menu close', async ({ page }) => {
    await page.click('#mobile-toggle');
    await page.keyboard.press('Escape');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('');
  });
});
