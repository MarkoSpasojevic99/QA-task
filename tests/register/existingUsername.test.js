const { test, expect } = require('@playwright/test');

test('Username Already Taken', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#username', 'Marko99');
    await page.fill('#email', 'novikorisnik@gmail.com');
    await page.fill('#password', '1234567');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The username has already been taken.')).toBeVisible();
});
