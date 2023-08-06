import { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";

import Game from "./Game";
import "../Styles/App.css";

function App() {
  const [level, setLevel] = useState<string>("");
  return (
    <>
      <h1>Wordle</h1>
      {level && <Game level={level} setLevel={setLevel} />}
      <div>
        {!level && (
          <Dialog open>
            <h2 className="modalHeader">Wordle</h2>

            <DialogContent className="modalBody">
              <h4>How To Play:</h4>
              <ol
                style={{
                  listStyleType: "number",
                  fontFamily: "Franklin Gothic",
                }}
              >
                <li>
                  Use your keyboard to guess a five letter word in six tries
                </li>
                <li>Hit Enter to submit your guess</li>
                <li>The color of the tiles will change color to guide you</li>
                <li>Select a level below</li>
              </ol>
            </DialogContent>
            <span className="buttons">
              <Button className="easy" onClick={() => setLevel("easy")}>
                Easy
              </Button>
              <Button className="hard" onClick={() => setLevel("hard")}>
                Hard
              </Button>
            </span>
          </Dialog>
        )}
      </div>
    </>
  );
}

export default App;
