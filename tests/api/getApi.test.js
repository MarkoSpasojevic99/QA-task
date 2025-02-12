const { test, expect } = require('@playwright/test');

test('Presretanje API poziva - GET zahtevi', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');

    page.on('request', (request) => {
        if (request.method() === 'GET') {
            console.log(`📡 API GET: ${request.url()}`);
        }
    });

    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');
});

