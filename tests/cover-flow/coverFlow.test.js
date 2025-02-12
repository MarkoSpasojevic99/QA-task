const { test, expect } = require('@playwright/test');

test('Cover Flow - Kupovina novog proizvoda', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');

    await page.fill('#search', 'Razer BlackWidow V3 Pro Mechanical Gaming Keyboard'); 

    const productName = "Razer BlackWidow V3 Pro Mechanical Gaming Keyboard";
    const productCard = await page.locator('[test-id="product-card"]').filter({ hasText: productName }).first();
    await productCard.waitFor();
    await productCard.locator('button.p-button').click();

    await page.click('button svg[xmlns="http://www.w3.org/2000/svg"]');
    await page.waitForSelector('button:has-text("Checkout")');
    await page.click('button:has-text("Checkout")');

    await page.click('span:has-text("Next step")');
    await page.waitForSelector('span:has-text("Make changes")');
    await page.click('span:has-text("Make changes")');

    await page.fill('#first_name', 'Marko');
    await page.fill('#last_name', 'Spasojevic');
    await page.fill('#email', 'markospasojevic99@gmail.com');
    await page.fill('#phone_number', '123456789');
    await page.fill('#street_and_number', 'Ulica 123');
    await page.fill('#city', 'Beograd');
    await page.fill('#postal_code', '11000');
    await page.fill('#country', 'Srbija');

    await page.click('span:has-text("Update")');
    await page.waitForSelector('span:has-text("Next step")');
    await page.click('span:has-text("Next step")');

    await page.click('span:has-text("Next step")');
    await page.waitForSelector('span:has-text("Place your order!")');
    await page.click('span:has-text("Place your order!")');

    await page.goto('https://automaticityacademy.ngrok.app/dashboard');

    await page.waitForSelector('svg.w-8.h-16'); 
    await page.click('svg.w-8.h-16');
    await page.waitForSelector('button:has-text("Log Out")');
    await page.click('button:has-text("Log Out")');
    await expect(page).toHaveURL('https://automaticityacademy.ngrok.app/');
});
