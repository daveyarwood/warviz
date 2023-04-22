import { expect, test } from "vitest";
import { Card, standardDeck } from "../src/deck";
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
  // Note: This is slightly unrealistic in that the game wouldn't be in this
  // state without the status already _being_ Player2Won. But it's a good basic
  // check of the win/lose checking logic.
  const game1 = iterateGame({
    status: GameStatus.StillPlaying,
    player1: { name: "p1", cardsInHand: [], cardsInPlay: [] },
    player2: { name: "p2", cardsInHand: randomCards(54), cardsInPlay: [] },
  });

  expect(game1.status).toEqual(GameStatus.Player2Won);
  expect(iterateGame(game1).status).toEqual(GameStatus.Player2Won);

  const game2 = iterateGame({
    status: GameStatus.StillPlaying,
    player1: { name: "p1", cardsInHand: randomCards(54), cardsInPlay: [] },
    player2: { name: "p2", cardsInHand: [], cardsInPlay: [] },
  });

  expect(game2.status).toEqual(GameStatus.Player1Won);
  expect(iterateGame(game2).status).toEqual(GameStatus.Player1Won);

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
