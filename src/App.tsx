import { useEffect, useState } from "react";
import "./App.css";
import { cardToText } from "./deck";
import { Game } from "./game";
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

// TODO: Make this a slider
const AUTOADVANCE_MS = 100;

type Timer = ReturnType<typeof setInterval>;

function anyCardsInPlay(game: Game): boolean {
  return (
    game.player1.cardsInPlay.length > 0 && game.player2.cardsInPlay.length > 0
  );
}

function War() {
  const [game, setGame] = useState(initialGame());
  const [timer, setTimer] = useState<Timer | null>(null);
  const [autoadvance, setAutoadvance] = useState(true);

  const outcome = anyCardsInPlay(game) ? roundOutcome(game) : null;

  useEffect(() => {
    if (!autoadvance && timer) {
      clearInterval(timer);
      setTimer(null);
    } else if (autoadvance && !timer) {
      setTimer(setInterval(() => setGame(iterateGame(game)), AUTOADVANCE_MS));
    }
  }, [autoadvance]);

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
      <br />
      <label>
        <input
          type="checkbox"
          checked={autoadvance}
          onChange={() => setAutoadvance(!autoadvance)}
        />
        Play automatically
      </label>
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
