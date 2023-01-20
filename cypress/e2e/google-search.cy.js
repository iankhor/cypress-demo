describe('visiting google', () => {
  it('passes', () => {
    cy.visit('https://testing-library.com/')

    cy.findByRole('button', {name: /search/i}).click()
    cy.findByRole('searchbox').type('cypress')

    cy.get("#docsearch-list").within(() => {
      cy.findByRole('link', {name: "Usage Cypress Testing Library"}).click({ force: true })
    })

    cy.findByRole('heading', {name: /usage/i}).should('exist')
  })
})