/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })  

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  }) 

  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
    cy.get('#firstName').type('Jéssica')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('jessica@exemplo.com') 
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe uma mensagem de erro ao submeter o formulário com um e-mail formatado incorretamente', function() {
    cy.get('#firstName').type('Jéssica')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('jessicaexemplo.com')   
    cy.get('#open-text-area').type('testando!')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('verifica que o campo telefônico permanece vazio ao ser preenchido com um valor não numérico', function() {
    cy.get('#phone').type('jmdjaslmds').should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Jéssica')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('jessica@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('testando!')
    cy.contains('button', 'Enviar').click()     
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, e-mail e telefone', function() {
    cy.get('#firstName').type('Jéssica').should('have.value', 'Jéssica').clear().should('have.value', '')
    cy.get('#lastName').type('Santos').should('have.value', 'Santos').clear().should('have.value', '')
    cy.get('#email').type('jessica@exemplo.com').should('have.value', 'jessica@exemplo.com').clear().should('have.value', '')
    cy.get('#phone').type('66666').should('have.value', '66666').clear().should('have.value', '')
  })

  it('mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()    
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
   })

it('marca cada tipo de atendimento', function() {
  cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
   })



   
 })

 
})
