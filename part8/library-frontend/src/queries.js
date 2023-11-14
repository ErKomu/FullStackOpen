import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
      author {
        name
      }
      published
      genres
  }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login (
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
   name  
   bookCount
   born
  }
}
`

export const EDIT_AUTHOR = gql`
mutation createBook($name: String!, $bornInt: Int!){
    editAuthor(name: $name, setBornTo: $bornInt) {
      name
      born
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    author {
      name
    }
  }
}
`

