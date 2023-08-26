const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('correct number of blogs', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      })
    
    beforeEach(async () => {
        await Blog.deleteMany({})

        const initialBlogs = [
            {
                title: 'Blogi 1',
                author: 'Kirjoittaja 1',
                url: 'http://www.example.com/blog1',
                likes: 10,
            },
            {
                title: 'Blogi 2',
                author: 'Kirjoittaja 2',
                url: 'http://www.example.com/blog2',
                likes: 5,
            },
        ]

        await Blog.insertMany(initialBlogs)
    })

    test('returns the correct number of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveLength(2)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})

describe('correct id field', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
      })
      
    beforeEach(async () => {
        await Blog.deleteMany({})

        const initialBlogs = [
            {
                title: 'Blogi 1',
                author: 'Kirjoittaja 1',
                url: 'http://www.example.com/blog1',
                likes: 10,
            },
            {
                title: 'Blogi 2',
                author: 'Kirjoittaja 2',
                url: 'http://www.example.com/blog2',
                likes: 5,
            },
        ]

        await Blog.insertMany(initialBlogs)
    })

    test('id field is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})