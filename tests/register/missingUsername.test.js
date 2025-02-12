const { test, expect } = require('@playwright/test');

test('Missing Username', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#email', 'markospasojevic99@gmail.com');
    await page.fill('#password', '1234567');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The username field is required.')).toBeVisible();
});
