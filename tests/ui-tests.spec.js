import { test, expect } from '@playwright/test';
import fs from 'fs';

let testData;

test.beforeAll(async() => {
    try {
        const rawData = fs.readFileSync('testData.json', 'utf-8');
        testData = JSON.parse(rawData);
    } catch(error) {
        console.error("Error parsing data file " + error);
    }
   
})

test.beforeEach(async({page}) => {
    await page.goto('/');
})

test('go to home page', async ({ page }) => {
    await expect(page).not.toHaveURL(/home/);
});

test('go through all options under about tab and assert', async ({ page }) => {
    await navigateAndAssert(page, /About/, testData.about)

});

 

test('go through all options under media tab and assert', async ({ page }) => {
    await navigateAndAssert(page, /Media/, testData.media)

});

test('go through all options under utilities tab and assert', async ({ page }) => {
    await navigateAndAssert(page, /Utilities/, testData.utilities)

});

test('go through all options under Satellite Data tab and assert', async ({ page }) => {
    await navigateAndAssert(page, /Satellite Data/, testData.satellite_data)

});

test('go through all options under Careers tab and assert', async ({ page }) => {
    await navigateAndAssert(page, /Careers/, testData.careers)

});

test('go through contact and news & views tabs and assert', async ({ page }) => {
    await page.getByRole('link', {name: /News & Views/, exact: true }).click();
    await expect(page.url()).toContain('/news-views/');
    await page.getByRole('link', {name: /Contact/, exact: true }).click();
    await expect(page.url()).toContain('/contact/');


});


async function navigateAndAssert(page, tabName, options) {

    for (let i = 0; i < options.length; i++) {
        await page.getByRole('button', { name: new RegExp(tabName) }).click();
        await page.getByRole('link', { name: options[i].option, exact: true }).click();
        await page.evaluate(() => document.fonts.ready.catch(() => {}));
        let name = options[i].option.replace(/[^a-zA-Z0-9]/g, '')
        await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true, timeout: 90000 });
        expect(page.url()).toContain(options[i].url);
    }

}
