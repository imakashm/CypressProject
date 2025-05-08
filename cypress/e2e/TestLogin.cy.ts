describe('Demo Project', () => {
// Positive test case - Login with valid credentials
it('Login with valid credentials', () => {
    cy.fixture('TestLogin.json').then((Data) => {
      cy.visit('https://saucedemo.com/')
      cy.contains('Swag Labs').should('be.visible')
      cy.get('[data-test="username"]').type(Data.valid.username)
      cy.get('[data-test="password"]').type(Data.valid.password) 
      cy.get('[data-test="login-button"]').click()

      // Add product to the cart
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

      // Checkout with products in the cart
      cy.get('[data-test="shopping-cart-badge"]').click() // Cart
      cy.get('[data-test="checkout"]').click() // Checkout

      // Complete checkout process
      cy.get('[data-test="firstName"]').type('Adam')
      cy.get('[data-test="lastName"]').type('Michel')
      cy.get('[data-test="postalCode"]').type('600045')
      cy.get('[data-test="continue"]').click()
      cy.get('[data-test="finish"]').click() // Finish
      cy.get('[data-test="back-to-products"]').click() // Back to home

      // Verify Product Filter
      cy.get('[data-test="product-sort-container"]').select('Name (A to Z)'); // Select "Name (A to Z)"
      cy.get('[data-test="product-sort-container"]').select('Name (Z to A)'); // Select "Name (Z to A)"
      cy.get('[data-test="product-sort-container"]').select('Price (low to high)'); // Select "Price (low to high)"
      cy.get('[data-test="product-sort-container"]').select('Price (high to low)'); // Select "Price (high to low)"

      // Click on the burger menu and logout
      cy.get('#react-burger-menu-btn').click(); 
      cy.get('[data-test="logout-sidebar-link"]').click(); 

    });
    });

  // Negative test case - Login with invalid username
  it('Login with invalid username', () => {
    cy.fixture('TestLogin.json').then((Data) => {
      cy.visit('https://saucedemo.com/')
      cy.get('[data-test="username"]').type(Data.invalid.username) // Invalid username
      cy.get('[data-test="password"]').type(Data.valid.password) // Correct password
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]') // Verify the error message is displayed
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
    });
  });

  // Negative test case - Login with invalid password
  it('Login with invalid password', () => {
    cy.fixture('TestLogin.json').then((Data) => {
      cy.visit('https://saucedemo.com/')
      cy.get('[data-test="username"]').type(Data.valid.username) // Correct username
      cy.get('[data-test="password"]').type(Data.invalid.password) // Incorrect password
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]') // Verify the error message is displayed
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')

    });
  });

  // Negative test case - Login with empty credentials
  it('Login with empty credentials', () => {
    cy.fixture('TestLogin.json').then((Data) => {
      cy.visit('https://saucedemo.com/')
      cy.get('[data-test="username"]').type(Data.empty.username) // Empty username
      cy.get('[data-test="password"]').type(Data.empty.password) // Empty password
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]') // Verify the error message is displayed
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required')
    });
  });

});
