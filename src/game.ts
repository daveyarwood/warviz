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

export function gameStatusString(status: GameStatus): string {
  switch (status) {
    case GameStatus.StillPlaying:
      return "still playing";
    case GameStatus.Player1Won:
      return "player 1 won";
    case GameStatus.Player2Won:
      return "player 2 won";
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

  return {
    status: GameStatus.StillPlaying,
    player1: initialPlayer("Dave", deck.slice(0, 27)),
    player2: initialPlayer("Mah", deck.slice(27, 54)),
  };
}

export function iterateGame(game: Game): Game {
  if (game.status != GameStatus.StillPlaying) {
    return game;
  }

  if (game.player1.cardsInHand.length == 0) {
    game.status = GameStatus.Player2Won;
    return game;
  }

  if (game.player2.cardsInHand.length == 0) {
    game.status = GameStatus.Player1Won;
    return game;
  }

  if (game.player1.cardsInPlay.length == 0) {
    const card1: Card = game.player1.cardsInHand.shift()!;
    game.player1.cardsInPlay.push(card1);

    const card2: Card = game.player2.cardsInHand.shift()!;
    game.player2.cardsInPlay.push(card2);

    return game;
  }

  // TODO:
  // * if one player is out of cards, then the other player wins
  // * get a card from player1 deck and player2 deck
  // * compare them. winner gets both cards at the end of their deck
  // * figure out how to handle war

  return game;
}
