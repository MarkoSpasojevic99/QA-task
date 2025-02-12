QA task. Ovaj projekat sadrži automatizovane testove za webshop pomoću Playwright-a.  

Instalacija i podešavanje. Pre nego što pokreneš testove, moraš da instaliraš sve potrebne zavisnosti.  

Prvo kloniraj repozitorijum komandom `git clone https://github.com/MarkoSpasojevic99/QA-task.git` i zatim uđi u direktorijum `cd QA-task`.  

Zatim instaliraj potrebne zavisnosti komandom `npm install`.  

Pokretanje testova. Da pokreneš sve testove koristi `npx playwright test`.  

Ako želiš da pokreneš samo određeni test, koristi ime fajla koji zelis pokrenuti `npx playwright test tests/e2e.test.js`. Ovde je dat primer za pokretanje fajla e2e.test.js . 

Za pokretanje testova u debug režimu koristi `npx playwright test --debug`. Ukoliko zelis zaseban fajl da pokrenes u debug režimu `npx playwright test tests/e2e.test.js --debug` gde je e2e.test.js primer kao u proslom slucaju.

Ako želiš da testove pokreneš u vidljivom browseru koristi `npx playwright test --headed`.  Ukoliko zelis zaseban fajl da pokrenes u debug režimu `npx playwright test tests/e2e.test.js --headed`, ito kao i do sada e2e.test.js je samo primer jednog od fajlova koje mozemo pokrenuti.

Dodatne komande.  

Za generisanje HTML izveštaja koristi `npx playwright show-report`.  

Ako je potrebno ponovo instalirati Playwright browser koristi `npx playwright install`.  

Podešavanje testova. Ako želiš da menjaš postavke testova, pogledaj fajl `playwright.config.js` i prilagodi ga prema potrebama.  

Autor: Marko Spasojević. Kontakt email: markospasojevic99@gmail.com.
