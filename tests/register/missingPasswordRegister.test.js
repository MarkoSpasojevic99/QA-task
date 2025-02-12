const { test, expect } = require('@playwright/test');

test('Missing Password', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');
    await page.fill('#username', 'marko99');
    await page.fill('#email', 'markospasojevic99@gmail.com');
    await page.click('button:has-text("Register")');
    await expect(page.locator('text=The password field is required.')).toBeVisible();
});
