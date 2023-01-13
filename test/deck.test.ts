import { expect, test } from "vitest";
import { Rank, Suit, standardDeck } from "../src/deck";
import { shuffle } from "../src/shuffle";

test("Rank order", () => {
  expect(Rank.King).toBeGreaterThan(Rank.Jack);
  expect(Rank.Two).toBeLessThan(Rank.Three);
  expect(Rank.Two).toEqual(Rank.Two);
});

test("Standard deck", () => {
  const deck = standardDeck();

  expect(deck.length).toEqual(54);
  expect(deck.filter((card) => card.rank == Rank.Joker).length).toEqual(2);
  expect(deck.filter((card) => card.rank == Rank.Ace).length).toEqual(4);
  expect(deck.filter((card) => card.suit == Suit.Heart).length).toEqual(13);
  expect(deck.filter((card) => card.suit == Suit.Heart).length).toEqual(13);
  expect(deck.filter((card) => card.suit == Suit.Heart).length).toEqual(13);
  expect(deck.filter((card) => card.suit == Suit.Heart).length).toEqual(13);

  const shuffled = shuffle(deck);

  expect(shuffled.length).toEqual(54);
  expect(shuffled.filter((card) => card.rank == Rank.Joker).length).toEqual(
    2
  );
  expect(shuffled.filter((card) => card.rank == Rank.Ace).length).toEqual(
    4
  );
  expect(shuffled.filter((card) => card.suit == Suit.Heart).length).toEqual(
    13
  );
  expect(shuffled.filter((card) => card.suit == Suit.Heart).length).toEqual(
    13
  );
  expect(shuffled.filter((card) => card.suit == Suit.Heart).length).toEqual(
    13
  );
  expect(shuffled.filter((card) => card.suit == Suit.Heart).length).toEqual(
    13
  );
});
