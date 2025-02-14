const { test, expect } = require('@playwright/test');
const config = require('./const');

test.describe.parallel('Login and Logout Tests', () => {
    
    test('Email Already Taken', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', 'novikorisnik');
        await page.fill('#email', config.USER_CREDENTIALS.EMAIL);
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.EMAIL_TAKEN}`)).toBeVisible();
    });
    
    test('Username Already Taken', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', config.USER_DETAILS.USERNAME);
        await page.fill('#email', 'novikorisnik@gmail.com');
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.USERNAME_TAKEN}`)).toBeVisible();
    });

    test('Invalid Email Format', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', 'marko1568');
        await page.fill('#email', 'marko.gmail.com');
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.INVALID_EMAIL_FORMAT}`)).toBeVisible();
    });

    test('Missing Email', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', config.USER_DETAILS.USERNAME);
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.EMAIL_REQUIRED}`)).toBeVisible();
    });

    test('Missing Password', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', config.USER_DETAILS.USERNAME);
        await page.fill('#email', config.USER_DETAILS.EMAIL);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.PASSWORD_REQUIRED}`)).toBeVisible();
    });
    
    test('Missing Username', async ({ page }) => {
        await page.goto(config.REGISTER_URL);
        await page.fill('#email', config.USER_DETAILS.EMAIL);
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.USERNAME_REQUIRED}`)).toBeVisible();
    });

    test('✅ Successful registration test', async ({ page }) => {
        //podaci o korisniku prilikom registracije se moraju svaki put prilikom testiranja menjati (trenutni podaci su vec izmenjeni)
        await page.goto(config.REGISTER_URL);
        await page.fill('#username', 'marko9563359');
        await page.fill('#email', 'novi.korisnik1258@gmail.com');
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('button:has-text("Register")');
        await page.waitForSelector('#search');
        await expect(page).toHaveURL(config.DASHBOARD_URL);
        await expect(page.locator('#search')).toBeVisible();
        await expect(page).toHaveTitle(/Academy Ecommerce App/);
    });
});
