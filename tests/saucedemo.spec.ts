import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/LoginPage";

test("purchase an item", async ({ page }) => {
  // Navega a la página de inicio de sesión utilizando la URL desde las variables de entorno
  // await page.goto(process.env.URL);
  await page.goto("https://www.saucedemo.com");

  // Instancia de la página de inicio de sesión (LoginPage)
  const loginpage = new LoginPage(page);

  // Realiza el inicio de sesión con un usuario estándar
  await loginpage.loginWithCredentials("standard_user", "secret_sauce");

  // Verifica que el inicio de sesión fue exitoso
  await loginpage.checkSuccessfulLogin();

  // Localiza todos los elementos disponibles en el inventario
  const itemsContainer = await page
    .locator("#inventory_container .inventory_item")
    .all();

  // Selecciona un elemento aleatorio del inventario
  const randomIndex = Math.floor(Math.random() * itemsContainer.length); // Calcula un índice aleatorio
  const randomItem = itemsContainer[randomIndex]; // Asigna el elemento aleatorio

  // Obtiene los detalles del elemento aleatorio (nombre, precio, descripción)
  const expectedName = await randomItem
    .locator(".inventory_item_name")
    .innerText();
  const expectedPrice = await randomItem
    .locator(".inventory_item_price")
    .innerText();
  const expectedDescription = await randomItem
    .locator(".inventory_item_desc")
    .innerText();

  // Realiza una captura de pantalla
  await page.screenshot({
    path: "screenshots/testscreenshot.png",
    fullPage: true,
  });

  // Muestra los detalles del elemento seleccionado en la consola
  console.log("random item is: ", await randomItem.innerText());
  console.log("random item price: ", expectedPrice);
  console.log("random item name: ", expectedName);
  console.log("random item description: ", expectedDescription);

  // Agrega el elemento seleccionado al carrito de compras
  await randomItem.getByRole("button", { name: "Add to cart" }).click();

  // Navega al carrito de compras
  await page.locator("#shopping_cart_container a").click();

  // Verifica que los detalles del producto en el carrito coincidan con los del producto seleccionado
  const currentName = await page
    .locator(".cart_item_label .inventory_item_name")
    .innerText();
  const currentDescription = await page
    .locator(".cart_item_label .inventory_item_desc")
    .innerText();
  const currentPrice = await page
    .locator(".cart_item_label .inventory_item_price")
    .innerText();

  // Asegura que el nombre, la descripción y el precio en el carrito coincidan con los valores esperados
  expect(currentName).toEqual(expectedName);
  expect(currentDescription).toEqual(expectedDescription);
  expect(currentPrice).toEqual(expectedPrice);

  // Muestra los detalles del producto en el carrito en la consola
  console.log("current item price: ", currentPrice);
  console.log("current item name: ", currentName);
  console.log("current item description: ", currentDescription);

  // Hace clic en el botón de "Checkout" para proceder al pago
  await page.getByRole("button", { name: "Checkout" }).click();

  // Rellena el formulario de pago con los datos del usuario
  await page.getByRole("textbox", { name: "First Name" }).fill("Javier");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Rodriguez");
  await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("11000");

  // Hace clic en "Continue" para seguir con el proceso de compra
  await page.getByRole("button", { name: "Continue" }).click();

  // Hace clic en "Finish" para finalizar la compra
  await page.getByRole("button", { name: "Finish" }).click();

  // Verifica que el mensaje de confirmación de la compra sea visible
  await expect(
    page.getByRole("heading", { name: "Thank you for your order!" })
  ).toBeVisible();
});
