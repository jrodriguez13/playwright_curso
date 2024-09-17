import { test as setup, expect } from "@playwright/test";
import { LoginPage } from './pageobjects/LoginPage';

// Archivo donde se almacenará el estado de autenticación
const authFile = "playwright/.auth/user.json";

// Test de configuración para autenticar al usuario y guardar el estado
setup("authenticate", async ({ page }) => {
    
    // Navega a la página de inicio de sesión de Sauce Demo
    await page.goto('https://saucedemo.com');
    
    // Crea una instancia de la página de inicio de sesión usando el Page Object Model (POM)
    const login = new LoginPage(page);
    
    // Realiza el inicio de sesión con credenciales válidas
    await login.loginWithCredentials('standard_user', 'secret_sauce');
    
    // Verifica que el inicio de sesión haya sido exitoso (usando un método del POM)
    await login.checkSuccessfulLogin();
    
    // Guarda el estado de la sesión (cookies, local storage, etc.) en un archivo JSON
    await page.context().storageState({ path: authFile });

});
