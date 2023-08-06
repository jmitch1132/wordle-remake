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
              return "correct";
            }
          }
        }
        return "found";
      }
      return "incorrect";
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
      <div className="keyboardRow">
        {["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"].map(
          (key) => (
            <button
              className={clsx("keyboardButton", getKeyboardClassname(key))}
              onClick={() => handleKeyDown(key)}
              key={key}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Keyboard;
