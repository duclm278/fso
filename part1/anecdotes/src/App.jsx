import { useState } from "react";
import "./App.css";

const getRandomInt = (max) => Math.floor(Math.random() * max);

const Anecdote = ({ anecdotes, index, points }) => (
  <>
    <div>{anecdotes[index]}</div>
    <div>
      has {points[index]} {points[index] === 1 ? "vote" : "votes"}
    </div>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomAnecdotes = () => getRandomInt(anecdotes.length);

  // Lazy state initialization
  const [selected, setSelected] = useState(() => getRandomAnecdotes());
  const [points, setPoints] = useState(() => new Uint8Array(anecdotes.length));
  const indexMostVotes = points.indexOf(Math.max(...points));

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes} index={selected} points={points} />
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => setSelected(getRandomAnecdotes)}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} index={indexMostVotes} points={points} />
    </>
  );
};

export default App;
