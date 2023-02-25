Cypress.Commands.add('login', () => {
    cy.visit('/login')

    cy.findByPlaceholderText(/email/i).type(Cypress.env('USERNAME'))
    cy.findByPlaceholderText(/password/i).type(Cypress.env('PASSWORD'))
    cy.findByRole('button', {name: /log in/i}).click()

    cy.url().should('include', '/staffapp/landing')
})

//below are hacky due to how UI was built
Cypress.Commands.add('selectFromDropdown', (optionValue, role = 'button') => {
    cy.get('.rc-virtual-list').last().within(() => {
        cy.findByRole(role, {name: new RegExp(optionValue, "i")}).click()
    })
})

Cypress.Commands.add('customType', (value, role = 'combobox') => {
    cy.findByRole(role) //the input field of the contact is not acessible
        .type(value)
        .wait(3000) //hacky
        .type(`{backspace}`) //hacky please don't do this
        .type(`{backspace}`) // hacky as likely react-query isn't calling the community endpoint to get the recently created user
})

