const { test, expect } = require('@playwright/test');

test('Missing Email', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#username', 'marko99');
    await page.fill('#password', '1234567');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The email field is required.')).toBeVisible();
});
