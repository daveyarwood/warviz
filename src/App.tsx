import { useState } from "react";
import "./App.css";
import { cardToText } from "./deck";
import {
  gameStatusString,
  initialGame,
  iterateGame,
  GameStatus,
  Player,
  roundOutcome,
  roundOutcomeString,
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
  const cardsInPlay = props.player.cardsInPlay;
  const cardsInHand = props.player.cardsInHand;

  return (
    <div>
      <strong>{props.player.name}</strong> ({cardsInHand.length}):
      {JSON.stringify(cardsInPlay.map(cardToText))}
    </div>
  );
}

function War() {
  const [game, setGame] = useState(initialGame());

  const outcome = roundOutcome(game);

  return (
    <div>
      <GameDisplay status={game.status} />
      <PlayerDisplay player={game.player1} />
      <PlayerDisplay player={game.player2} />
      <br />
      {outcome != null ? `Round outcome: ${roundOutcomeString(outcome)}` : ""}
      <br />
      <button onClick={() => setGame(iterateGame(game))}>Advance game</button>
      <button onClick={() => setGame(initialGame())}>Reset game</button>
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
