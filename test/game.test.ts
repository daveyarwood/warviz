import { expect, test } from "vitest";
import { Rank, Suit, Card, standardDeck } from "../src/deck";
import { GameStatus, initialGame, iterateGame } from "../src/game";
import { shuffle } from "../src/shuffle";

test("Initial game", () => {
  const newGame = initialGame();

  expect(newGame.status).toEqual(GameStatus.StillPlaying);

  expect(newGame.player1.cardsInHand.length).toEqual(27);
  expect(newGame.player1.cardsInPlay.length).toEqual(0);
  expect(newGame.player2.cardsInHand.length).toEqual(27);
  expect(newGame.player2.cardsInPlay.length).toEqual(0);
});

function randomCards(amount: number): Card[] {
  return shuffle(standardDeck()).slice(0, amount);
}

test("Win/lose checking", () => {
  const game1a = iterateGame({
    status: GameStatus.StillPlaying,
    player1: {
      name: "p1",
      cardsInHand: [
        { rank: Rank.King, suit: Suit.Heart },
        { rank: Rank.Queen, suit: Suit.Heart },
      ],
      cardsInPlay: [{ rank: Rank.Ten, suit: Suit.Heart }],
    },
    player2: {
      name: "p2",
      cardsInHand: [],
      cardsInPlay: [{ rank: Rank.Nine, suit: Suit.Heart }],
    },
  });

  const gameAfterIteration1a = iterateGame(game1a);
  expect(gameAfterIteration1a.status).toEqual(GameStatus.Player1Won);
  expect(gameAfterIteration1a.player1.cardsInHand.length).toEqual(4);
  expect(gameAfterIteration1a.player2.cardsInHand.length).toEqual(0);

  const game1b = iterateGame({
    status: GameStatus.StillPlaying,
    player1: {
      name: "p1",
      cardsInHand: [],
      cardsInPlay: [{ rank: Rank.Nine, suit: Suit.Heart }],
    },
    player2: {
      name: "p2",
      cardsInHand: [
        { rank: Rank.King, suit: Suit.Heart },
        { rank: Rank.Queen, suit: Suit.Heart },
      ],
      cardsInPlay: [{ rank: Rank.Ten, suit: Suit.Heart }],
    },
  });

  const gameAfterIteration1b = iterateGame(game1b);
  expect(gameAfterIteration1b.status).toEqual(GameStatus.Player2Won);
  expect(gameAfterIteration1b.player2.cardsInHand.length).toEqual(4);
  expect(gameAfterIteration1b.player1.cardsInHand.length).toEqual(0);

  //////////////////////////////////////////////////////////////////////////////

  const game3 = iterateGame({
    status: GameStatus.StillPlaying,
    player1: { name: "p1", cardsInHand: randomCards(27), cardsInPlay: [] },
    player2: { name: "p2", cardsInHand: randomCards(27), cardsInPlay: [] },
  });

  expect(game3.status).toEqual(GameStatus.StillPlaying);
});

test("First iteration", () => {
  const newGame = initialGame();
  const gameAfterIteration = iterateGame(newGame);

  expect(newGame.status).toEqual(GameStatus.StillPlaying);

  expect(gameAfterIteration.player1.cardsInHand.length).toEqual(26);
  expect(gameAfterIteration.player1.cardsInPlay.length).toEqual(1);
  expect(gameAfterIteration.player2.cardsInHand.length).toEqual(26);
  expect(gameAfterIteration.player2.cardsInPlay.length).toEqual(1);
});

test("War with no cards left", () => {
  const game = iterateGame({
    status: GameStatus.StillPlaying,
    player1: {
      name: "p1",
      cardsInHand: randomCards(52),
      cardsInPlay: [{ rank: Rank.Four, suit: Suit.Club }],
    },
    player2: {
      name: "p2",
      cardsInHand: [],
      cardsInPlay: [{ rank: Rank.Four, suit: Suit.Spade }],
    },
  });

  expect(game.status).toEqual(GameStatus.Player1Won);
});

test("War with one card left, and it's a really good card", () => {
  const game = iterateGame({
    status: GameStatus.StillPlaying,
    player1: {
      name: "p1",
      cardsInHand: randomCards(52),
      cardsInPlay: [{ rank: Rank.Four, suit: Suit.Club }],
    },
    player2: {
      name: "p2",
      cardsInHand: [{ rank: Rank.Joker, suit: Suit.Joker }],
      cardsInPlay: [{ rank: Rank.Four, suit: Suit.Spade }],
    },
  });

  expect(game.status).toEqual(GameStatus.StillPlaying);
  expect(iterateGame(game).status).toEqual(GameStatus.StillPlaying);
});
