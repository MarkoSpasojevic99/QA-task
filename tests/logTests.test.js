const { test, expect } = require('@playwright/test');
const config = require('./const');

test.describe.parallel('Login and Logout Tests', () => {
    
    test('Logout Test', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');
        await page.fill('#email', config.USER_CREDENTIALS.EMAIL); 
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD); 
        await page.click('span:has-text("Sign in")');
        await page.waitForSelector('#search');
        await page.waitForSelector('svg.w-8.h-16');
        await page.click('svg.w-8.h-16');
        await page.waitForSelector('button:has-text("Log Out")');
        await page.click('button:has-text("Log Out")');
        await expect(page).toHaveURL(config.BASE_URL);
    });
    
    test('Missing Email and Password', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.click('span:has-text("Sign in")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.EMAIL_REQUIRED}`)).toBeVisible();
        await expect(page.locator(`text=${config.ERROR_MESSAGES.PASSWORD_REQUIRED}`)).toBeVisible();
    });
    
    test('Missing Email', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD);
        await page.click('span:has-text("Sign in")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.EMAIL_REQUIRED}`)).toBeVisible();
    });
    
    test('Missing Password', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.fill('#email', config.USER_CREDENTIALS.EMAIL);
        await page.click('span:has-text("Sign in")');
        await expect(page.locator(`text=${config.ERROR_MESSAGES.PASSWORD_REQUIRED}`)).toBeVisible();
    });

    test('Successful Login', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');
        await page.fill('#email', config.USER_CREDENTIALS.EMAIL); 
        await page.fill('#password', config.USER_CREDENTIALS.PASSWORD); 
        await page.click('span:has-text("Sign in")');
        await page.waitForSelector('#search');
        await expect(page).toHaveURL(config.DASHBOARD_URL);
        await expect(page).toHaveTitle(/Academy Ecommerce App/);
    });

    test('Unsuccessful Login - Wrong Password', async ({ page }) => {
        await page.goto(config.LOGIN_URL);
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');
        await page.fill('#email', config.USER_CREDENTIALS.EMAIL); 
        await page.fill('#password', '12345678');
        await page.click('span:has-text("Sign in")');
        await expect(page.locator('text=The email address or password you entered is invalid')).toBeVisible();
    });
    
});
