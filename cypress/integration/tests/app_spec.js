let methods = require("../../methods");


describe('The react app', function() {
    it('contains the correct page title', function () {
        methods.goTo('http://localhost:3000');
        cy.title().should('equal', 'React App');
    });
    
    it('displays the amount of products found', function () {
        let productCount = methods.getTextContent('productsFound');
        productCount.should('include', 'Product(s) found');
    });

    it('displays an empty trolley initially', function () {
        methods.clickElement('trolleyIcon');
        const trolleyContents = methods.getTextContent('emptyState');
        trolleyContents.should('equal', 'Add some product in the bag :)');
        methods.clickElement('closeTrolley');
    });

    it('contains a feature to sort products', function () {
        let sortFeature = methods.getSelector('sortFeature');
        cy.get(sortFeature).should('be.visible');
    });

    it('displays a list of sizes to filter by', function () {
        let sizes = methods.getSelector('sizes');
        cy.get(sizes).should('be.visible');
    });

    it('contains a list of all sizes', function () {
        let sizes = methods.getTextContent('sizes');
        sizes.should('include', 'XS' + 'S' + 'M' + 'ML' + 'L' + 'XL' + 'XXL');
    });


    it('allows a user to add an item to their trolley', function () {
        methods.clickElement('XS');
        methods.clickElement('addToTrolley');
        cy.wait(1000);
        let trolleyContents = methods.getElementLength('trolleyContents');
        trolleyContents.should('have.length', '1');
        cy.screenshot('trolleyContents');
    });

    it('can be viewed on a mobile', function () {
        methods.emulate('iPhone');
        // screenshot will be output to this path
        cy.screenshot('mobileScreenshot');
    });
});

