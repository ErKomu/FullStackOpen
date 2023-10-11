import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { dispatch } = useContext(NotificationContext)

  const showNotification = (message) => {
    dispatch({ type: 'setNotification', payload: message })
    setTimeout(() => {
      dispatch({ type: 'clearNotification' })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`you created anecdote: '${data.content}'`)
    },
    onError: (error) => {
      showNotification('too short anecdote, must have lenght 5 or more')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
