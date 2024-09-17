import { test, expect } from '@playwright/test';

// Definición del test
test('test 3', async ({ page }) => {
    // Navega a la URL donde se encuentra la tabla web que se quiere analizar
    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    // Localiza la tabla de países mediante un selector XPath
    const tableContainer = page.locator("xpath=//table[@id='countries']")

    // Encuentra todas las filas de la tabla (cada <tr>)
    const rows = tableContainer.locator("xpath=//tr").all()

    // Crea un arreglo vacío para almacenar los países
    const countries: Country[] = []

    // Imprime la cantidad de filas encontradas (incluyendo la cabecera)
    console.log((await rows).length)

    // Itera sobre cada fila de la tabla (excepto la cabecera)
    for (let row of await rows){
        // Crea un objeto "Country" con la información extraída de las columnas correspondientes (nombre, capital, moneda, idioma)
        let country: Country = {
            name: await row.locator("xpath=//td[2]").innerText(),      // Columna 2: Nombre del país
            capital: await row.locator("xpath=//td[3]").innerText(),   // Columna 3: Capital del país
            currency: await row.locator("xpath=//td[4]").innerText(),  // Columna 4: Moneda del país
            primaryLanguage: await row.locator("xpath=//td[5]").innerText() // Columna 5: Idioma principal del país
        }

        // Añade el objeto país al arreglo de países
        countries.push(country)

        // Imprime cada país que se ha añadido al arreglo
        for (let nation of countries){
            console.log(nation)
        }

        // Filtra los países donde el idioma principal es el español
        const primaryLangSpanish = countries.filter(country => country.primaryLanguage === 'Spanish')

        // Imprime los países donde se habla español
        console.log('Countries where people speak Spanish', primaryLangSpanish)
    }
    
    // Comentado: Ejemplo de cómo extraer información de una fila específica
    // const row1 = (await rows).at(1)

    // const countryName = await row1?.locator("xpath=//td[2]").innerText()  // Nombre del país en la primera fila
    // const countryCapital = await row1?.locator("xpath=//td[3]").innerText() // Capital en la primera fila
    // const countryCurrency = await row1?.locator("xpath=//td[4]").innerText() // Moneda en la primera fila

    // console.log(countryName, countryCapital, countryCurrency)  // Imprime los datos de la primera fila
})

// Definición de la interfaz "Country" para estructurar los datos de los países
interface Country {
    name: string;         // Nombre del país
    capital: string;      // Capital del país
    currency: string;     // Moneda del país
    primaryLanguage: string;  // Idioma principal del país
}
