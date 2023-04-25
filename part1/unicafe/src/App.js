import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button> 
)

const StatisticLine = ({text, value, unit}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, count, average, positive}) => {
  if(count == 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="count" value={count} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} unit="%"/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let count = good + neutral + bad
  let average = (good - bad) / count
  let positive = good / count * 100
  if (count == 0){
    average = 0
    positive = 0
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
        count = {count}
        average = {average}
        positive = {positive}/>
    </div>
  )
}

export default App
