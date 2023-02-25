const defaultCommunityMemberName = () => ({
    givenName: "Thomas",
    surname: `CommunitySurname-${Date.now()}`
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

const defaultStudentName = () => ({
    givenName: "John",
    surname: `StudentSurname-${Date.now()}`
})

Cypress.Commands.add('createStudent', ({givenName, surname} = {...defaultStudentName()}) => {
    cy.findByText(/student profiles/i).click()
    cy.findByText(/current student/i).click()

    cy.url().should('include', '/student/view')
    cy.findByRole('button', {name: /add student/i}).click()

    cy.findByRole('textbox', {name: /\* given name/i}).type(givenName)
    cy.findByRole('textbox', {name: /surname/i}).type(surname)

    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('textbox', {name: /start date/i}).type('01/02/2023{enter}',{force: true}) //hacky

    cy.findByRole('button', {name: /next/i}).click()

    cy.findByRole('textbox', {name: /\* given name/i}).type(`robin-${Date.now()}`)

    // contact person
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByRole('button', {name: /next/i}).click()
    

    // contact's spouse
    cy.get('form[id="addAspouse"]').within(() => {
        cy.get('input[type="radio"]').last().click() //hacky
    })

    cy.findByRole('button', {name: /finish/i}).click()
    cy.findByText(`${givenName} ${surname}`).should('be.visible')

    return cy.wrap({givenName, surname} )
})