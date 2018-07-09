'use strict';

const puppeteer = require('puppeteer');
var commonMethods = require("./methods");
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone X'];

let page;
let browser;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
});
afterAll(() => {
    browser.close();
});


describe('basic example UI tests', async () => {

    it('has the correct page title', async () => {
        await page.goto('http://localhost:3000');
        const title = await page.title();
        await expect(title).toBe('React App');
    });

    it('contains a heading displaying the amount of products found', async () => {
        //extract the text content of a class element
        const productsFound = await commonMethods.getTextContent(page, 'productsFound');
        expect(productsFound).toContain('Product(s) found');
    });

    it('contains a feature to sort products', async () => {
        const sortFeature = await commonMethods.getSelector(page, 'sortFeature');
        expect(sortFeature).toBeTruthy();
    });

    it('contains a list of all sizes', async () => {
        const sizes = await commonMethods.getTextContent(page, 'sizes');
        expect(sizes).toContain('XS' + 'S' + 'M' + 'ML' + 'L' + 'XL' + 'XXL');
    });

    it('allows a user to filter by size', async () => {
        let originalProductsFound = await commonMethods.stripNumberFromString(page, 'productsFound');
        await commonMethods.clickElement(page, 'XS');
        await page.waitFor(500);
        let latestProductsFound = await commonMethods.stripNumberFromString(page, 'productsFound');

        expect(originalProductsFound).toBeGreaterThan(latestProductsFound);
    });

    it('displays an empty trolley initially', async () => {
        await commonMethods.clickElement(page, 'trolleyIcon');
        const trolleyContents = await commonMethods.getTextContent(page, 'emptyState');
        expect(trolleyContents).toEqual('Add some product in the bag :)');
        await commonMethods.clickElement(page, 'closeTrolley');
    });

    it('allows items to be added to the trolley', async () => {
        await commonMethods.clickElement(page, 'addToTrolley');
        const trolleyContents = await commonMethods.getElementLength(page, 'trolleyContents');
        expect(trolleyContents).toEqual(1);
        await commonMethods.clickElement(page, 'closeTrolley');
    });


    it('can be viewed on a mobile', async () => {
        await page.emulate(iPhone);
        // screenshot will be output to this path
        const filePath = await './tests/screenshots/mobileScreenshot.png';
        await page.screenshot({
            path: filePath
        });
    });
});