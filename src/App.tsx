import { useState } from "react";
import "./App.css";
import { cardToText } from "./deck";
import {
  gameStatusString,
  initialGame,
  iterateGame,
  GameStatus,
  Player,
  Game,
} from "./game";

interface GameDisplayProps {
  status: GameStatus;
}

interface PlayerDisplayProps {
  player: Player;
}

function GameDisplay(props: GameDisplayProps) {
  return (
    <div>
      <strong>Game status:</strong> {gameStatusString(props.status)}
    </div>
  );
}

function PlayerDisplay(props: PlayerDisplayProps) {
  const cards = props.player.cardsInPlay;
  const cardsList = cards.map(cardToText);

  return (
    <div>
      <strong>{props.player.name}</strong>: {JSON.stringify(cardsList)}
    </div>
  );
}

function War() {
  const [game, setGame] = useState(initialGame());

  return (
    <div>
      <GameDisplay status={game.status} />
      <PlayerDisplay player={game.player1} />
      <PlayerDisplay player={game.player2} />
      <button onClick={() => setGame(iterateGame(game))}>Advance game</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>War</h1>
      <War />
    </div>
  );
}

export default App;
