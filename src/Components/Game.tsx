import { useState } from "react";
import { easyWordList, hardWordList } from "../WordsList";
import Board from "./Board";
import "../Styles/Game.css";
import { Button, Dialog, DialogContent } from "@mui/material";

function Game({ difficultyLevel }: { difficultyLevel: string }) {
  const [answer, setAnswer] = useState(() => getWord());
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [showModal, setShowModal] = useState(gameOver);

  function getWord() {
    const list = difficultyLevel === "easy" ? easyWordList : hardWordList;
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
  }

  function handleClose() {
    return setShowModal(false);
  }

  return (
    <>
      <Board
        answer={answer}
        handleGameOver={handleGameOver}
        guesses={guesses}
        setGuesses={setGuesses}
        gameOver={gameOver}
      />
      {showModal && (
        <Alert
          handleClose={handleClose}
          handlePlayAgain={handlePlayAgain}
          winGame={winGame}
          answer={answer}
        />
      )}
    </>
  );
}

function Alert({
  handleClose,
  handlePlayAgain,
  winGame,
  answer,
}: {
  handleClose: () => void;
  handlePlayAgain: () => void;
  winGame: boolean;
  answer: string;
}) {
  return (
    <div>
      <Dialog open onClose={handleClose}>
        <DialogContent>
          {winGame
            ? `You won! You guessed the word: ${answer}`
            : `You lost! The word was: ${answer}`}
        </DialogContent>
        <span className="actions">
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handlePlayAgain}>Play Again</Button>
        </span>
      </Dialog>
    </div>
  );
}

export default Game;
