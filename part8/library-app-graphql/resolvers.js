const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.countDocuments(),
        authorCount: async () => Author.countDocuments(),
        allBooks: async (root, args) => {
            let query = {}
            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                query.author = author._id
            }
            if (args.genre) {
                query.genres = args.genre
            }
            return Book.find(query).populate('author')
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            return authors.map(async author => {
                const bookCount = await Book.countDocuments({ author: author._id })
                return {
                    name: author.name,
                    born: author.born,
                    bookCount: bookCount
                }
            })
        },
        me: (root, args, context) => {
            console.log('Context: ', context)
            console.log('Current User:', context.currentUser)
            return context.currentUser
          },
        
    },
    Mutation: {
        addBook: async (root, args, context) => {
          console.log('addBook called with args:', args)
      
          if (!context.currentUser) {
            console.log('Add book failed unauthorized')
            throw new GraphQLError('Unauthorized', {
              extensions: {
                code: 'UNAUTHORIZED'
              }
            })
          }
      
          try {
            let author = await Author.findOne({ name: args.author })
            console.log('Author found:', author)
      
            if (!author) {
              author = new Author({ name: args.author })
              await author.save()
              console.log('Author created:', author)
            }
      
            const book = new Book({ ...args, author: author._id })
            await book.save()
            console.log('Book created:', book)

            const bookWithAuthor = await Book.findById(book._id).populate('author')

            pubsub.publish('BOOK_ADDED', { bookAdded: bookWithAuthor })  
      
            return bookWithAuthor
          } catch (error) {
            console.error('Saving book failed:', error)
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('Unauthorized', {
                    extensions: {
                        code: 'UNAUTHORIZED'
                    }
                })
            }
            try{
            const author = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true }
            )
            return author
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        
            return user.save()
              .catch(error => {
                throw new GraphQLError('Creating the user failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                  }
                })
              })
          },
          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secret' ) {
              throw new GraphQLError('wrong credentials', {
                extensions: {
                  code: 'BAD_USER_INPUT'
                }
              })        
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
        
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
          },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    },
}

module.exports = resolvers