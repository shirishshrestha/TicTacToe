import { useEffect, useState } from "react";
import Square from "./Components/Square";

const renderForm = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const Game = () => {
  const [gameState, setGameState] = useState(renderForm);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedStateArray, setFinishedStateArray] = useState([]);

  const checkWinner = () => {
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedStateArray([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedStateArray([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    for (let pos = 0; pos < gameState.length; pos++) {
      if (
        gameState[0][0] === gameState[1][1] &&
        gameState[1][1] === gameState[2][2]
      ) {
        setFinishedStateArray([0, 4, 8]);
        return gameState[0][0];
      }
    }

    for (let pos = 0; pos < gameState.length; pos++) {
      if (
        gameState[0][2] === gameState[1][1] &&
        gameState[1][1] === gameState[2][0]
      ) {
        setFinishedStateArray([2, 4, 6]);
        return gameState[2][0];
      }
    }

    const isDraw = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDraw === true) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="game__container">
        <div className="player__turn">
          <div className="player__turn--left">
            <p>Player 1</p>
          </div>
          <div className="player__turn--right">Opponent</div>
        </div>
        <div className="square__container">
          {renderForm.map((arr, rowIndex) =>
            arr.map((elem, colIndex) => {
              return (
                <div className="square-div" key={colIndex}>
                  <Square
                    finishedStateArray={finishedStateArray}
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    finishedState={finishedState}
                    setGameState={setGameState}
                    id={rowIndex * 3 + colIndex}
                  />
                </div>
              );
            })
          )}
        </div>
        {finishedState && finishedState !== "draw" && (
          <h3 className="winning-message">{finishedState} won the game</h3>
        )}
        {finishedState && finishedState === "draw" && (
          <h3 className="winning-message">It's a Draw</h3>
        )}

        {finishedState ? (
          <div className="play-again">
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Game;
