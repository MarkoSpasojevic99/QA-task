const { test, expect } = require('@playwright/test');
const config = require('./const');

test('Cover Flow - Random Available Product', async ({ page }) => {
    await page.goto(config.LOGIN_URL);
    await page.fill('#email', config.USER_CREDENTIALS.EMAIL); 
    await page.fill('#password', config.USER_CREDENTIALS.PASSWORD); 
    await page.click('span:has-text("Sign in")');

    await expect(page).toHaveURL(config.DASHBOARD_URL);
    await page.waitForTimeout(6000);

    const allProducts = await page.locator('[test-id="product-card"]').all();

    const inStockProducts = (await Promise.all(
        allProducts.map(async (product) => {
            const isDisabled = await product.locator('button.p-button.p-disabled').count();
            return isDisabled === 0 ? product : null;
        })
    )).filter(Boolean);

    await expect(inStockProducts.length).toBeGreaterThan(0);

    const randomProduct = inStockProducts[Math.floor(Math.random() * inStockProducts.length)];
    const productName = await randomProduct.locator('h1.text-sm.line-clamp-2.tracking-tight').textContent();

    await randomProduct.locator('button.p-button:not(.p-disabled)').click();

    await page.click('button svg[xmlns="http://www.w3.org/2000/svg"]');
    await page.waitForSelector('button:has-text("Checkout")');

    const cartSection = page.locator('section.flex-1.overflow-y-auto');
    await expect(cartSection.locator(`text=${productName.trim()}`)).toBeVisible();

   await page.click('button:has-text("Checkout")');
   
       const step1 = page.locator('div.animate-bounce:has-text("1")');
       await expect(step1).toBeVisible();
   
       await page.click('span:has-text("Next step")');
   
       const step2 = page.locator('div.animate-bounce:has-text("2")');
       await expect(step2).toBeVisible();
   
       await page.waitForSelector('span:has-text("Make changes")');
       await page.click('span:has-text("Make changes")');
   
       await page.fill('#first_name', config.USER_DETAILS.FIRST_NAME);
       await page.fill('#last_name', config.USER_DETAILS.LAST_NAME);
       await page.fill('#email', config.USER_DETAILS.EMAIL);
       await page.fill('#phone_number', config.USER_DETAILS.PHONE);
       await page.fill('#street_and_number', config.USER_DETAILS.ADDRESS);
       await page.fill('#city', config.USER_DETAILS.CITY);
       await page.fill('#postal_code', config.USER_DETAILS.POSTAL_CODE);
       await page.fill('#country', config.USER_DETAILS.COUNTRY);
   
       await page.click('span:has-text("Update")');
       await page.waitForSelector('span:has-text("Next step")');
       await page.click('span:has-text("Next step")');
   
       const step3 = page.locator('div.animate-bounce:has-text("3")');
       await expect(step3).toBeVisible();
   
       await page.click('span:has-text("Next step")');  // ne popunjavamo karticne podatke zato sto ce nam dugme next step posle popunjavanja biti onemoguceno
   
       const step4 = page.locator('div.animate-bounce:has-text("4")');
       await expect(step4).toBeVisible();
   
       await page.waitForSelector('span:has-text("Place your order!")');
       await page.click('span:has-text("Place your order!")');
   
       await page.goto(config.DASHBOARD_URL);
   
       await page.waitForSelector('svg.w-8.h-16'); 
       await page.click('svg.w-8.h-16');
       await page.waitForSelector('button:has-text("Log Out")');
       await page.click('button:has-text("Log Out")');
       await expect(page).toHaveURL(config.BASE_URL);
   });
   
   