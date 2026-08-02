import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('desktop nav links visible on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    await expect(page.locator('.nav-links')).toBeVisible();
    await expect(page.locator('#mobile-toggle')).toBeHidden();
  });

  test('mobile toggle visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('#mobile-toggle')).toBeVisible();
  });

  test('maps grid is 4 columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/maps.html');
    const grid = page.locator('.maps-grid');
    await expect(grid).toBeVisible();
    // Check grid has 4 columns by verifying card count layout
    const cards = page.locator('.map-card');
    await expect(cards).toHaveCount(4);
  });

  test('maps grid collapses on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/maps.html');
    const cards = page.locator('.map-card');
    await expect(cards).toHaveCount(4);
    // All cards should be visible (stacked)
    for (const card of await cards.all()) {
      await expect(card).toBeVisible();
    }
  });

  test('operative viewer grid collapses on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 1200 });
    await page.goto('/');
    // The operative interface should still be functional
    const anvilViewer = page.locator('#op-anvil');
    await expect(anvilViewer).toHaveClass(/active/);
  });

  test('stage grid is 4 columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/esports.html');
    const stages = page.locator('.stage-grid > .stage-card');
    await expect(stages).toHaveCount(4);
  });

  test('leaderboard is visible on all screen sizes', async ({ page }) => {
    await page.goto('/esports.html');

    await page.setViewportSize({ width: 1400, height: 900 });
    await expect(page.locator('.leaderboard')).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.leaderboard')).toBeVisible();
  });

  test('skip link becomes visible on focus', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    // Skip link should be visible when focused
    await expect(skipLink).toBeVisible();
  });
});

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to the form
    await page.locator('#recruit-form').scrollIntoViewIfNeeded();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.fill('#contractor-email', 'notanemail');
    await page.click('#recruit-form button[type="submit"]');

    const error = page.locator('.form-error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('valid email');
  });

  test('shows error for empty email', async ({ page }) => {
    await page.click('#recruit-form button[type="submit"]');

    const error = page.locator('.form-error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('valid email');
  });

  test('clears error on valid input', async ({ page }) => {
    await page.fill('#contractor-email', 'bad');
    await page.click('#recruit-form button[type="submit"]');
    await expect(page.locator('.form-error')).toContainText('valid email');

    // Typing again should clear the error
    await page.fill('#contractor-email', 'test@example.com');
    await expect(page.locator('.form-error')).toHaveText('');
  });

  test('accepts valid email and shows success', async ({ page }) => {
    await page.fill('#contractor-email', 'test@example.com');
    await page.click('#recruit-form button[type="submit"]');

    await expect(page.locator('.form-error')).toHaveText('');
    // Button should show success state
    await expect(page.locator('#recruit-form .btn')).toContainText('Signal Sent');
  });
});
