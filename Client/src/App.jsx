import { useState } from "react";
import "./App.css";
import Game from "./Game";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const inputPlayerName = async () => {
    const result = await Swal.fire({
      title: "Enter your Name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    return result;
  };

  socket?.on("connect", () => {
    setPlayOnline(true);
  });

  socket?.on("OpponentNotFound", () => {
    setOpponentName(false);
  });

  socket?.on("OpponentFound", (data) => {
    setPlayingAs(data.playingAs);
    setOpponentName(data.opponentName);
  });

  

  const handlePlayOnline = async () => {
    const result = await inputPlayerName();

    if (!result.isConfirmed) {
      return;
    }

    const username = result.value;
    setPlayerName(username);

    const newSocket = io(URL, {
      autoConnect: true,
    });

    newSocket?.emit("request_to_play", {
      playerName: username,
    });
    setSocket(newSocket);
  };

  if (!playOnline) {
    return (
      <main>
        <div className="play-online">
          <button onClick={handlePlayOnline} className="play-btn">
            Play Online
          </button>
        </div>
      </main>
    );
  }

  if (playOnline && !opponentName) {
    return (
      <main>
        <div className="waiting">
          <p>Waiting for Opponent ...</p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <h1 className="main__heading">Tic Tac Toe</h1>
      <Game
        socket={socket}
        opponentName={opponentName}
        playerName={playerName}
        playingAs={playingAs}
      />
    </main>
  );
};

export default App;
