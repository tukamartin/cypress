describe('empty login data', () => {
  it('passes', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#login-button').click() 
    cy.get('#login_button_container > div > form > div.error-message-container.error > h3').should('have.text', 'Epic sadface: Username is required')
  })
})

describe('locked out user', () => {
  it('passes', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click() 
    cy.get('#login_button_container > div > form > div.error-message-container.error > h3').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  })
})

describe('standard user', () => {
  it('passes', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.location().should((loc) => {
      expect(loc.toString()).to.eq('https://www.saucedemo.com/inventory.html'      )
    })
  })
})

describe('bad password', () => {
  it('passes', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('bad_password')
    cy.get('#login-button').click() 
    cy.get('#login_button_container > div > form > div.error-message-container.error > h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })
})
