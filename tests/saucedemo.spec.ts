import { test, expect } from '@playwright/test';

test('purchase an item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name: 'Login'}).click()


  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()

  console.log('random item is: ', await randomItem.innerText())

  console.log('random item price: ', expectedPrice)
  console.log('random item name: ', expectedName)
  console.log('random item description: ', expectedDescription)

  await randomItem.getByRole('button', {name: 'Add to cart'}).click()

  await page.locator('#shopping_cart_container a').click()

  const currentName = await page.locator('.cart_item_label .inventory_item_name').innerText()
  const currentDescription = await page.locator('.cart_item_label .inventory_item_desc').innerText()
  const currentPrice = await page.locator('.cart_item_label .inventory_item_price').innerText()

  expect(currentName).toEqual(expectedName)
  expect(currentDescription).toEqual(expectedDescription)
  expect(currentPrice).toEqual(expectedPrice)

  console.log('current item price: ', currentPrice)
  console.log('current item name: ', currentName)
  console.log('current item description: ', currentDescription)

  await page.getByRole('button', {name: 'Checkout'}).click()

  await page.getByRole('textbox', {name:'First Name'}).fill('Javier')
  await page.getByRole('textbox', {name:'Last Name'}).fill('Rodriguez')
  await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('11000')

  await page.getByRole('button', {name:'Continue'}).click()
  await page.getByRole('button', {name:'Finish'}).click()

  await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible()

  //await page.pause()

});