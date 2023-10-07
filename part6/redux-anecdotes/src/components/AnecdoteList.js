import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(showNotification(`You voted: ${anecdotes.anecdoteList.find(anecdote => anecdote.id === id).content}`))
    }
      
    console.log('AnecdoteList: ', anecdotes.anecdoteList)

    return (
        <div>
            {anecdotes.anecdoteList
            .filter(anecdote => anecdote.content.toLowerCase().includes(anecdotes.anecdoteFilter.toLowerCase()))
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList