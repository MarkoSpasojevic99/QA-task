const { test, expect } = require('@playwright/test');

test('Missing Email', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.fill('#password', '1234567');
    await page.click('span:has-text("Sign in")');
    await expect(page.locator('text=The email field is required.')).toBeVisible();
});
