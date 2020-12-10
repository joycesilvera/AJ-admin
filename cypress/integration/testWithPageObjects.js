const { createYield } = require("typescript")
const { onNavigationPage, navigateTo } = require("../support/page_objects/navigationPage")


describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
    })
})