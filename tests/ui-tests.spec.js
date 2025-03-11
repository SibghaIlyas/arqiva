import { test, expect } from '@playwright/test';
import fs from 'fs';

let testData;

test.beforeAll(async() => {
    const rawData = fs.readFileSync('testData.json', 'utf-8');
    testData = JSON.parse(rawData);

    console.log(testData); // Log the JSON data
})

test('go to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveURL(/home/);
});

test('go through all options under about tab and assert', async ({ page }) => {
    await page.goto('/');
    console.log(testData.about.length)
    for(let i = 0; i < testData.about.length; i++) {
        await page.getByRole('button', {name: /About/}).click();
        await page.getByRole('link', {name: testData.about[i].option}).click();
        await page.screenshot({ path: 'screenshots/'+testData.about[i].option+'.png', fullPage: true });
        await expect(page.url()).toContain(testData.about[i].url);
    }

});

test('go through all options under media tab and assert', async ({ page }) => {
    await page.goto('/');
    console.log(testData.media.length)
    for(let i = 0; i < testData.media.length; i++) {
        await page.getByRole('button', {name: /Media/}).click();
        await page.getByRole('link', {name: testData.media[i].option, exact: true }).click();
        await page.screenshot({ path: 'screenshots/'+testData.media[i].option+'.png',
            fullPage: true,
            timeout: 90000});
        await expect(page.url()).toContain(testData.media[i].url);
    }

});

