describe("authentication test", () => {
  it("logins successfully", () => {
    cy.visit('/login')

    cy.get('[name=email]').type('andrey@mail.com')
    cy.get('[name=password]').type('qwerty123')
    cy.contains('Submit').click() 
    cy.get('p').should('contain', 'Andrey')
  });
});

describe("chating with a user named John", () => {
  it("writes welcome message to John", () => {
    cy.get('p').contains('John').click({ force: true })

    cy.get('input.MuiInputBase-input').type('Hi buddy, how are you {enter}')
  
    cy.get('p').should('contain', 'Hi buddy')
  });
});