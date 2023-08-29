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

describe('adding a blog', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })

    beforeEach(async () => {
        await Blog.deleteMany({});

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

        await Blog.insertMany(initialBlogs);
    });

    test('a new blog can be added', async () => {
        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            likes: 8,
        };

        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map((blog) => blog.title)

        expect(response.body).toHaveLength(3)
        expect(titles).toContain('Uusi blogi')
    })
      
    afterAll(async () => {
        await mongoose.connection.close();
    });
}, 10000)

describe('missing likes field', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })

    beforeEach(async () => {
        await Blog.deleteMany({});

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

        await Blog.insertMany(initialBlogs);
    });

    test('if likes is missing, it is set to 0', async () => {
        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
        };

        const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

        expect(response.body.likes).toBe(0);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
})

describe('blog can be deleted', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })

    beforeEach(async () => {
        await Blog.deleteMany({});

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

        await Blog.insertMany(initialBlogs);
    });

    test('a blog can be deleted', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        const titles = blogsAtEnd.map((blog) => blog.title);
        expect(titles).not.toContain(blogToDelete.title);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

})

describe('blog can be updated', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })

    beforeEach(async () => {
        await Blog.deleteMany({});
      });
      
      test('updating blog likes', async () => {
        console.log('testi alkaa')
        const newBlog = {
          title: 'Uusi blogi',
          author: 'Uusi kirjoittaja',
          url: 'http://www.example.com/uusiblogi',
          likes: 0,
        };
      
        const savedBlog = await api.post('/api/blogs').send(newBlog);
        console.log('blogi tallennettu')
      
        const updatedBlog = {
          ...savedBlog.body,
          likes: 10,
        };
      
        const response = await api
          .put(`/api/blogs/${updatedBlog.id}`)
          .send(updatedBlog)
          .expect(200)
      
        expect(response.body.likes).toBe(10);
        console.log('testi loppuu')
      }, 15000);
      
      afterAll(async () => {
        await mongoose.connection.close();
      });
})