let elements = require("./pageObjects");


module.exports = {
    async findLinkByText(page, text) {
        let link = (await page.$x("//a[contains(text()," + "'" + text + "'" + ")]"))[0];
        return link;
    },
    async getTextContent(page, selector) {
        let element = await elements.get(selector);
        await page.waitForSelector(element);
        return await page.$eval(element, el => el.textContent);
    },
    async getSelector(page, selector) {
        let element = await elements.get(selector);
        return element;
    },

    async clickElement(page, selector) {
        let element = await elements.get(selector);
        await page.click(element);
    },

    async stripNumberFromString(page, selector) {
        let element = await elements.get(selector);
        await page.waitForSelector(element);
        let stringValue = await page.$eval(element, el => el.textContent);
        let splitString = await stringValue.split(' ');
        let numericValue = await parseInt(splitString[0]);
        // if products returned is 0 initially, retrieve the value again
        while(numericValue === 0){
            stringValue = await page.$eval(element, el => el.textContent);
            splitString = await stringValue.split(' ');
            numericValue = await parseInt(splitString[0]);
        }
        return numericValue;
    },
    async getElementLength(page, selector) {
        let element = await elements.get(selector);
        await page.waitForSelector(element);
        return await page.$eval(element, el => el.children.length);
    },


};