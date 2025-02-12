const { test, expect } = require('@playwright/test');

test('Logout Test', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');
    await page.waitForSelector('svg.w-8.h-16');
    await page.click('svg.w-8.h-16');
    await page.waitForSelector('button:has-text("Log Out")');
    await page.click('button:has-text("Log Out")');
    await expect(page).toHaveURL('https://automaticityacademy.ngrok.app/');
});
