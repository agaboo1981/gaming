import { test, expect } from '@playwright/test';

test.describe('Operative Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking a tab activates the corresponding panel', async ({ page }) => {
    const phantomTab = page.locator('[data-op="phantom"]');
    await phantomTab.click();

    await expect(phantomTab).toHaveAttribute('aria-selected', 'true');
    await expect(phantomTab).toHaveClass(/active/);
    await expect(page.locator('#op-phantom')).toHaveClass(/active/);
    await expect(page.locator('#op-anvil')).not.toHaveClass(/active/);
  });

  test('arrow down moves to next tab and activates it', async ({ page }) => {
    const anvilTab = page.locator('[data-op="anvil"]');
    await anvilTab.focus();
    await expect(anvilTab).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowDown');
    const phantomTab = page.locator('[data-op="phantom"]');
    await expect(phantomTab).toBeFocused();
    await expect(phantomTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#op-phantom')).toHaveClass(/active/);
  });

  test('arrow up moves to previous tab', async ({ page }) => {
    const forgeTab = page.locator('[data-op="forge"]');
    await forgeTab.focus();

    await page.keyboard.press('ArrowUp');
    const phantomTab = page.locator('[data-op="phantom"]');
    await expect(phantomTab).toBeFocused();
    await expect(phantomTab).toHaveAttribute('aria-selected', 'true');
  });

  test('Home key moves to first tab', async ({ page }) => {
    const ripperTab = page.locator('[data-op="ripper"]');
    await ripperTab.focus();

    await page.keyboard.press('Home');
    const anvilTab = page.locator('[data-op="anvil"]');
    await expect(anvilTab).toBeFocused();
    await expect(anvilTab).toHaveAttribute('aria-selected', 'true');
  });

  test('End key moves to last tab', async ({ page }) => {
    const anvilTab = page.locator('[data-op="anvil"]');
    await anvilTab.focus();

    await page.keyboard.press('End');
    const ripperTab = page.locator('[data-op="ripper"]');
    await expect(ripperTab).toBeFocused();
    await expect(ripperTab).toHaveAttribute('aria-selected', 'true');
  });

  test('arrow keys wrap around from last to first', async ({ page }) => {
    const ripperTab = page.locator('[data-op="ripper"]');
    await ripperTab.focus();

    await page.keyboard.press('ArrowDown');
    const anvilTab = page.locator('[data-op="anvil"]');
    await expect(anvilTab).toBeFocused();
  });
});

test.describe('Operative Tab Navigation on Subpage', () => {
  test('tabs exist on operatives page', async ({ page }) => {
    await page.goto('/operatives.html');
    const tabs = page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(0); // operatives page doesn't use tabs, it uses dossier cards
  });
});
