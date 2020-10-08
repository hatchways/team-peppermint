describe("authentication test", () => {
  it("logins successfully", () => {
    cy.visit('/login')

    cy.get('[name=email]').type('greg@mail.com')
    cy.get('[name=password]').type('qwerty123')
    cy.contains('Submit').click() 
    cy.get('p').should('contain', 'Greg')
  });
});
