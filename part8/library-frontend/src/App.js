import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
   name  
   bookCount
   born
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  const allBooks = useQuery(ALL_BOOKS)
  console.log(allBooks.data)
  const allAuthors = useQuery(ALL_AUTHORS)
  console.log(allAuthors.data)

  if (allBooks.loading || allAuthors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={allAuthors.data.allAuthors} show={page === 'authors'} />

      <Books books={allBooks.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App
