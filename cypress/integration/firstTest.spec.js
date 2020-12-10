
/// <reference types="cypress" />

describe('Our first suite', () => {

    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('input')    //for tag name
        cy.get('#inputEmail')  //for ID
        cy.get('.input-full-width') //for class
        cy.get('[placeholder]')  //for attribute name
        cy.get('[placeholder="Email"]')  // for atttribute name and value

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')

        cy.contains('[status = "warning"]','Sign in')
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()
        cy.contains('nb-card','Horizontal form').find('[type="email"]')
      
    })

    it('then  method', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')
        })
    })

    it('assert property', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
      
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('19').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 19, 2020')
        })
    
    
    })

    it('radio button', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
      
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons).first().check({force : true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force : true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('lists and dropdown', () => {
        //1 
        cy.visit('/')
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color','rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            if( index < 3){
                cy.wrap(dropdown).click()
            }
            })
        })
        

    })

    it('Web Tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Akash')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Shah')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Akash')
            cy.wrap(tableColumns).eq(3).should('contain', 'Shah')
        })

        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(1000)
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })

    })

})
