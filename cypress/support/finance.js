Cypress.Commands.add('navigateToDebtorAccount', ({entityName}) => {
    cy.findByText(entityName).click()
    cy.findByRole('treeitem', {name: `${entityName} chevron-up`})
    .parent()
    .within(() =>{
    cy.findByText(/debtor accounts/i).click()
    })

    cy.url().should('contain', '/debtors/debtor-accounts')
})