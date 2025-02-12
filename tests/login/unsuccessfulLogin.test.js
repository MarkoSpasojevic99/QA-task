const { test, expect } = require('@playwright/test');

test('Unsuccessful Login - Wrong Password', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '12345678');
    await page.click('span:has-text("Sign in")');
    await expect(page.locator('text=The email address or password you entered is invalid')).toBeVisible();
});
