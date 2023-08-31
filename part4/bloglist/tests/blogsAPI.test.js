const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

describe('Get blogs with correct data', () => {

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

    test('id field is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})

describe('Adding, Updating and Deleting a blog', () => {

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
                user: '5f9f1b6b9b0b3b1e3c9b3b1e',
                url: 'http://www.example.com/blog1',
                likes: 10,
            },
            {
                title: 'Blogi 2',
                author: 'Kirjoittaja 2',
                user: '5f9f1b6b9b0b3b1e3c9b3b1e',
                url: 'http://www.example.com/blog2',
                likes: 5,
            },
        ];

        await Blog.insertMany(initialBlogs);

        await User.deleteMany({});

        const initialUsers = [
            {
                username: 'user1',
                name: 'user1',
                password: 'password123',
            },
            {
                username: 'user2',
                name: 'user2',
                password: 'securepassword',
            },
        ]

        const hashedUsers = await Promise.all(
            initialUsers.map(async (user) => {
                const passwordHash = await bcrypt.hash(user.password, 10);
                return { ...user, passwordHash };
            })
        );

        await User.insertMany(hashedUsers);
    });

    test('a new blog can be added', async () => {
        const user = await User.findOne({ username: 'user1' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET);


        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            likes: 8,
            userId: user.id,
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const titles = response.body.map((blog) => blog.title);

        expect(response.body).toHaveLength(3);
        expect(titles).toContain('Uusi blogi');
    })

    test('if likes is missing, it is set to 0', async () => {
        const user = await User.findOne({ username: 'user1' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET);

        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            userId: user.id,
        };

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(response.body.likes).toBe(0);
    })

    test('returns 400 Bad Request if title or url is missing', async () => {
        const user = await User.findOne({ username: 'user1' });
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
    
        const newBlogWithoutTitle = {
          author: 'Uusi kirjoittaja',
          url: 'http://www.example.com/uusiblogi',
          likes: 8,
          userId: user.id,
        };
    
        const newBlogWithoutUrl = {
          title: 'Uusi blogi',
          author: 'Uusi kirjoittaja',
          likes: 8,
          userId: user.id,
        };
    
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlogWithoutTitle)
          .expect(400);
    
        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlogWithoutUrl)
          .expect(400);
      });

    test('updating blog likes', async () => {
        const user = await User.findOne({ username: 'user1' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET);

        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            likes: 0,
            userId: user.id,
        };

        const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog);

        const updatedBlog = {
            ...savedBlog.body,
            likes: 10,
            user: user.id,
        };

        const response = await api
            .put(`/api/blogs/${updatedBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBlog)
            .expect(200);

        expect(response.body.likes).toBe(10);
    }, 15000);

    test('a blog can be deleted by its creator', async () => {
        const user = await User.findOne({ username: 'user1' })
        const token = jwt.sign({ id: user.id }, process.env.SECRET)

        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            likes: 0,
            userId: user.id,
        };

        const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog);

        const initialBlogs = await Blog.find({})

        await api
            .delete(`/api/blogs/${savedBlog.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

        const titles = blogsAtEnd.map((blog) => blog.title);
        expect(titles).not.toContain(savedBlog.body.title);
    });

    test('a blog cannot be deleted by a different user', async () => {
        const user1 = await User.findOne({ username: 'user1' });
        const user2 = await User.findOne({ username: 'user2' });

        const user1Token = jwt.sign({ id: user1.id }, process.env.SECRET)
        const user2Token = jwt.sign({ id: user2.id }, process.env.SECRET)

        const newBlog = {
            title: 'Uusi blogi',
            author: 'Uusi kirjoittaja',
            url: 'http://www.example.com/uusiblogi',
            likes: 0,
            userId: user1.id,
        };

        const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${user1Token}`)
        .send(newBlog);

        const initialBlogs = await Blog.find({})

        await api
            .delete(`/api/blogs/${savedBlog.body.id}`)
            .set('Authorization', `Bearer ${user2Token}`)
            .expect(401);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
})
