// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'My Delicious Articles')
  })

  it('Should have 5 fake articles showing', () => {
    cy.visit('/')
    cy.get('.article').should('have.length', 5)
  })
})
