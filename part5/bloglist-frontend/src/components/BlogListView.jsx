import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogListView = ({ blogs, setBlogs, setNotification, user, setUser }) => {

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Togglable showButtonLabel="Show blog form" hideButtonLabel="cancel">
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
      </Togglable>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div key={blog.id}>
            <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} />
            <br />
          </div>
        ))}
    </div>
  )
}

export default BlogListView