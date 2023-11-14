import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'

const Recommendations = (props) => {

  const userInfo = useQuery(USER_INFO)
  const genre = userInfo.data ? userInfo.data.me.favoriteGenre : ''

  const data = useQuery(ALL_BOOKS, { variables: { genre } })
  //console.log('data: ', data)
  const books = data.loading ? [] : data.data.allBooks
  //console.log('books: ', books)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations