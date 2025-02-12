const { test, expect } = require('@playwright/test');

test('Invalid Email Format', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#username', 'marko1568');
    await page.fill('#email', 'marko.gmail.com');
    await page.fill('#password', '1234567');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The email field format is invalid.')).toBeVisible();
});
