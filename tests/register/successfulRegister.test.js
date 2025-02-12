const { test, expect } = require('@playwright/test');

test('✅ Successful registration test', async ({ page }) => {
    await page.goto('https://automaticityacademy.ngrok.app/register');

    // Posle svakog testa potrebno je promeniti Username i email kako bi test prolazio
    await page.fill('#username', 'marko95359');
    await page.fill('#email', 'novi.korisnik12@gmail.com');
    await page.fill('#password', '1234567');

    await page.click('button:has-text("Register")');

    // ✅ Stabilizacija – čekamo ključni element na dashboardu pre nego što proverimo URL
    await page.waitForSelector('#search'); // Ako ne postoji, zameni sa nekim drugim dashboard elementom

    // ✅ Očekujemo da smo na dashboardu (koristi puni URL ako bude potrebno)
    await expect(page).toHaveURL('https://automaticityacademy.ngrok.app/dashboard');

    // ✅ Očekujemo da se prikaže ključni element na dashboardu
    await expect(page.locator('#search')).toBeVisible();

    // ✅ Očekujemo da naslov stranice bude tačan
    await expect(page).toHaveTitle(/Academy Ecommerce App/);
});
