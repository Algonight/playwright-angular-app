import { expect, test } from '@playwright/test';
import { E2ETests } from './e2e-constantes';

/**
 * - On app lauch page should be redirect on login page
 * - On login page should be able to login and redirect to home page
 */

test('should be redirected on login page when app is launched', async ({
  page,
}) => {
  await page.goto(E2ETests.baseUrl);

  await expect(page).toHaveURL(E2ETests.baseUrl + '/login');
});

test('should not login when user is giving incorect credentials', async ({
  page,
}) => {
  await page.goto(E2ETests.baseUrl);

  await page.getByLabel('Username').fill('wrong username');
  await page.getByLabel('Password').fill('wrong password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid username or password')).toBeVisible();
});

test('should login when user is giving correct credentials', async ({
  page,
}) => {
  await page.goto(E2ETests.baseUrl);

  await page.getByLabel('Username').fill(E2ETests.username);
  await page.getByLabel('Password').fill(E2ETests.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(E2ETests.baseUrl + '/');
});
