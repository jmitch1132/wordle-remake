import { useState } from "react";
import { easyWordList, hardWordList } from "../WordsList";
import Board from "./Board";
import "../Styles/Game.css";
import CloseRounded from "@mui/icons-material/CloseRounded";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

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
  const [showModal, setShowModal] = useState(gameOver);
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
  }

  function handleClose() {
    return setShowModal(false);
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
          handleClose={handleClose}
          handlePlayAgain={handlePlayAgain}
          handleChangeLevel={handleChangeLevel}
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
  handleChangeLevel,
  winGame,
  answer,
}: {
  handleClose: () => void;
  handlePlayAgain: () => void;
  handleChangeLevel: () => void;
  winGame: boolean;
  answer: string;
}) {
  return (
    <div>
      <Dialog open>
        <DialogTitle>
          Results
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="results">
              {winGame
                ? `You won! You guessed the word: ${answer}`
                : `You lost! The word was: ${answer}`}
            </div>
          </DialogContentText>
        </DialogContent>
        <div className="actions">
          <Button onClick={handlePlayAgain}>Play Again</Button>
          <Button onClick={handleChangeLevel}>Change Level</Button>
        </div>
      </Dialog>
    </div>
  );
}

export default Game;
