import { BackspaceRounded } from "@mui/icons-material";
import "../Styles/Keyboard.css";
import clsx from "clsx";

interface KeyboardProps {
  handleKeyDown: (key: string) => void;
  guessedLetters: ReadonlySet<string>;
  guesses: readonly string[];
  answer: string;
}
function Keyboard({
  handleKeyDown,
  guessedLetters,
  guesses,
  answer,
}: KeyboardProps) {
  function getKeyboardClassname(input: string) {
    const key = input.toUpperCase();
    if (guessedLetters.has(key)) {
      if (answer.includes(key)) {
        const correctIndex = answer.indexOf(key);
        for (const guess of guesses) {
          if (!guess) continue;
          for (let i = 0; i < guess.length; i++) {
            if (guess[i] === key && i === correctIndex) {
              return "keyboardCorrect";
            }
          }
        }
        return "keyboardFound";
      }
      return "keyboardIncorrect";
    }
    return "";
  }

  function getSpecialKeyClass(key: string) {
    if (key === "Enter" || key === "Backspace") {
      return "specialKey";
    }
    return "";
  }

  return (
    <div className="keyboardSection">
      <div className="keyboardRow">
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
          <button
            className={clsx("keyboardButton", getKeyboardClassname(key))}
            onClick={() => handleKeyDown(key)}
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keyboardRow">
        <div className="keyboardRow secondRow">
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
            <button
              className={clsx("keyboardButton", getKeyboardClassname(key))}
              onClick={() => handleKeyDown(key)}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="keyboardRow">
        {["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"].map(
          (key) => (
            <button
              className={clsx(
                "keyboardButton",
                getKeyboardClassname(key),
                getSpecialKeyClass(key)
              )}
              onClick={() => handleKeyDown(key)}
              key={key}
            >
              {key === "Backspace" ? <BackspaceRounded /> : key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Keyboard;
