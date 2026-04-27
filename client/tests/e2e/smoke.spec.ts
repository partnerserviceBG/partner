import { expect, test } from '@playwright/test';

const housesResponse = [
  {
    id: '1',
    full_address: 'обл. Нижегородская, г. Богородск, Ленина ул, дом 260',
    entrances: [],
    premises: [],
    floor_count: 5,
    total_square: '1000',
    used_year: 1999,
    cadastral_number: '52:00:000000:1',
  },
];

const postsResponse = [
  {
    id: '10',
    title: 'Тестовая новость',
    content: 'Контент',
    image: 'Images/default_news_img.jpg',
    housesId: ['1'],
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

test('login page shows auth error message', async ({ page }) => {
  await page.route('**/api/v1/users/login', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Неверный email или пароль' }),
    });
  });

  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Пароль').fill('wrong-password');
  await page.getByRole('button', { name: 'Войти' }).click();

  await expect(page.getByText('Неверный email или пароль')).toBeVisible();
});

test('news page displays empty state', async ({ page }) => {
  await page.route('**/api/v1/houses*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
  await page.route('**/api/v1/posts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.goto('/news');
  await expect(page.getByText('Пока новостей нет')).toBeVisible();
});

test('houses page filters houses by selected item', async ({ page }) => {
  await page.route('**/api/v1/houses*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(housesResponse),
    });
  });
  await page.route('**/api/v1/posts*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(postsResponse),
    });
  });

  await page.goto('/houses');
  await page.getByText('Фильтр по дому').waitFor();
  await page.getByRole('combobox', { name: '' }).click();
  await page.getByRole('option', { name: /дом 260/i }).first().click();

  await expect(page.getByRole('link', { name: 'дом 260' })).toBeVisible();
});
