describe('creating a debtor account', () => {
    beforeEach(() => {
        cy.login()
        cy.createCommunityMember().as('communityMember')
        cy.createStudent().as('student')
        cy.wait(500)
    })
    
    it('successfully creates one', function() {
        const communityMemberFullName = `${this.communityMember.givenName} ${this.communityMember.surname}`
        const communityMemberSurname = `${this.communityMember.surname}`
        const studentFullName = `${this.student.givenName} ${this.student.surname}`
        const studentSurname = `${this.student.surname}`

        cy.navigateToDebtorAccount({ entityName: Cypress.env('FINANCE_ENTITY')})

        // Step 1 of 3
        cy.findByRole('button', {name: /add debtor account/i}).click()
        cy.findByRole('combobox', {name: /debtor ledger/i}).click()
        cy.selectFromDropdown('school fees', 'generic')

        cy.findByRole('combobox', {name: /billing group/i})
          .click()
          .then(() => cy.selectFromDropdown('monthly payment', 'generic'))
        cy.findByRole('button', {name: /next/i}).click()
        
        // Step 2 of 3 Select community member
        cy.customType(communityMemberSurname)
        cy.selectFromDropdown(communityMemberFullName)
        cy.findByRole('button', {name: /next/i}).click()

        // Step 3 of 3 Select student member
        cy.customType(studentSurname)
        cy.selectFromDropdown(studentFullName)
        cy.findByText(studentFullName).should('be.visible')
        cy.wait(3000) //super hacky
        cy.findByRole('button', {name: /next/i}).click()
        cy.findByRole('button', {name: /save/i}).click()

        cy.findAllByText(RegExp(this.student.givenName, "i")).first().should('be.visible') //hacky assertion but it will do now
    })
  })
