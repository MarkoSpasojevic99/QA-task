const { test, expect } = require('@playwright/test');

test('Successful Login', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');
    await expect(page).toHaveURL(/dashboard/);
    await expect(page).toHaveTitle(/Academy Ecommerce App/);
});
