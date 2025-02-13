const { test, expect } = require('@playwright/test');

test('Get API', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');

    page.on('request', (request) => {
        if (request.method() === 'GET') {
            console.log(`📡 API GET: ${request.url()}`); //otkloniti console log
        }
    });

    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');
});

mapraviti .gitignore za test-results
dodati ovde expect 

micemo api

test.describe.parallel('Login tests', () => {}

dodavanja vise expexta posle svakog logina ili klika

constante napraviti novi fajl

srpski izbaciti u potpunosti
