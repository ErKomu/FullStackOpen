import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('')

  const { data, refetch } = useQuery(ALL_BOOKS, { variables: { genre } })
  //console.log('data: ', data)
  const books = data ? data.allBooks : []

  const handleGenreChange = async (newGenre) => {
    setGenre(newGenre)
    await refetch({ genre: newGenre })
    //console.log(books)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
      <button onClick={() => handleGenreChange('refactoring')}>refactoring</button>
      <button onClick={() => handleGenreChange('agile')}>agile</button>
      <button onClick={() => handleGenreChange('design')}>design</button>
      <button onClick={() => handleGenreChange('crime')}>crime</button>
      <button onClick={() => handleGenreChange('classic')}>classic</button>
      <button onClick={() => handleGenreChange('')}>all genres</button>
    </div>
  )
}

export default Books
