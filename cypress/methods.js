let elements = require("./pageObjects");


module.exports = {

    goTo(url) {
        cy.visit(url)
    },
    getTextContent(selector) {
        let element = elements.get(selector);
        let elementText = cy.get(element).invoke('text');
        console.log('this is the element text ' + elementText);
        return elementText;
    },
    getElementLength(selector) {
        let element = elements.get(selector);
        let elementLength = cy.get(element).children();
        return elementLength;
    },
    getSelector(selector) {
        let element = elements.get(selector);
        return element;
    },

    clickElement(selector) {
        let element = elements.get(selector);
        cy.get(element).click();
    },

    emulate(device) {
        cy.viewport(320, 600);
    },

};