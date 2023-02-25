const defaultCommunityMemberName = () => ({
    givenName: "John",
    surname: `Quality Assurance-${Date.now()}`
})

Cypress.Commands.add('createCommunityMember', ({givenName, surname} = {...defaultCommunityMemberName()}) => {
    cy.findByText(/School community profiles/i).click()
    cy.findByText(/community members/i).click()

    cy.url().should('include', '/community/view')
    cy.findByRole('button', {name: /add community member/i}).click()

    cy.findByRole('textbox', {name: /\* given name/i}).type(givenName)
    cy.findByRole('textbox', {name: /surname/i}).type(surname)

    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /finish/i}).click()

    cy.findByText(`${givenName} ${surname}`).should('be.visible')

    return cy.wrap({givenName, surname} )
})