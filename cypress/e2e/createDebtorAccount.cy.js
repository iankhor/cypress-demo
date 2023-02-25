describe('creating a debtor account', () => {
    beforeEach(() => {
        cy.login()
        cy.createCommunityMember().as('communityMember')
        cy.navigateToDebtorAccount({ entityName: 'Dobby Army Finance'})

    })
    
    it('successfully creates one', function() {
        cy.findByRole('button', {name: /add debtor account/i}).click()
        cy.findByRole('combobox', {name: /debtor ledger/i}).click()

        cy.get('.rc-virtual-list').within(() => {
            cy.findByRole('generic', {name: /school fees/i}).click()
        })
    })
  })
