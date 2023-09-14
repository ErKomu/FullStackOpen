import { useState } from 'react'
import blogService from '../services/blogs'

const blogForm = ({ blogs, setBlogs, setNotification }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleCreateBlog = async (blogObject) => {
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
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={newAuthor}
                        onChange={({ target }) => setNewAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        value={newUrl}
                        onChange={({ target }) => setNewUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default blogForm

