const { test, expect } = require('@playwright/test');

test('E2E - Kupovina više proizvoda i testiranje korpe', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await page.waitForSelector('#search');

    const product1 = "ASUS ROG Strix B550-F";
    const productCard1 = await page.locator('[test-id="product-card"]').filter({ hasText: product1 }).first();
    await productCard1.waitFor();
    await productCard1.locator('button.p-button').click();

    const product2 = "AMD Radeon RX 6700 XT";
    const productCard2 = await page.locator('[test-id="product-card"]').filter({ hasText: product2 }).first();
    await productCard2.waitFor();
    await productCard2.locator('button.p-button').click();

    const product3 = "MSI GeForce GTX 1650 SUPER";
    const productCard3 = await page.locator('[test-id="product-card"]').filter({ hasText: product3 }).first();
    await productCard3.waitFor();
    await productCard3.locator('button.p-button').click();

    await page.click('button svg[xmlns="http://www.w3.org/2000/svg"]');
    await page.waitForSelector('button:has-text("Checkout")');

    const removeButton = await page.locator('button.p-button-icon-only:has(.pi-times)').first();
    await removeButton.click();
    await page.waitForTimeout(2000);

    const minusButton = await page.locator('button.p-button-icon-only:has(.pi-minus)').first();
    await minusButton.click();
    await page.waitForTimeout(2000);

    const plusButton = await page.locator('button.p-button-icon-only:has(.pi-plus)').first();
    await plusButton.click();
    await page.waitForTimeout(2000);

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
