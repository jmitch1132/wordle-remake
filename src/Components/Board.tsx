import { useEffect, useState } from "react";
import "../Styles/Board.css";
import clsx from "clsx";

const WORD_LENGTH = 5;

function Board({
  answer,
  handleGameOver,
  gameOver,
  guesses,
  setGuesses,
}: {
  answer: string;
  handleGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
}) {
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    const isValidKey = (key: string) => {
      return (
        (key.length === 1 && key.match(/[a-zA-Z]/i)) ||
        key === "Enter" ||
        key === "Backspace"
      );
    };
    const handleKeyDown = (e: { key: string }) => {
      if (gameOver || !isValidKey(e.key)) {
        return;
      }
      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        if (currentGuess.length !== 5) return;
        if (answer === currentGuess) {
          handleGameOver(true);
        }
        const newGuesses = [...guesses];
        const guessIndex = guesses.findIndex((g) => g == null);
        if (guessIndex === 5) handleGameOver(false);
        newGuesses[guessIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        return;
      }

      if (currentGuess.length < 5) {
        setCurrentGuess((old) => old + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, answer, gameOver, guesses, handleGameOver, setGuesses]);

  return (
    <>
      <div className="board">
        {guesses.map((guess, index) => {
          const isCurrent = index === guesses.findIndex((g) => g == null);
          return (
            <Row
              guess={isCurrent ? currentGuess : guess ?? ""}
              answer={answer}
              oldGuess={!isCurrent && guess != null}
            />
          );
        })}
      </div>
    </>
  );
}

function Row({
  guess,
  answer,
  oldGuess,
}: {
  guess: string;
  answer: string;
  oldGuess: boolean;
}) {
  const rows = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i];
    const found = answer.includes(letter);
    const isCorrect = answer[i] === letter;
    const colorClass = oldGuess ? getClassName(isCorrect, found) : "";
    rows.push(
      <div className={clsx("box", colorClass)} key={i}>
        {letter}
      </div>
    );
  }
  return <div className="row">{rows}</div>;
}

function getClassName(isCorrect: boolean, found: boolean) {
  if (isCorrect) {
    return "correct";
  }
  if (found) {
    return "found";
  }
  return "incorrect";
}

export default Board;
