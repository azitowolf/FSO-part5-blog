import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // utility functions
  const setNotificationTimer = (content) => {
    setNotification(
      content
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // event handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationTimer('Logged in successfully!')
    } catch (exception) {
      setNotificationTimer('wrong username or password')
    }
  }

  const handleLogout = async () => {
      window.localStorage.removeItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(null)
      setUsername('')
      setPassword('')
  }

  const handleAddBlogToServer = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationTimer('successfully added your note!')
      })
      .catch((exception) => {
        setNotificationTimer(`error caught - ${exception.message}`)
      })
  }

  const incrementLikesForBlog = (id) => {
    const blogObject = blogs.find((blog) => blog.id === id)
    blogService
    .update(id, {likes:blogObject.likes + 1})
    .then((returnedBlog) => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setNotificationTimer('liked!')
    })
    .catch((exception) => setNotificationTimer('error processing your request'))
  }

  const deleteBlog = (id) => {
    console.log('deleting  ' + id);
    
    blogService
    .destroy(id)
    .then((returnedBlog) => {
      setBlogs(blogs.filter(blog => blog.id !== id)) // splicing functionally
      setNotificationTimer('successfully deleted')
    })
    .catch((exception) => setNotificationTimer('error processing your request'))
  }

  // render functions
  const blogsList = () => {
    const sortByLikesDescending = (a,b) => {
        // a should come before b in the sorted order
        if(a.likes > b.likes){
          return -1;
        // a should come after b in the sorted order
        }else if(a.likes > b.likes){
            return 1;
        // a and b are the same
        }else{
            return 0;
        }
    }
    if(blogs === undefined) { 
      return "No blogs found or connection to internet is severed" 
    }
    return blogs
    .sort(sortByLikesDescending)
    .map(blog =>
      <Blog 
        key={blog.id} 
        blog={blog} 
        incrementLikesForBlog={incrementLikesForBlog} 
        deleteBlog={deleteBlog} />
    ) 
  }

  const renderBlogForm = () => (
    <Togglable buttonLabel='create a new post'>
      <BlogForm addBlogToServer={handleAddBlogToServer} />
    </Togglable>
  )

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

if (user) {
  return (
    <div>
      <Notification notification={notification} />
      <p>Logged in as {user.name}</p> <button onClick={handleLogout}> Log out </button>
      <h2>add new</h2>
      {renderBlogForm()}
      <h2>blogs</h2>
      {blogsList()}
    </div>
  )
} else {
  return (
    <div>
    <Notification notification={notification} />
    {renderLoginForm()}
    </div>)
}
}

export default App