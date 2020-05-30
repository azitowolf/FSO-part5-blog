## Part 5

NPM Modules for this part

https://testing-library.com/docs/react-testing-library/api#render-result

``` javascript
npm install --save-dev @testing-library/react @testing-library/jest-dom 
npm add --save-dev eslint-plugin-jest

```

### 5a

Login on the front end

* update app state to include login form feilds + also user state
* Add the form
* add a login service file. this holds the axios 'login' request data
* Add logic to the FE to display only part of the info if not logged in 
* noteservice update to save the token in memory and also to post token as header with the request
* useEffect or some onload method in the app component to check localstorage for a user login token


### 5b

props.children and proptypes

* Display login form only when appropriate
