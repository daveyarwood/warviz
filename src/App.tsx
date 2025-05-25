import { useEffect, useState } from "react";
import "./App.css";
import { cardToText, Suit } from "./deck";
import { Game, roundOutcome, RoundOutcome } from "./game";
import { Card } from "./deck";
import {
  gameStatusString,
  initialGame,
  iterateGame,
  GameStatus,
  Player,
  roundOutcomeString,
} from "./game";
import confetti from "canvas-confetti";

interface GameDisplayProps {
  game: Game;
}

interface PlayerDisplayProps {
  player: Player;
  playerWon: Boolean;
  playerWonRound: Boolean;
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
    <span style={{ color: cardColor }} key={crypto.randomUUID()}>
      {cardText}
    </span>
  );
}

function PlayerDisplay(props: PlayerDisplayProps) {
  const cardsInPlay = props.player.cardsInPlay;
  const cardsInHand = props.player.cardsInHand;

  // TODO:
  // * Add .winning-card class to the winning card
  // * Move 😎🏆 to cards in play cell
  return (
    <tr>
      <td className="player-name">
        <strong>{props.player.name}</strong>
      </td>
      <td width="10px">({cardsInHand.length}):</td>
      <td className="cards-in-play">
        {cardsInPlay.length == 0 ? (
          ""
        ) : (
          <span> 🫴{cardsInPlay.map(cardToSpan)}</span>
        )}
      </td>
      <td width="10px">
        {props.playerWon ? (
          " 😎🏆"
        ) : props.playerWonRound ? (
          <span className="player-won-round">✅</span>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

type Timer = ReturnType<typeof setInterval>;

function anyCardsInPlay(game: Game): boolean {
  return (
    game.player1.cardsInPlay.length > 0 && game.player2.cardsInPlay.length > 0
  );
}

// We keep track of this on page load so that we can pause the game if the game
// is being shared as a URL.
var gameLoadedFromHash = false;

// If there is an encoded game status in `location.hash`, decodes it and returns
// the Game object.
//
// Otherwise, returns null.
function loadGameFromHash() {
  if (location.hash.length == 0) {
    return null;
  }

  gameLoadedFromHash = true;

  const gameHash = location.hash.slice(1);
  const decoded = atob(gameHash);
  return JSON.parse(decoded);
}

function War() {
  const [game, setGame] = useState(loadGameFromHash() || initialGame());
  const [timer, setTimer] = useState<Timer | null>(null);
  const [autoadvance, setAutoadvance] = useState(!gameLoadedFromHash);
  const [playSpeedMs, setPlaySpeedMs] = useState(100);

  const gameHash = btoa(JSON.stringify(game));
  location.hash = `#${gameHash}`;

  function cancelTimer(timer: Timer) {
    clearInterval(timer);
    setTimer(null);
  }

  const outcome = anyCardsInPlay(game) ? roundOutcome(game) : null;
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
      <table className="player-displays">
        <tbody>
          <PlayerDisplay
            player={game.player1}
            playerWon={game.status == GameStatus.Player1Won}
            playerWonRound={outcome == RoundOutcome.Player1Won}
          />
          <PlayerDisplay
            player={game.player2}
            playerWon={game.status == GameStatus.Player2Won}
            playerWonRound={outcome == RoundOutcome.Player2Won}
          />
        </tbody>
      </table>
      <br />
      {outcomeString || ""}
      <br />
      <br />
      <div id="control-buttons">
        {autoadvance ? (
          <img
            src="images/pause.png"
            className="control-button"
            alt="Pause button"
            title="Pause game"
            onClick={() => setAutoadvance(false)}
          />
        ) : (
          <img
            src="images/play.png"
            className="control-button"
            alt="Play button"
            title="Play game"
            onClick={() => setAutoadvance(true)}
          />
        )}
        <img
          src="images/reset.png"
          className="control-button"
          alt="Reset button"
          title="Start a new game"
          onClick={() => {
            if (timer) cancelTimer(timer);
            setGame(initialGame());
          }}
        />
      </div>
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
          value={1050 - playSpeedMs}
          onChange={(event) => {
            const sliderValue = parseInt(event.target.value);
            const newSpeed = 1050 - sliderValue;
            setPlaySpeedMs(newSpeed);
            // A new timer will be created on the next render.
            cancelTimer(timer!!);
          }}
        />
      </div>
    </div>
  );
}

function copyURL() {
  navigator.clipboard.writeText(window.location.href);
  alert("Copied URL to clipboard");
}

function ShareButton() {
  return (
    <div id="top-menu">
      <button id="share-button" onClick={copyURL}>
        Share
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>War</h1>
      <War />
      <br />
      <ShareButton />
    </div>
  );
}

export default App;
