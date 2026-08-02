import { test, expect } from '@playwright/test';

test.describe('Signal Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens on button click', async ({ page }) => {
    await page.click('#trailer-btn');
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);
  });

  test('closes on Escape key', async ({ page }) => {
    await page.click('#trailer-btn');
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(page.locator('#signal-modal')).not.toHaveClass(/active/);
  });

  test('closes on backdrop click', async ({ page }) => {
    await page.click('#trailer-btn');
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);

    // Click top-left corner of backdrop (outside the modal wrapper)
    await page.locator('.modal-backdrop').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#signal-modal')).not.toHaveClass(/active/);
  });

  test('closes on close button click', async ({ page }) => {
    await page.click('#trailer-btn');
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);

    await page.click('#modal-close-btn');
    await expect(page.locator('#signal-modal')).not.toHaveClass(/active/);
  });

  test('focus is trapped inside modal', async ({ page }) => {
    await page.click('#trailer-btn');
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);

    // The close button should receive focus
    const closeBtn = page.locator('#modal-close-btn');
    await expect(closeBtn).toBeFocused();

    // Tab should stay within the modal
    await page.keyboard.press('Tab');
    await expect(closeBtn).toBeFocused(); // only focusable element in modal
  });

  test('focus returns to trigger button after close', async ({ page }) => {
    const trailerBtn = page.locator('#trailer-btn');
    await trailerBtn.click();
    await expect(page.locator('#signal-modal')).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(trailerBtn).toBeFocused();
  });

  test('body scroll is locked when modal is open', async ({ page }) => {
    await page.click('#trailer-btn');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });

  test('body scroll is restored after modal close', async ({ page }) => {
    await page.click('#trailer-btn');
    await page.keyboard.press('Escape');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('');
  });
});
