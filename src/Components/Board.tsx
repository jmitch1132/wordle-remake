import { useEffect, useState } from "react";
import "../Styles/Board.css";
import clsx from "clsx";

const WORD_LENGTH = 5;

interface BoardProps {
  answer: string;
  gameOver: boolean;
  guesses: string[];
  handleGameOver: (winGame: boolean) => void;
  setGuesses: (guesses: string[]) => void;
}

function Board({
  answer,
  handleGameOver,
  gameOver,
  guesses,
  setGuesses,
}: BoardProps) {
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
      } else if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return;
        if (answer === currentGuess) {
          handleGameOver(true);
        }
        const newGuesses = [...guesses];
        const guessIndex = guesses.findIndex((g) => g == null);
        if (guessIndex === WORD_LENGTH) handleGameOver(false);
        newGuesses[guessIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
      } else if (currentGuess.length < WORD_LENGTH) {
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
    rows.push(
      <div
        className={clsx("box", getColorClassname(isCorrect, found, oldGuess))}
        key={i}
      >
        {letter}
      </div>
    );
  }
  return <div className="row">{rows}</div>;
}

function getColorClassname(
  isCorrect: boolean,
  found: boolean,
  oldGuess: boolean
) {
  if (!oldGuess) {
    return "";
  }
  if (isCorrect) {
    return "correct";
  }
  if (found) {
    return "found";
  }
  return "incorrect";
}

export default Board;
