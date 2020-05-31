## Part 5

NPM Modules for this part

https://testing-library.com/docs/react-testing-library/api#render-result

``` javascript
npm install --save-dev @testing-library/react @testing-library/jest-dom 
npm add --save-dev eslint-plugin-jest
npm install --save-dev cypress
react proptypes

```

### 5a

Login on the front end

* update app state to include login form feilds + also user state
* Add the form
* add a login service file. this holds the axios 'login' request data
* Add logic to the FE to display only part of the info if not logged in 
* noteservice update to save the token in memory and also to post token as header with the request
* useEffect or some onload method in the app component to check localstorage for a user login token

``` javascript
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
```

### 5b

props.children and proptypes

* Display login form only when appropriate
* props.children represents the components inside the tags of a react compnt
* you can create a reference to a component with ref syntax in react. this allows you to fire a child fucntion from a parent. in geral it is not recommended, but necessary in limited cases.
* proptypes allows something like type checking for a component. add the cmpnts props so that you can make sure that everything is working correctly.

``` javascript
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
```


### 5c Testing React Apps

* Testing libary and Jest are the primary tools
* render function allows DOM representation without creating whole browser runtime
* Search for component content to confirm it exists
* fireEvent function allows for mock manipulation of DOM (typing, clicking, etc.)
* mock functions in jest allow us to test how many times function is called, arguments, etc.
* philosophy is you should have unit tests that test the front end functionality AS A USER WOULD SEE, nothing more

``` javascript
  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
```

### 5d E2E or Integrated Testing with Cypress

* Cypress https://docs.cypress.io/guides/references/assertions.html#Common-Assertions
* tight but very full featured for e2e testing
* cypress uses anonymous functions in es5 syntax, no arrow functions
* cy.commands allow you to make custome commands
* never leave form submission as a UI task (add input, click 'submit' button) make a cy.call API req. instead
* create custom endpoints for DB manipulation that are only available in test env. 
* can target a specific element with #theButton syntax if you need specificity

``` javascript
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
```