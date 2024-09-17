import { Locator, Page, expect } from "@playwright/test";

// Clase LoginPage que encapsula las interacciones con la página de inicio de sesión
export class LoginPage {
  // Definición de los elementos de la página como propiedades privadas
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppingCartIcon: Locator;

  // Constructor que recibe una instancia de la página y asigna los selectores a las propiedades
  constructor(page: Page) {
    // Localiza el campo de texto para el nombre de usuario
    this.usernameTextbox = page.getByRole("textbox", { name: "Username" });
    // Localiza el campo de texto para la contraseña
    this.passwordTextbox = page.getByRole("textbox", { name: "Password" });
    // Localiza el botón de inicio de sesión
    this.loginButton = page.getByRole("button", { name: "Login" });
    // Localiza el ícono del carrito de compras, utilizado para verificar un inicio de sesión exitoso
    this.shoppingCartIcon = page.locator("xpath=//a[contains(@class, 'shopping_cart_link')]");
  }

  // Método para rellenar el nombre de usuario
  async fillUsername(username: string) {
    await this.usernameTextbox.fill(username); // Usa el método fill() para ingresar el nombre de usuario
  }

  // Método para rellenar la contraseña
  async fillPassword(password: string) {
    await this.passwordTextbox.fill(password); // Usa el método fill() para ingresar la contraseña
  }

  // Método para hacer clic en el botón de inicio de sesión
  async clickOnLogin() {
    await this.loginButton.click(); // Hace clic en el botón de "Login"
  }

  // Método que combina los pasos de inicio de sesión: ingresar usuario y contraseña, y hacer clic en "Login"
  async loginWithCredentials(username: string, password: string) {
    await this.fillUsername(username); // Rellena el nombre de usuario
    await this.fillPassword(password); // Rellena la contraseña
    await this.clickOnLogin(); // Hace clic en el botón de "Login"
  }

  // Verifica si el ícono del carrito de compras es visible para confirmar un inicio de sesión exitoso
  async checkSuccessfulLogin() {
    await expect(this.shoppingCartIcon).toBeVisible(); // Asegura que el ícono sea visible, lo que indica que el usuario ha iniciado sesión
  }
}
