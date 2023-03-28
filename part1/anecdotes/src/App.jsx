import { useState } from "react";
import "./App.css";

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

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const getRandomAnecdote = () => getRandomInt(anecdotes.length);

  // Lazy state initialization
  const [selected, setSelected] = useState(() => getRandomAnecdote());
  const [mostVotes, setMostVotes] = useState(selected);
  const [votes, setVotes] = useState(() => new Uint8Array(anecdotes.length));

  const getNextRandomAnecdote = () => {
    while (true) {
      const possibleNext = getRandomAnecdote();
      if (possibleNext !== selected) return possibleNext;
    }
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);

    if (newVotes[mostVotes] < newVotes[selected]) {
      setMostVotes(selected);
    }
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>
        has {votes[selected]} {votes[selected] === 1 ? "vote" : "votes"}
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(getNextRandomAnecdote)}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVotes]}</div>
      <div>
        has {votes[mostVotes]} {votes[mostVotes] === 1 ? "vote" : "votes"}
      </div>
    </>
  );
};

export default App;
