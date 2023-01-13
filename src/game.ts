import { standardDeck, Card } from "./deck";
import { shuffle } from "./shuffle";

export interface Game {
  player1: Card[];
  player2: Card[];
}

export function initialGame(): Game {
  const deck = shuffle(standardDeck());

  return {
    player1: deck.slice(0, 27),
    player2: deck.slice(27, 54),
  };
}

export function iterateGame(game: Game): Game {
  // TODO:
  // * if one player is out of cards, then the other player wins
  // * get a card from player1 deck and player2 deck
  // * compare them. winner gets both cards at the end of their deck
  // * figure out how to handle war

  return game;
}
