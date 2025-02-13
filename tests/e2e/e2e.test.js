const { test, expect } = require('@playwright/test');

test('E2E - Testiranje korpe i checkout procesa', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/login');
    await expect(page).toHaveURL('https://automaticityacademy.ngrok.app/login');

    await page.fill('#email', 'markospasojevic99@gmail.com'); 
    await page.fill('#password', '1234567'); 
    await page.click('span:has-text("Sign in")');
    await expect(page).toHaveURL(/dashboard/);

    const productNames = [
        "ASUS ROG Strix B550-F",
        "Samsung Galaxy S22 Ultra",
        "MSI GeForce GTX 1650 SUPER"
    ];

    const addProductToCart = async (productName) => {
        const productCard = await page.locator('[test-id="product-card"]').filter({ hasText: productName }).first();
        await productCard.waitFor();

        const buyButton = productCard.locator('button[data-pc-name="button"][data-pc-section="root"]');
        await expect(buyButton).toBeVisible();
        await buyButton.click();
        console.log(`✅ Dodato u korpu: ${productName}`);
    };

    for (const product of productNames) {
        await addProductToCart(product);
    }

    const cartButton = page.locator('button:has(svg[xmlns="http://www.w3.org/2000/svg"][viewBox="0 0 1109 1024"])');
    await expect(cartButton).toBeVisible();
    await cartButton.click();
    await expect(page.locator('button:has-text("Checkout")')).toBeVisible();
    console.log("✅ Korpa je otvorena!");

    const cartSection = page.locator('section.flex-1.overflow-y-auto');

    const getCartItem = (productName) => 
        cartSection.locator('div.text-primary.text-center.font-semibold.underline')
        .filter({ hasText: productName });

    for (const product of productNames) {
        await expect(getCartItem(product)).toBeVisible();
        console.log(`✅ Proizvod ${product} je u korpi!`);
    }

    await cartButton.click();
    await expect(cartSection).not.toBeVisible();
    console.log("✅ Korpa zatvorena!");

    await cartButton.click();
    await expect(page.locator('button:has-text("Checkout")')).toBeVisible();
    console.log("✅ Ponovno otvaranje korpe!");

    const removeButton = await page.locator('button.p-button-icon-only:has(.pi-times)').first();
    await removeButton.click();
    await expect(getCartItem("ASUS ROG Strix B550-F")).not.toBeVisible();
    console.log("✅ ASUS ROG Strix B550-F je uspešno obrisan iz korpe!");

    const minusButton = await page.locator('button.p-button-icon-only:has(.pi-minus)').first();
    await minusButton.click();
    await expect(getCartItem("Samsung Galaxy S22 Ultra")).not.toBeVisible();
    console.log("✅ Samsung Galaxy S22 Ultra je uspešno uklonjen klikom na - dugme!");

    const plusButton = await page.locator('button.p-button-icon-only:has(.pi-plus)').first();
    await plusButton.click();
    console.log("✅ Kliknuto na + dugme!");

    const quantityLocator = await page.getByText('Quantity:');
    await expect(quantityLocator).toHaveText(/Quantity:\s*2/);
    console.log("✅ Količina MSI GeForce GTX 1650 SUPER je povećana na 2!");

    // ✅ Pokretanje checkout procesa
    console.log("🛍️ Pokrećemo checkout...");
    await page.click('button:has-text("Checkout")');

    // ✅ Provera da smo na prvom koraku checkouta (1 skakuće)
    const step1 = page.locator('div.animate-bounce:has-text("1")');
    await expect(step1).toBeVisible();
    console.log("✅ Potvrđeno: Nalazimo se na prvom koraku checkouta!");

    // ✅ Klik na Next Step
    await page.click('span:has-text("Next step")');

    // ✅ Provera da smo na stranici za unos podataka (2 skakuće)
    const step2 = page.locator('div.animate-bounce:has-text("2")');
    await expect(step2).toBeVisible();
    console.log("✅ Potvrđeno: Nalazimo se na stranici za unos podataka!");

    await page.waitForSelector('span:has-text("Make changes")');
await page.click('span:has-text("Make changes")');
console.log("✅ Kliknuto na 'Make changes'!");

    // ✅ Popunjavanje forme za isporuku
    console.log("✍️ Unosimo podatke za isporuku...");
    await page.fill('#first_name', 'Marko');
    await page.fill('#last_name', 'Spasojevic');
    await page.fill('#email', 'markospasojevic99@gmail.com');
    await page.fill('#phone_number', '123456789');
    await page.fill('#street_and_number', 'Ulica 123');
    await page.fill('#city', 'Beograd');
    await page.fill('#postal_code', '11000');
    await page.fill('#country', 'Srbija');
    console.log("✅ Podaci za isporuku su uneti");

    // ✅ Ažuriranje podataka i nastavak kupovine
    await page.click('span:has-text("Update")');
    await page.waitForSelector('span:has-text("Next step")');
    await page.click('span:has-text("Next step")');

    // ✅ Provera da smo na stranici za unos kartičnih podataka (3 skakuće)
    const step3 = page.locator('div.animate-bounce:has-text("3")');
    await expect(step3).toBeVisible();
    console.log("✅ Potvrđeno: Nalazimo se na delu za kartične podatke!");

    // ❌ Ne unosimo kartične podatke, samo klik na Next Step
    console.log("⚠️ Preskačemo unos kartičnih podataka");
    await page.click('span:has-text("Next step")');

    // ✅ Provera da smo na finalnom koraku pre završetka porudžbine (4 skakuće)
    const step4 = page.locator('div.animate-bounce:has-text("4")');
    await expect(step4).toBeVisible();
    console.log("✅ Potvrđeno: Nalazimo se na finalnom koraku!");

    // ✅ Završavanje kupovine
    await page.waitForSelector('span:has-text("Place your order!")');
    await page.click('span:has-text("Place your order!")');
    console.log("✅ Porudžbina uspešno završena!");

    // 🔄 **Vraćamo se na dashboard**
    console.log("🔄 Vraćamo se na dashboard...");
    await page.goto('https://automaticityacademy.ngrok.app/dashboard');

    // 🚪 **Logout**
    console.log("🚪 Odjavljujemo se...");

    await page.waitForSelector('svg.w-8.h-16'); 
    await page.click('svg.w-8.h-16');

    await page.waitForSelector('button:has-text("Log Out")');
    await page.click('button:has-text("Log Out")');

    await expect(page).toHaveURL('https://automaticityacademy.ngrok.app/');
    console.log("✅ Test uspešno završen!");
});
