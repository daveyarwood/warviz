import { standardDeck, Card } from "./deck";
import { shuffle } from "./shuffle";

export interface Player {
  name: string;
  cardsInHand: Card[];
  cardsInPlay: Card[];
}

export enum GameStatus {
  StillPlaying,
  Player1Won,
  Player2Won,
}

export function gameStatusString(game: Game): string {
  switch (game.status) {
    case GameStatus.StillPlaying:
      return "still playing";
    case GameStatus.Player1Won:
      return `${game.player1.name} won!`;
    case GameStatus.Player2Won:
      return `${game.player2.name} won!`;
  }
}

export interface Game {
  player1: Player;
  player2: Player;
  status: GameStatus;
}

function initialPlayer(name: string, initialHand: Card[]): Player {
  return {
    name: name,
    cardsInHand: initialHand,
    cardsInPlay: [],
  };
}

export function initialGame(): Game {
  const deck = shuffle(standardDeck());

  const queryParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();

  return {
    status: GameStatus.StillPlaying,
    player1: initialPlayer(
      queryParams.get("player1") || "Player 1",
      deck.slice(0, 27)
    ),
    player2: initialPlayer(
      queryParams.get("player2") || "Player 2",
      deck.slice(27, 54)
    ),
  };
}

export enum RoundOutcome {
  Player1Won,
  Player2Won,
  War,
}

export function roundOutcome(game: Game): RoundOutcome {
  const cards1 = game.player1.cardsInPlay;
  const cards2 = game.player2.cardsInPlay;

  const card1 = cards1[cards1.length - 1];
  const card2 = cards2[cards2.length - 1];

  if (card1.rank == card2.rank) {
    return RoundOutcome.War;
  }

  if (card1.rank > card2.rank) {
    return RoundOutcome.Player1Won;
  }

  return RoundOutcome.Player2Won;
}

export function roundOutcomeString(game: Game): string {
  switch (roundOutcome(game)) {
    case RoundOutcome.War:
      return "⚔️WAR!⚔️";
    case RoundOutcome.Player1Won:
      return `${game.player1.name} wins the round!`;
    case RoundOutcome.Player2Won:
      return `${game.player2.name} wins the round!`;
  }
}

function drawCard(player: Player): Player {
  const card: Card | undefined = player.cardsInHand.shift();
  if (card) {
    player.cardsInPlay.push(card);
  }
  return player;
}

function transferCardsToPlayer1(game: Game): Game {
  game.player1.cardsInHand = [
    ...game.player1.cardsInHand,
    ...game.player1.cardsInPlay,
    ...game.player2.cardsInPlay,
  ];

  game.player1.cardsInPlay = [];
  game.player2.cardsInPlay = [];

  return { ...game };
}

function transferCardsToPlayer2(game: Game): Game {
  game.player2.cardsInHand = [
    ...game.player2.cardsInHand,
    ...game.player2.cardsInPlay,
    ...game.player1.cardsInPlay,
  ];

  game.player1.cardsInPlay = [];
  game.player2.cardsInPlay = [];

  return { ...game };
}

function anyCardsInPlay(game: Game): boolean {
  return (
    game.player1.cardsInPlay.length > 0 || game.player2.cardsInPlay.length > 0
  );
}

function bothPlayersHaveCards(game: Game): boolean {
  return (
    game.player1.cardsInHand.length > 0 && game.player2.cardsInHand.length > 0
  );
}

function bothPlayersHaveCardsInPlay(game: Game): boolean {
  return (
    game.player1.cardsInPlay.length > 0 && game.player2.cardsInPlay.length > 0
  );
}

export function iterateGame(game: Game): Game {
  if (game.status != GameStatus.StillPlaying) {
    return game;
  }

  if (!anyCardsInPlay(game) && bothPlayersHaveCards(game)) {
    game.player1 = drawCard(game.player1);
    game.player2 = drawCard(game.player2);
    return { ...game };
  }

  if (bothPlayersHaveCardsInPlay(game)) {
    const outcome = roundOutcome(game);
    switch (outcome) {
      case RoundOutcome.War:
        // Recognize the special case where one of the players is out of cards. In
        // that scenario, the player gives their cards to the other player and
        // they will lose at the beginning of the next iteration.
        if (game.player1.cardsInHand.length == 0) {
          game = transferCardsToPlayer2(game);
        } else if (game.player2.cardsInHand.length == 0) {
          game = transferCardsToPlayer1(game);
        } else {
          game.player1 = drawCard(drawCard(drawCard(game.player1)));
          game.player2 = drawCard(drawCard(drawCard(game.player2)));
        }
        break;

      case RoundOutcome.Player1Won:
        game = transferCardsToPlayer1(game);
        break;

      case RoundOutcome.Player2Won:
        game = transferCardsToPlayer2(game);
        break;

      default:
        // This should only happen if `roundOutcome` produced null, which should
        // never happen.
        throw new Error(`Unexpected round outcome: ${outcome}`);
    }
  }

  if (
    game.player1.cardsInHand.length == 0 &&
    game.player1.cardsInPlay.length == 0
  ) {
    game.status = GameStatus.Player2Won;
    return { ...game };
  }

  if (
    game.player2.cardsInHand.length == 0 &&
    game.player2.cardsInPlay.length == 0
  ) {
    game.status = GameStatus.Player1Won;
    return { ...game };
  }

  return { ...game };
}
