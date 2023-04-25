import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const Anecdote = ({text, votes}) => {
    return (
        <div>
            <p>{text}</p>
            <p>Has {votes} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [selected, setSelected] = useState(0)

    let random = Math.floor(Math.random()*anecdotes.length)
    
    const handleAddPoint = () => {
        const copy = {...votes}
        copy[selected] += 1
        setVotes(copy)
        console.log(votes.length)
    }

    const getMostVotedIndex = () => {
        let mostVotedIndex = 0;
        for(let i = 0; i < anecdotes.length; i++) {
            if(votes[mostVotedIndex] < votes[i]) {
                mostVotedIndex = i;
            }
        }
        return mostVotedIndex
    }

    const setRandomToSelected = () => {
        while(random == selected){
            random = Math.floor(Math.random()*anecdotes.length)
        }
        setSelected(random)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
            <Button handleClick={() => setRandomToSelected()} text="next anecdote"/>
            <Button handleClick={() => handleAddPoint()} text="vote"/>
            <h1>Anecdote with most votes</h1>
            <Anecdote text={anecdotes[getMostVotedIndex()]} votes={votes[getMostVotedIndex()]}/>
        </div>
    )
}



export default App