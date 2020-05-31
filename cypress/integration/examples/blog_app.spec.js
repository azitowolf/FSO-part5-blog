// Tests for FSO part 5d

describe('blog app', function(){
    
    // Reset the DB via testing route
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Bat Man',
            username: 'BDawg69',
            password: 'pass'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
    })

    // Login Form works correctly
    describe.only('Login Form',function() {
        it('succeeds with correct credentials', function() {
            cy.visit('http://localhost:3000')
            
            cy.contains('login').click()
            cy.get('#username').type('BDawg69')
            cy.get('#password').type('pass')
            cy.get('#login-button').click()
        
            cy.contains('Logged in as Bat Man')
        })

        it('fails with wrong credentials', function() {
            cy.visit('http://localhost:3000')
            cy.contains('login').click()
            cy.get('#username').type('BDawg69')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.get('.note').should('contain', 'wrong username or password')
        
            cy.get('html').should('not.contain', 'logged in')
        })
    })

    // Logged in functionality
    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({username:'BDawg69', password:'pass'})
        })
        it('A blog can be created', function(){
            cy.contains('create a new post').click()
            cy.get('#blogFormTitleInput').type('blog post 1')
            cy.get('#blogFormURLInput').type('fakeurl.com') 
            cy.get('#blogFormSubmitButton').click()

            cy.contains('blog post 1')
        })
        it('A user can like a blog', function(){
            cy.createBlog({title:'cypress blog post', url:'fakeurl.com'})
            cy.contains('show info').click()
            cy.contains('like').click()
            cy.contains('liked!')
        })
        it('A user can delete a blog', function(){
            cy.createBlog({title:'cypress blog post', url:'fakeurl.com'})
            cy.get('#deleteBlogButton').click()
            cy.get('html').should('not.contain', 'blog post 1')
        })
    })

    // Blog # and sorting 
    describe.only('Many blogs are created', function() {
        beforeEach(function() {
            cy.login({username:'BDawg69', password:'pass'})
            cy.createBlog({title:'cypress blog post 1', url:'fakeurl.com', likes:1})
            cy.createBlog({title:'cypress blog post 2', url:'fakeurl.com', likes:2})
            cy.createBlog({title:'cypress blog post 3', url:'fakeurl.com', likes:3})
            cy.createBlog({title:'cypress blog post 4', url:'fakeurl.com', likes:4})
        })
        it('Shows right # of blogs', function(){
            cy.get('.blogsList').children().should('have.length', 4)
        })        
        it('Shows blogs ordered by likes, ascending', function(){
            cy.get('.blogComponent').first().should('contain', 'cypress blog post 4')
            cy.get('.blogComponent').last().should('contain', 'cypress blog post 1')
        })
        
    })


})