import { test, expect } from '@playwright/test';

test('test 3', async ({ page }) => {
  // Abre el sitio web
  await page.goto('https://www.mercadolibre.com.ar/');

  // Ingresa en la barra de búsqueda la palabra 'iphone' y da Enter
  await page.locator('input[id=\'cb1-edit\']').fill('iphone');
  await page.keyboard.press('Enter');

  // Asegurarse de que la página ha cargado los resultados
  const searchResults = page.locator('//ol[contains(@class, \'ui-search-layout\')]');
  await searchResults.waitFor({ state: 'visible' });

  // Obtener los títulos de los resultados
  const titles = await searchResults.locator('//li//h2').allInnerTexts();

  console.log('Total de resultados: ', titles.length);

  for (let title of titles) {
    console.log('El título es: ', title);
  }
});
