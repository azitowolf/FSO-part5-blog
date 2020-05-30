import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let blogContent = 
    {
        "title": "fake article",
        "url": "with a fake URL",
        "author": "fakester",
        "likes": 1
      }
    const incrementLikesForBlog = jest.fn()
    const deleteBlog = jest.fn()
    beforeEach(() => {
        component = render(
            <Blog 
              key={123123} 
              blog={blogContent} 
              incrementLikesForBlog={incrementLikesForBlog} 
              deleteBlog={deleteBlog}
            />
          )
    })

    test('Blog renders only title by default', () => {
        const titlefield = component.container.querySelector('.blogTitle')
        expect(titlefield).toBeDefined()
        expect(titlefield).toHaveTextContent('fake article')
      })
    test('Blog renders other info after clickButton', () => {
        const ShowInfoButton = component.container.querySelector('.toggleShowButton')
        expect(ShowInfoButton).toBeDefined()
        fireEvent.click(ShowInfoButton)
        const hiddenInfoContainer = component.container.querySelector('.moreInfo')
        expect(hiddenInfoContainer).not.toHaveStyle('display:none')
        expect(hiddenInfoContainer).toHaveTextContent('About the author')
        expect(component.container.querySelector('.url')).toBeDefined() //finding the url cmpnt
        expect(component.container.querySelector('.likes')).toBeDefined() // finding the likes cmpnt
    })
    test('Click Like Twice calls fnc twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        
        console.log(incrementLikesForBlog.mock.cals)
    
        expect(incrementLikesForBlog.mock.calls).toHaveLength(2)
    })
})