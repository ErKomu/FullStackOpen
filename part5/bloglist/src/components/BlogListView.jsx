import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogListView = ({ blogs, setBlogs, setNotification, user, setUser }) => {

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleRemove = async ({ blog }) => {
    try {
      if (window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(updatedBlogs)
      }
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLike = async ({ blog }) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const response = await blogService.update(updatedBlog)
      const i = blogs.findIndex(b => b.id === blog.id)

      if (i !== -1) {
        const updatedBlogs = [...blogs]
        updatedBlogs[i] = updatedBlog
        setBlogs(updatedBlogs)
      }
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      const updatedBlogs = [...blogs, blog]
      await setBlogs(updatedBlogs)
      setNotification({ message: `Added ${blog.title}`, type: 'notification' })
      setTimeout(() => {
        setNotification('')
      }, 5000)

    } catch (exception) {
      console.log(exception)
      setNotification({ message: 'Adding Blog Failed', type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  return (
    <div>
      <Togglable showButtonLabel="Show blog form" hideButtonLabel="cancel">
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button id='logout-button' onClick={handleLogout}>logout</button>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          console.log(blog)
          return(
            <div key={blog.id}>
              <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
              <br />
            </div>
          )})}
    </div>
  )
}

export default BlogListView