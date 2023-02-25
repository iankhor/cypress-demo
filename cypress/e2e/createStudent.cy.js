describe('creating a student', () => {
    beforeEach(() => {
        cy.login()
        cy.createStudent({ 
            givenName: 'Thomas',
            surname: `Wayne-${Date.now()}`
         }).as('student')
    })
    
    it('successfully creates one', function(){
        expect(this.student.givenName).to.eq('Thomas')
        expect(this.student.surname).to.contain('Wayne')
    })
  })
