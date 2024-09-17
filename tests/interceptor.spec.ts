import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/LoginPage";

// Test para realizar una compra de un ítem
test("purchase an item 2", async ({ page }) => {
  // Listener que se activa en cada solicitud de la página para imprimir las URLs de las peticiones
  await page.on("request", (req) => {
    console.log(req.url()); // Imprime la URL de cada petición realizada
  });

  // Intercepta y bloquea peticiones a archivos con extensiones específicas (imágenes, estilos, etc.)
  await page.route(
    "**/*.{png,jpg,jpeg,svg,css}", // Filtra las solicitudes que terminan en estas extensiones
    (route) => route.abort() // Bloquea las solicitudes para mejorar el rendimiento
  );

  // Navega al sitio web de Sauce Demo
  await page.goto("https://saucedemo.com");

  // Usa un objeto de la clase LoginPage para iniciar sesión
  const login = new LoginPage(page);

  // Ejecuta el método para iniciar sesión con las credenciales predefinidas
  await login.loginWithCredentials("standard_user", "secret_sauce");

  // Verifica que el inicio de sesión fue exitoso
  await login.checkSuccessfulLogin();

  // Selecciona todos los elementos de inventario después de iniciar sesión
  const itemsContainer = await page
    .locator("#inventory_container .inventory_item") // Localiza todos los items en la página
    .all(); // Obtiene todos los elementos que coinciden con el selector

  // Captura una captura de pantalla de toda la página después de iniciar sesión
  await page.screenshot({ path: "login.png", fullPage: true });
});

// Test para interceptar y modificar la respuesta de una API
test("interceptor test", async ({ page }) => {
  // Intercepta solicitudes a la URL específica de la API de libros
  await page.route("https://demoqa.com/BookStore/v1/Books", (route) => {
    // Modifica la respuesta de la API con un libro personalizado
    route.fulfill({
      status: 304, // Código de estado HTTP
      headers: {
        "Content-Type": "application/json", // Tipo de contenido de la respuesta
      },
      body: `
        {
            "books": [
                {
                    "isbn": "9781449325862",
                    "title": "El libro que Julian nunca escribio",
                    "subTitle": "A Working Introduction",
                    "author": "Richard E. Silverman",
                    "publish_date": "2020-06-04T08:48:39.000Z",
                    "publisher": "O'Reilly Media",
                    "pages": 500,
                    "description": "Este libro ficticio es una introducción al control de versiones con Git.",
                    "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                }
            ]
        }
        `, // Respuesta personalizada con detalles de un libro ficticio
    });
  });

  // Navega a la página de libros que consume la API interceptada
  await page.goto("https://demoqa.com/books");

  // Captura una captura de pantalla de toda la página después de que los datos de la API hayan sido cargados
  await page.screenshot({ path: "books.png", fullPage: true });
});
