import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const RecommendForNow = (props) => {
    if (!props.show) {
        return null
    }
    return props.genre
}

const Recommend = (props) => {

  const genre = props.favoriteGenre

  const data = useQuery(ALL_BOOKS, { variables: { genre } })
  const books = data ? data.allBooks : []

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommend</h2>

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

export default RecommendForNow