describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const initUsers = [{
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    },
    {
      username: 'testuser2',
      name: 'Test User2',
      password: 'testpassword2'
    }]
    cy.request('POST', 'http://localhost:3003/api/users/', initUsers[0])
    cy.request('POST', 'http://localhost:3003/api/users/', initUsers[1])
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Log in failed')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Show blog form').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be created', function() {

      cy.contains('Added testtitle')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1').click()
    })

    it('A blog can be removed', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.contains('testtitle').find('elementSelector').should('not.exist');
    })

    it('Blog can be removed only by the user who added it', function() {
      cy.contains('logout').click()
      cy.get('#username').type('testuser2')
      cy.get('#password').type('testpassword2')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('remove').find('elementSelector').should('not.exist');
    })
  })

  describe('Ordering blogs', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Show blog form').click()
      cy.get('#title').type('The title with the least likes')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-blog-button').click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-blog-button').click()
      cy.get('#title').type('The title with the most likes')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#create-blog-button').click()
    })
    it('Blogs are ordered by likes', function() {
      cy.contains('The title with the most likes')
        .contains('view')
        .click()
      cy.contains('The title with the most likes')
        .contains('like')
        .click()
        .wait(200)
        .click()
        .wait(200)

      cy.contains('The title with the second most likes')
        .contains('view')
        .click()
      cy.contains('The title with the second most likes')
        .contains('like')
        .click()
        .wait(200)

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the least likes')
    })
  })
})