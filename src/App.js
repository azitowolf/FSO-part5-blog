import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('') 
  const [newBlogUrl, setNewBlogUrl] = useState('') 
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

  const handleAddBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      url: newBlogUrl
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogUrl('')
        setNotificationTimer('successfully added your note!')
      })
      .catch((exception) => {
        setNotificationTimer(`error caught - ${exception.message}`)
      })
  }

  // render functions
  const blogsList = () => {
    return blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }

  const addBlogForm = () => (
    <form onSubmit={handleAddBlog}>
          <div>
      title
        <input
        type="text"
        value={newBlogTitle}
        name="Title"
        onChange={({ target }) => setNewBlogTitle(target.value)}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={newBlogUrl}
        name="URL"
        onChange={({ target }) => setNewBlogUrl(target.value)}
      />
    </div>
    <button type="submit">post</button>
  </form>
  )

  const loginForm = () => (
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
      {addBlogForm()}
      <h2>blogs</h2>
      {blogsList()}
    </div>
  )
} else {
  return (
    <div>
    <Notification notification={notification} />
    {loginForm()}
    </div>)
}
}

export default App