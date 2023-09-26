import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemove = async () => {
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

  const handleLike = async () => {
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

  const showWhenAuthorized = { display: blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username ? '' : 'none' }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title}
      <Togglable showButtonLabel='view' hideButtonLabel='hide'>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div style={showWhenAuthorized}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
