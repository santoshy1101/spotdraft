describe('Goodreads Automation Test', () => {
  it('should perform the required actions', () => {
    // 1. Login to goodreads.com
    
    cy.visit('https://www.goodreads.com/user/sign_in');

    cy.get('#user_email').type('santosh@gmail.com');

    cy.get('#user_password').type('Santosh@123');
    cy.get('#sign_in').click();

    // Ensure login is successful
    cy.url().should('include', '/user/show');

    // 2. Search for a specific book title
    const bookTitle = 'Harry Potter and the Philosopher’s Stone'; 
    cy.get('#sitesearch_field').type(bookTitle);
    cy.get('.searchBox__buttonContainer').click();

    // 3. Mark it as ‘want to read’
    cy.get('.wtrToRead').first().click();

    // Verify if the book is marked as 'want to read'
    cy.get('.wtrToRead').first().should('have.class', 'selected');

    // 4. Remove the selected book from my book list
    cy.get('.wtrToRead').first().click();

    // Verify if the book is removed from 'want to read'
    cy.get('.wtrToRead').first().should('not.have.class', 'selected');

    // 5. Logout
    cy.visit('https://www.goodreads.com/user/sign_out');

    // Verify if logout is successful
    cy.url().should('include', '/user/sign_out');
  });
});
