import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogListView from './components/BlogListView'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

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

  const loginForm = () => (
    <LoginForm
      setUser={setUser}
      setNotification={setNotification} />
  )

  const blogListView = () => (
    <BlogListView
      blogs={blogs}
      setBlogs={setBlogs}
      setNotification={setNotification}
      user={user}
      setUser={setUser}
    />
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notification.message} classname={notification.type} />
      {!user && loginForm()}
      {user && blogListView()}
    </div>
  )
}

export default App