const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

beforeEach(async () => {
  await User.deleteMany({});
});

test('creating a new user', async () => {
  const newUser = {
    username: 'newuser',
    password: 'password123',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);
})

test('creating a user with too short username or password', async () => {
  const invalidUser = {
    username: 'u1',
    password: 'pw',
  };

  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400);

  expect(response.body.error).toContain('Invalid username or password');
});

test('creating a user with non-unique username', async () => {
  const firstUser = {
    username: 'user1',
    password: 'password123',
  };

  await api.post('/api/users').send(firstUser);

  const duplicatedUser = {
    username: 'user1',
    password: 'anotherpassword',
  };

  const response = await api
    .post('/api/users')
    .send(duplicatedUser)
    .expect(400);

  expect(response.body.error).toContain('Username must be unique');
});

afterAll(async () => {
  await mongoose.connection.close();
});
