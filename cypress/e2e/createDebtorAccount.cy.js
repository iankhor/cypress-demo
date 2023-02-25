describe('creating a debtor account', () => {
    beforeEach(() => {
        cy.login()
        cy.createCommunityMember().as('communityMember')
        cy.createStudent().as('student')
        cy.wait(500)
    })
    
    it('successfully creates one', function() {
        cy.navigateToDebtorAccount({ entityName: 'Dobby Army Finance'})

        cy.findByRole('button', {name: /add debtor account/i}).click()
        cy.findByRole('combobox', {name: /debtor ledger/i}).click()

        cy.selectFromDropdown('school fees', 'generic')

        cy.findByRole('combobox', {name: /billing group/i})
        .click()
        .then(() => {
            cy.selectFromDropdown('monthly payment', 'generic')
        })
        cy.findByRole('button', {name: /next/i}).click()

        
        // Select community member
        const {givenName, surname} = this.communityMember
        const communityMemberFullName = `${givenName} ${surname}`
        const communityMemberSurname = `${surname}`
         
        cy.findByRole('combobox') //the input field of the contact is not acessible
        .type(communityMemberSurname)
        .wait(500)
        .type(`{backspace}`) // hacky as likely react-query isn't calling the community endpoint to get the recently created user

        cy.selectFromDropdown(communityMemberFullName)

        cy.findByRole('button', {name: /next/i}).click()

        // Select student member
        const studentFullName = `${this.student.givenName} ${this.student.surname}`
        const studentSurname = `${this.student.surname}`
         
        cy.findByRole('combobox') //the input field of the contact is not acessible
        .type(studentSurname)
        .wait(500)
        .type(`{backspace}`)
        .type(`{backspace}`) // hacky as likely react-query isn't calling the community endpoint to get the recently created user
        
        cy.selectFromDropdown(studentFullName)
        
        cy.findByText(studentFullName).should('be.visible')
        cy.wait(1000) //super hacky
        cy.findByRole('button', {name: /next/i}).click()
        cy.findByRole('button', {name: /save/i}).click()

        cy.findAllByText(RegExp(this.student.givenName, "i")).first().should('be.visible') //hacky assertion but it will do now
    })
  })
