import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing with GET Requests', () => {

    test('GET /posts should return a list of posts', async ({page}) => {
        const response = await page.request.get(`${BASE_URL}/posts`);

        expect(response.status()).toBe(200);

        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy();

        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
        expect(posts[0]).toHaveProperty('body');
    });

    test('GET /posts/99999 should return 404 for non-existent post', async ({page}) => {
        const response = await page.request.get(`${BASE_URL}/posts/99999`);

        // Assert response status is 404 Not Found
        expect(response.status()).toBe(404);
    })
})
