const { test, expect } = require('@playwright/test');

test('Email Already Taken', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#username', 'novikorisnik');
    await page.fill('#email', 'MarkoSPasojeviC99@gMall.com');
    await page.fill('#password', '1234567');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The email has already been taken.')).toBeVisible();
});
