import { BackspaceRounded } from "@mui/icons-material";
import "../Styles/Keyboard.css";
import clsx from "clsx";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

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
    if (!guessedLetters.has(key)) return "";

    if (answer.includes(key)) {
      const correctIndex = answer.indexOf(key);
      for (const guess of guesses) {
        if (guess && guess[correctIndex] === key) {
          return "keyboardCorrect";
        }
      }
      return "keyboardFound";
    }
    return "keyboardIncorrect";
  }

  function renderKeyboardButton(key: string) {
    return (
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
    );
  }

  return (
    <div className="keyboardSection">
      {rows.map((row, index) => (
        <div className="keyboardRow" key={index}>
          {row.map(renderKeyboardButton)}
        </div>
      ))}
    </div>
  );
}

function getSpecialKeyClass(key: string) {
  return ["Enter", "Backspace"].includes(key) ? "specialKey" : "";
}

export default Keyboard;
