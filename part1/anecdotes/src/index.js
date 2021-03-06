import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const [highest, setHighest] = useState({
    value: 0,
    index: 0
  })

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const vote = () => {
    setPoints(pts => pts.map((pt, index) => {
      if (index === selected) pt += 1
      if (pt > highest.value) setHighest({ value: pt, index })
      return pt
    }))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => vote()}>vote</button>
      <button onClick={() => nextAnecdote()}>next anecdote</button>
      
      {Boolean(highest.value) && (<>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[highest.index]}</p>
        <p>has {highest.value} votes</p>
      </>)}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
