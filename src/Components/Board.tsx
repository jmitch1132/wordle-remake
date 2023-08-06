import { useCallback, useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import "../Styles/Board.css";
import clsx from "clsx";

const WORD_LENGTH = 5;

function Board({
  answer,
  handleGameOver,
  gameOver,
  guesses,
  setGuesses,
  guessedLetterSet,
  addGuessedLetter,
}: {
  answer: string;
  handleGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  guessedLetterSet: ReadonlySet<string>;
  addGuessedLetter: (guess: string[]) => void;
}) {
  const [currentGuess, setCurrentGuess] = useState("");
  const isValidKey = (key: string) => {
    return (
      (key.length === 1 && key.match(/[a-zA-Z]/i)) ||
      key === "Enter" ||
      key === "Backspace"
    );
  };

  const handleKeyDown = useCallback(
    (key: string) => {
      if (gameOver || !isValidKey(key)) {
        return;
      }
      if (key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      if (key === "Enter") {
        if (currentGuess.length !== 5) return;
        if (answer === currentGuess) {
          handleGameOver(true);
        }
        const newGuesses = [...guesses];
        const guessIndex = guesses.findIndex((g) => g == null);
        if (guessIndex === 5) handleGameOver(false);
        newGuesses[guessIndex] = currentGuess;
        addGuessedLetter(currentGuess.split(""));
        setGuesses(newGuesses);
        setCurrentGuess("");
        return;
      }

      if (currentGuess.length < 5) {
        setCurrentGuess((old) => old + key.toUpperCase());
      }
    },
    [
      answer,
      currentGuess,
      gameOver,
      guesses,
      handleGameOver,
      setGuesses,
      addGuessedLetter,
    ]
  );

  useEffect(() => {
    const handleType = (e: any) => {
      handleKeyDown(e.key);
    };
    document.addEventListener("keydown", handleType);

    return () => document.removeEventListener("keydown", handleType);
  }, [handleKeyDown]);

  return (
    <div className="game">
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
      <Keyboard
        answer={answer}
        handleKeyDown={handleKeyDown}
        guessedLetters={guessedLetterSet}
        guesses={guesses}
      />
    </div>
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
