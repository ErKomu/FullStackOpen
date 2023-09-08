import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: `Log in failed`, type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    console.log('handleCreate called')
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification({ message: `Added ${blog.title}`, type: 'notification' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({ message: `Adding Blog Failed`, type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Show blog form">
          <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
      </div>
    )
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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
    </div>
  )


  const mainView = () => (
    <div>
      {blogForm()}
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notification.message} classname={notification.type} />
      {!user && loginForm()}
      {user && mainView()}
    </div>
  )
}

export default App