import { useState } from "react";
import { Button } from "@mui/material";

import { easyWordList, hardWordList } from "../WordsList";
import Board from "./Board";
import "../Styles/Game.css";

function Game({
  level,
  setLevel,
}: {
  level: string;
  setLevel: (level: string) => void;
}) {
  const [answer, setAnswer] = useState(() => getWord());
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [guessedLetterSet, setGuessedLetterSet] = useState(new Set<string>());

  function addGuessedLetter(keys: string[]) {
    const updatedSet = new Set(guessedLetterSet);
    for (const key of keys) {
      updatedSet.add(key);
    }
    setGuessedLetterSet(updatedSet);
  }

  function getWord() {
    const list = level === "easy" ? easyWordList : hardWordList;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  }

  function handleGameOver(winGame: boolean) {
    if (winGame) {
      setWinGame(true);
    }
    setGameOver(!gameOver);
    setShowModal(true);
  }

  function handlePlayAgain() {
    setAnswer(getWord());
    setGuesses(Array(6).fill(null));
    setGameOver(false);
    setShowModal(false);
    setGuessedLetterSet(new Set<string>());
    setWinGame(false);
  }

  function handleChangeLevel() {
    setLevel("");
  }

  return (
    <>
      <Board
        answer={answer}
        handleGameOver={handleGameOver}
        guesses={guesses}
        setGuesses={setGuesses}
        gameOver={gameOver}
        guessedLetterSet={guessedLetterSet}
        addGuessedLetter={addGuessedLetter}
      />
      {showModal && (
        <Alert
          handlePlayAgain={handlePlayAgain}
          handleChangeLevel={handleChangeLevel}
          winGame={winGame}
          answer={answer}
          guesses={guesses}
        />
      )}
    </>
  );
}

function Alert({
  handlePlayAgain,
  handleChangeLevel,
  winGame,
  answer,
  guesses,
}: {
  handlePlayAgain: () => void;
  handleChangeLevel: () => void;
  winGame: boolean;
  answer: string;
  guesses: string[];
}) {
  const index = guesses.findIndex((g) => g == null);
  const turns = index !== -1 ? index : 6;

  return (
    <div className="modal">
      {winGame && (
        <div>
          <h1>You Win!</h1>
          <p className="desc">You found the word in {turns} of 6 moves</p>
          <p className="answer winner">{answer}</p>
          <span className="actions">
            <Button onClick={handlePlayAgain}>Play Again</Button>
            <Button onClick={handleChangeLevel}>Change Level</Button>
          </span>
        </div>
      )}
      {!winGame && (
        <div>
          <h1>Loser!</h1>
          <p className="answer loser">{answer}</p>
          <span className="actions">
            <Button className="playAgain" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Button className="changeLevel" onClick={handleChangeLevel}>
              Change Level
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Game;
