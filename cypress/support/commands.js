Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Jéssica')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('jessica@exemplo.com')
    cy.get('#open-text-area').type('testanto!')
    cy.contains('button', 'Enviar').click()
    })
    


