Cypress.Commands.add('login', () => {
    cy.visit('/login')

    cy.findByPlaceholderText(/email/i).type(Cypress.env('USERNAME'))
    cy.findByPlaceholderText(/password/i).type(Cypress.env('PASSWORD'))
    cy.findByRole('button', {name: /log in/i}).click()

    cy.url().should('include', '/staffapp/landing')
})