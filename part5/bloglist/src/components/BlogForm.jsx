import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    title
          <input
            id='title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
                    author
          <input
            id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
                    url
          <input
            id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='write url here'
          />
        </div>
        <button id='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

