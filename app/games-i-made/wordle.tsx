'use client';

import { useState } from "react";

const words = ["apple", "mango", "grape", "crate", "hello"];

export default function Wordle() {
  const [chosenWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [guessCount, setGuessCount] = useState(0); // use state for counting guesses

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (guess.toLowerCase() === chosenWord) {
      setMessage("You win!");
    } else {
      const newCount = guessCount + 1;
      setGuessCount(newCount);

      if (newCount >= 5) {
        setMessage(`You lose! The word was "${chosenWord}".`);
      } else {
        setMessage(`Try again. You have ${5 - newCount} guesses left.`);
      }
    }

    setGuess(""); // reset input
  };

  return (
    <div>
      <h1>Wordle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button type="submit">Guess</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}