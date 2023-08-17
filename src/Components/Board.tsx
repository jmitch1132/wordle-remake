import { useCallback, useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import "../Styles/Board.css";
import clsx from "clsx";

const WORD_LENGTH = 5;

interface BoardProps {
  answer: string;
  handleGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  guessedLetterSet: ReadonlySet<string>;
  addGuessedLetter: (guess: string[]) => void;
}

function Board({
  answer,
  handleGameOver,
  gameOver,
  guesses,
  setGuesses,
  guessedLetterSet,
  addGuessedLetter,
}: BoardProps) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [jump, setJump] = useState(false);
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
        if (guessIndex === WORD_LENGTH) handleGameOver(false);
        newGuesses[guessIndex] = currentGuess;
        addGuessedLetter(currentGuess.split(""));
        setGuesses(newGuesses);
        setCurrentGuess("");
        return;
      }

      if (currentGuess.length < 5) {
        setCurrentGuess((old) => old + key.toUpperCase());
      }

      setJump(true);
      setTimeout(() => {
        setJump(false);
      }, 500);
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
              jump={jump}
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
  jump,
}: {
  guess: string;
  answer: string;
  oldGuess: boolean;
  jump: boolean;
}) {
  const rows = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i];
    const found = answer.includes(letter);
    const isCorrect = answer[i] === letter;
    rows.push(
      <div
        className={clsx(
          "box",
          jump ? "jumping" : "",
          getColorClassname(isCorrect, found, oldGuess)
        )}
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
