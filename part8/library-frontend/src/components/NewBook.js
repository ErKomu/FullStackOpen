import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    title,
    author
  }
}
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createPerson ] = useMutation(CREATE_BOOK)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    let publishedInt = parseInt(published)
    createPerson({  variables: { title, author, publishedInt, genres } })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook