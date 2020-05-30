import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    let component
    const addBlogToServer = jest.fn()

    beforeEach(() => {
        component = render(
            <BlogForm 
                addBlogToServer={addBlogToServer}
            />
          )
    })

    test('BlogForm Renders', () => {
        const BlogForm = component.container.querySelector('.blogForm')
        expect(BlogForm).toBeDefined()
      })

    test('BlogForm Callback has correct inputs from form', () => {
        const BlogForm = component.container.querySelector('.blogForm')
        const URLInput = component.container.querySelector('#blogFormURLInput')
        const TitleInput = component.container.querySelector('#blogFormTitleInput')
        expect(URLInput).toBeDefined()
        expect(TitleInput).toBeDefined()

        fireEvent.change(URLInput, { 
            target: { value: 'wwww.testing.com' } 
          })    
        fireEvent.change(TitleInput, { 
            target: { value: 'testing of forms could be easier' } 
        })    

        fireEvent.submit(BlogForm)

        expect(addBlogToServer.mock.calls[0][0]).toBeDefined()
        expect(addBlogToServer.mock.calls).toHaveLength(1)
        expect(addBlogToServer.mock.calls[0][0]).toEqual({
            'title': 'testing of forms could be easier',
            'url': 'wwww.testing.com'
          })

    })

})