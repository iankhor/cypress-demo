describe('creating a community member', () => {
    beforeEach(() => {
        cy.login()
        cy.createCommunityMember({ 
            givenName: 'Mike',
            surname: `Quality ${Date.now()}`
         }).as('communityMember')
    })
    
    it('successfully creates one', function() {

        expect(this.communityMember.givenName).to.eq('Mike')
        expect(this.communityMember.surname).to.contain('Quality')
    })
  })
