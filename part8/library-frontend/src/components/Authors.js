import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const EDIT_AUTHOR = gql`
mutation createBook($name: String!, $bornInt: Int!){
    editAuthor(name: $name, setBornTo: $bornInt) {
      name
      born
  }
}
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const authorOptions = authors.map(author => ({ value: author.name, label: author.name }))

  const submitEditAuthor = async (event) => {
    event.preventDefault()

    let bornInt = parseInt(born)
    editAuthor({  variables: { name, bornInt } })
    console.log('author edited...')

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submitEditAuthor}>
          <h2>set birthyear</h2>
          <div>
            author
            <Select
              value={{ value: name, label: name }}
              onChange={(selectedOption) => setName(selectedOption.value)}
              options={authorOptions}
            />
          </div>
          <div>
            born
          <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          </div>
          <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default Authors
