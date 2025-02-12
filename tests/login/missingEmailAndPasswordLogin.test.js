const { test, expect } = require('@playwright/test');

test('Missing Email and Password', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.click('span:has-text("Sign in")');
    await expect(page.locator('text=The email field is required.')).toBeVisible();
    await expect(page.locator('text=The password field is required.')).toBeVisible();
});
