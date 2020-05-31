import React, { useState } from 'react'

const BlogForm = (props) => {
    const [newBlogTitle, setNewBlogTitle] = useState('') 
    const [newBlogUrl, setNewBlogUrl] = useState('') 

    const handleAddBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: newBlogTitle,
          url: newBlogUrl
        }
        setNewBlogTitle('')
        setNewBlogUrl('')
        props.addBlogToServer(blogObject)
    }
    return ( 
        <form onSubmit={handleAddBlog} className='blogForm'>
            <div>
            title
            <input 
            id="blogFormTitleInput"
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            />
        </div>
        <div>
            url
            <input
            id="blogFormURLInput"
            type="text"
            value={newBlogUrl}
            name="URL"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            />
        </div>
        <button id='blogFormSubmitButton' type="submit">post</button>
        </form>
     );
}
 
export default BlogForm;