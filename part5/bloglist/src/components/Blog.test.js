import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { createTestScheduler } from 'jest'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Aurhor',
    url: 'Test Url',
    likes: 0,
    user: 'Test User'
  }

  const loggedInUser = { username: 'Test User' }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('renders content when view button clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Aurhor',
    url: 'Test Url',
    likes: 0,
    user: { name: 'Test User' }
  }

  const loggedInUser = { username: 'Test User' }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))

  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  act(() => {
    button.click()
  })

  expect(screen.getByText(blog.title)).toBeDefined()
  expect(screen.getByText((content, element) => content.includes(blog.author))).toBeDefined()
  expect(screen.getByText((content, element) => content.includes(blog.url))).toBeDefined()
  expect(screen.getByText((content, element) => content.includes(`likes ${blog.likes}`))).toBeDefined()
  expect(screen.getByText((content, element) => content.includes(blog.user.name))).toBeDefined()
})

test('like button click calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'Test Url',
    likes: 0,
    user: 'Test User',
  }

  const loggedInUser = { username: 'Test User' }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
