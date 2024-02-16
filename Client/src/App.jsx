import "./App.css";
import Game from "./Game";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

export const socket = io(URL);

const App = () => {
  return (
    <main>
      <h1 className="main__heading">Tic Tac Toe</h1>
      <Game />
    </main>
  );
};

export default App;
