const { test, expect } = require('@playwright/test');

test('Missing Password', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.fill('#email', 'markospasojevic99@gmail.com');
    await page.click('span:has-text("Sign in")');
    await expect(page.locator('text=The password field is required.')).toBeVisible();
});
