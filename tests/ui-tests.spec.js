import { test, expect } from '@playwright/test';
import fs from 'fs';

let testData;

test.beforeAll(async() => {
    const rawData = fs.readFileSync('testData.json', 'utf-8');
    testData = JSON.parse(rawData);
})

test.beforeEach(async({page}) => {
    await page.goto('/');
})

test('go to home page', async ({ page }) => {
    await expect(page).not.toHaveURL(/home/);
});

test('go through all options under about tab and assert', async ({ page }) => {
    for(let i = 0; i < testData.about.length; i++) {
        await page.getByRole('button', {name: /About/}).click();
        await page.getByRole('link', {name: testData.about[i].option}).click();
        await page.screenshot({ path: 'screenshots/'+testData.about[i].option+'.png', fullPage: true });
        await expect(page.url()).toContain(testData.about[i].url);
    }

});

test('go through all options under media tab and assert', async ({ page }) => {
    for(let i = 0; i < testData.media.length; i++) {
        await page.getByRole('button', {name: /Media/}).click();
        await page.getByRole('link', {name: testData.media[i].option, exact: true }).click();
        await page.evaluate(() => document.fonts.ready.catch(() => {}));
        await page.screenshot({ path: 'screenshots/'+testData.media[i].option+'.png',
            fullPage: true,
            timeout: 90000});
        await expect(page.url()).toContain(testData.media[i].url);
    }

});

test('go through all options under utilities tab and assert', async ({ page }) => {
    for(let i = 0; i < testData.utilities.length; i++) {
        await page.getByRole('button', {name: /Utilities/}).click();
        await page.getByRole('link', {name: testData.utilities[i].option, exact: true }).click();
        await page.evaluate(() => document.fonts.ready.catch(() => {}));
        await page.screenshot({ path: 'screenshots/'+testData.utilities[i].option+'.png',
            fullPage: true,
            timeout: 90000});
        await expect(page.url()).toContain(testData.utilities[i].url);
    }

});

test('go through all options under Satellite Data tab and assert', async ({ page }) => {
    for(let i = 0; i < testData.satellite_data.length; i++) {
        await page.getByRole('button', {name: /Satellite Data/}).click();
        await page.getByRole('link', {name: testData.satellite_data[i].option, exact: true }).click();
        await page.evaluate(() => document.fonts.ready.catch(() => {}));
        await page.screenshot({ path: 'screenshots/'+testData.satellite_data[i].option+'.png',
            fullPage: true,
            timeout: 90000});
        await expect(page.url()).toContain(testData.satellite_data[i].url);
    }

});

test('go through all options under Careers tab and assert', async ({ page }) => {
    for(let i = 0; i < testData.careers.length; i++) {
        await page.getByRole('button', {name: /Careers/}).click();
        await page.getByRole('link', {name: testData.careers[i].option, exact: true }).click();
        await page.evaluate(() => document.fonts.ready.catch(() => {}));
        await page.screenshot({ path: 'screenshots/'+testData.careers[i].option+'.png',
            fullPage: true,
            timeout: 90000});
        await expect(page.url()).toContain(testData.careers[i].url);
    }

});

test('go through contact and news & views tabs and assert', async ({ page }) => {
    await page.getByRole('link', {name: /News & Views/, exact: true }).click();
    await expect(page.url()).toContain('/news-views/');
    await page.getByRole('link', {name: /Contact/, exact: true }).click();
    await expect(page.url()).toContain('/contact/');


});
