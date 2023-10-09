import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes())
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote: (state, action) => {
      const anecdoteToVote = state.find((anecdote) => anecdote.id === action.payload)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    sortAnecdotes: (state) => {
      state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { incrementVote, appendAnecdote, setAnecdotes, sortAnecdotes } = anecdotesSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(sortAnecdotes())
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    await anecdoteService.incrementVote(id)
    dispatch(incrementVote(id))
    dispatch(sortAnecdotes())
  }
}


export default anecdotesSlice.reducer