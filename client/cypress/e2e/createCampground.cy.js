describe('Create a campground', () => {
  
  it('open newCampsite', () => {
    cy.visit('http://localhost:3000')
    cy.get('#add-button').click()
    cy.get('#newCampground-input').type('Primera prueba')
    cy.get('textarea').type('prueba de textarea')
    cy.get('#choose-file').click()
    cy.get('#create-button').click()
  })


})