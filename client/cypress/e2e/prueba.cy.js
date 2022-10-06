describe('Displays well the Main page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000', { timeout: 80000 })
  })

  it('Diplay Buttons and click', () => {
    
    
    cy.get('#add-button')
      .click()
    cy.get('#close-button')
      .click({force:true});

  })

  it('Diplay searchbar and find place', () => {
    
    cy.get('.mapboxgl-ctrl-geocoder--input')
      .type('camp nou')
    cy.get('.active').first().click()
    
  })

  // it('Display user current location using button', () => {
  //   cy.get('.mapboxgl-ctrl-geolocate').click()
  // })

})

