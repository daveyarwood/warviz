import { useEffect, useState } from "react";
import "./App.css";
import { cardToText, Suit } from "./deck";
import { Game } from "./game";
import { Card } from "./deck";
import {
  gameStatusString,
  initialGame,
  iterateGame,
  GameStatus,
  Player,
  roundOutcome,
  roundOutcomeString,
} from "./game";
import confetti from "canvas-confetti";

interface GameDisplayProps {
  game: Game;
}

interface PlayerDisplayProps {
  player: Player;
  playerWon: Boolean;
}

function GameDisplay(props: GameDisplayProps) {
  return (
    <div>
      <strong>Game status:</strong> {gameStatusString(props.game)}
    </div>
  );
}

function cardToSpan(card: Card) {
  const cardColor =
    card.suit == Suit.Heart || card.suit == Suit.Diamond ? "red" : "black";

  const cardText = cardToText(card);

  return (
    <span style={{ color: cardColor }} key={cardText}>
      {cardText}
    </span>
  );
}

function PlayerDisplay(props: PlayerDisplayProps) {
  const cardsInPlay = props.player.cardsInPlay;
  const cardsInHand = props.player.cardsInHand;

  return (
    <div>
      <strong>{props.player.name}</strong> ({cardsInHand.length}):
      {props.playerWon ? (
        " 😎🏆"
      ) : cardsInPlay.length == 0 ? (
        ""
      ) : (
        <span> 🫴{cardsInPlay.map(cardToSpan)}</span>
      )}
    </div>
  );
}

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
  const [playSpeedMs, setPlaySpeedMs] = useState(100);

  function cancelTimer(timer: Timer) {
    clearInterval(timer);
    setTimer(null);
  }

  const outcomeString = anyCardsInPlay(game) ? roundOutcomeString(game) : null;

  useEffect(() => {
    if (!autoadvance && timer) {
      cancelTimer(timer);
    } else if (autoadvance && !timer) {
      setTimer(setInterval(() => setGame(iterateGame(game)), playSpeedMs));
    }
  }, [autoadvance, game, playSpeedMs]);

  useEffect(() => {
    if (
      game.status === GameStatus.Player1Won ||
      game.status === GameStatus.Player2Won
    ) {
      confetti();
    }
  }, [game]);

  return (
    <div>
      <GameDisplay game={game} />
      <PlayerDisplay
        player={game.player1}
        playerWon={game.status == GameStatus.Player1Won}
      />
      <PlayerDisplay
        player={game.player2}
        playerWon={game.status == GameStatus.Player2Won}
      />
      <br />
      {outcomeString || ""}
      <br />
      <br />
      {autoadvance ? (
        <button onClick={() => setAutoadvance(false)} title="Pause">
          ⏸
        </button>
      ) : (
        <button onClick={() => setAutoadvance(true)} title="Play">
          ⏵
        </button>
      )}
      <button
        onClick={() => {
          if (timer) cancelTimer(timer);
          setGame(initialGame());
        }}
        title="Reset game"
      >
        ⟳
      </button>
      <br />
      <br />
      <button onClick={() => setGame(iterateGame(game))}>Manual Play</button>
      <br />
      <p>
        Advance every <strong>{playSpeedMs} ms</strong>
      </p>
      <br />
      <div>
        <input
          type="range"
          id="speed"
          name="speed"
          disabled={!autoadvance}
          min="50"
          max="1000"
          step="50"
          onChange={(event) => {
            const newSpeed = parseInt(event.target.value);
            setPlaySpeedMs(newSpeed);
            // A new timer will be created on the next render.
            cancelTimer(timer!!);
          }}
        />
      </div>
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
