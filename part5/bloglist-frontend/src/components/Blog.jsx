import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenAuthorized = { display: blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username ? '' : 'none' }
  return (
    <div className='blog' style={blogStyle}>
      {blog.title}
      <Togglable showButtonLabel='view' hideButtonLabel='hide'>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => handleLike({blog})}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div style={showWhenAuthorized}>
          <button onClick={() => handleRemove({blog})}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
