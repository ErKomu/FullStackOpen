import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {      
          return {          
            allBooks: allBooks.concat(addedBook),        
          }      
        })    
    }
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
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors authors={allAuthors.data.allAuthors} show={page === 'authors'} />

      <Books books={allBooks.data.allBooks} show={page === 'books'} />

      <Recommend show={page === 'recommend'} favoriteGenre={'action'} />

      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App
