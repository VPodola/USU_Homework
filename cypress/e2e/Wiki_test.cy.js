describe('Automatic testing of Wikipedia search', () => {
  it('Visits Wikipedia.org', () => {
    cy.visit('https://en.wikipedia.org/wiki/Main_Page')
    cy.get('.vector-search-box-input').type('Schwarzenegger').type('{enter}')
  })

  it('Verifies article is about Arnold Schwarzenegger', () => {
    cy.get("#mw-content-text > div.mw-parser-output").should('contain', 'Arnold Schwarzenegger').and('contain', 'governor').and('contain', 'actor')
  })

  it('Verifies page contains chapter about personal life', () => {
    cy.get("#toc > ul").should('contain', 'Personal life')
  })

  it('Verifies page exist translations in english, spanish and german', () => {
    //verifies that current page is in english
    cy.url().should('contains', 'en')
    
    //verifies that the page exists in spanish and german
    cy.contains("Deutsch").click().url().should('contains', '/Arnold_Schwarzenegger')
    cy.go("back")
    cy.contains("Español").click().url().should('contains', '/Arnold_Schwarzenegger')
    cy.go("back")
  })

  it('Verifies page can be exported as PDF', () => {
    //verifies that the element "Download as PDF" loads the page enabling export to PDF
    cy.get("#mw-panel").contains("Download as PDF").click();
  })
})