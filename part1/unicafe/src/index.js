import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Statistic({ text, value }) {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = () => {
    const total = good + bad + neutral
    return (good * 1 + bad * -1) / total
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Statistics</h2>

      <table>
        <tbody>
          <Statistic text={'good'} value={good} />
          <Statistic text={'neutral'} value={neutral} />
          <Statistic text={'bad'} value={bad} />
          <Statistic text={'all'} value={good + bad + neutral} />
          <Statistic text={'average'} value={average() || 0} />
          <Statistic text={'positive'} value={`${good / (good + bad + neutral) * 100 || 0}%`} />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
// start from 22