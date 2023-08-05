import { useState, useEffect } from "react";
import { wordList } from "./WordList";
import Board from "./Board";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function App() {
  const [answer, setAnswer] = useState(() => getWord());
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(gameOver);

  function handleGameOver() {
    setGameOver(!gameOver);
    setShowModal(true);
  }

  function getWord() {
    const index = Math.floor(Math.random() * wordList.length);
    const answer = wordList[index];
    return answer.toUpperCase();
  }
  console.log(answer);
  function handlePlayAgain() {
    const newWord = getWord();
    setAnswer(newWord);
    setGuesses(Array(6).fill(null));
    setGameOver(false);
  }

  function handleClose() {
    return setShowModal(false);
  }

  return (
    <>
      <Board
        answer={answer}
        setGameOver={handleGameOver}
        guesses={guesses}
        setGuesses={setGuesses}
        gameOver={gameOver}
      />
      <div>
        {showModal && (
          <Alert handleClose={handleClose} handlePlayAgain={handlePlayAgain} />
        )}
      </div>
    </>
  );
}

function Alert({
  handleClose,
  handlePlayAgain,
}: {
  handleClose: () => void;
  handlePlayAgain: () => void;
}) {
  return (
    <div>
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Play Wordle"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to play again?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handlePlayAgain}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
