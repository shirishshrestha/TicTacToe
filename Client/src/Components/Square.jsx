import { useState } from "react";
import "./Square.css";

const circleSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

const crossSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M19 5L5 19M5.00001 5L19 19"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

const Square = ({
  setGameState,
  id,
  currentElement,
  currentPlayer,
  finishedStateArray,
  setCurrentPlayer,
  finishedState,
  playingAs,
  socket,
}) => {
  const [icon, setIcon] = useState(null);

  const handleSquareClick = () => {
    if (playingAs !== currentPlayer) {
      return;
    }

    if (finishedState) {
      return;
    }
    if (!icon) {
      if (currentPlayer === "circle") {
        setIcon(circleSvg);
      } else {
        setIcon(crossSvg);
      }

      const currentPlayerNow = currentPlayer;

      socket.emit("playerMoveFromClient", {
        state: {
          id,
          sign: currentPlayerNow,
        },
      });

      setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

      setGameState((prevState) => {
        let newState = [...prevState];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = currentPlayerNow;

        return newState;
      });
    }
  };

  return (
    <>
      <div
        className={`square-box ${
          finishedState || finishedState === "draw"
            ? "square-box__disabled"
            : ""
        }
        ${currentPlayer !== playingAs ? "square-box__disabled" : ""} 
        ${finishedStateArray.includes(id) ? finishedState + "-won" : ""}
       `}
        key={id}
        onClick={handleSquareClick}
      >
        {currentElement === "circle"
          ? circleSvg
          : currentElement === "cross"
          ? crossSvg
          : icon}
      </div>
    </>
  );
};

export default Square;
