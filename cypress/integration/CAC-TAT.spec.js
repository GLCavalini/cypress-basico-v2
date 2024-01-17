/// <reference types="Cypress" />

 describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longTest = ' luca da coll Cavalini pois este text é realmente muito muito longo porem é somente para um teste bolado boaldao'
        cy.get('#firstName').type('Gian')
        cy.get('#lastName').type('Cavalini')
        cy.get('#email').type('giandacoll@gmail.com')
        cy.get('#open-text-area').type(longTest, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , function() {
        cy.get('#firstName').type('Gian')
        cy.get('#lastName').type('Cavalini')
        cy.get('#email').type('giandacoll@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preechido com um valor não numérico', function() {
        cy.get('#phone')
          .type('abcd')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Gian')
        cy.get('#lastName').type('Cavalini')
        cy.get('#email').type('giandacoll@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('gian')
            .should('have.value', 'gian')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('cavalini')
            .should('have.value', 'cavalini')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('giandacoll@gmail.com')
            .should('have.value', 'giandacoll@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('28977116')
            .should('have.value', '28977116')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })

  }) 

  