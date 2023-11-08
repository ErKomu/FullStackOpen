import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { gql, useQuery, useApolloClient } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author  {
      name
    }
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
  const [token, setToken] = useState('')
  const client = useApolloClient()

  const allBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const allAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (allBooks.loading || allAuthors.loading) {
    return <div>loading...</div>
  }

  if (!allBooks.data || !allBooks.data.allBooks) {
    return <div>Error loading books</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    console.log('token: ', token)
    return (
        <LoginForm setError={null} setToken={setToken} show={true}/>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors authors={allAuthors.data.allAuthors} show={page === 'authors'} />

      <Books books={allBooks.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm setToken={setToken} show={page === 'login'} />

    </div>
  )
}

export default App
