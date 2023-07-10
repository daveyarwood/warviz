export enum Suit {
  Heart,
  Diamond,
  Club,
  Spade,
  Joker,
}

export enum Rank {
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
  Joker,
}

export interface Card {
  rank: Rank;
  suit: Suit;
}

const suitUnicodeValue = new Map([
  [Suit.Spade, 127137],
  [Suit.Heart, 127153],
  [Suit.Diamond, 127169],
  [Suit.Club, 127185],
  [Suit.Joker, 127183],
]);

const rankUnicodeValue = new Map([
  [Rank.Joker, 0],
  [Rank.Ace, 0],
  [Rank.Two, 1],
  [Rank.Three, 2],
  [Rank.Four, 3],
  [Rank.Five, 4],
  [Rank.Six, 5],
  [Rank.Seven, 6],
  [Rank.Eight, 7],
  [Rank.Nine, 8],
  [Rank.Ten, 9],
  [Rank.Jack, 10],
  // Queen is 12 because it turns out that there is a Cavalier/Knight rank in
  // some countries! The value would be between Jack and Queen, i.e. 11.
  [Rank.Queen, 12],
  [Rank.King, 13],
]);

export function cardToText(card: Card): string {
  const suitValue = suitUnicodeValue.get(card.suit);
  if (suitValue == undefined) throw new Error(`Unexpected suit: ${card.suit}`);

  const rankValue = rankUnicodeValue.get(card.rank);
  if (rankValue == undefined) throw new Error(`Unexpected rank: ${card.rank}`);

  return String.fromCodePoint(suitValue + rankValue);
}

export type Deck = Card[];

export function standardDeck(): Deck {
  let deck: Card[] = [];

  const joker = { rank: Rank.Joker, suit: Suit.Joker };

  const ranks = Object.keys(Rank);
  const suits = Object.keys(Suit);

  deck.push(joker, joker);

  for (let rank = 0; rank < ranks.length / 2; rank++) {
    if (rank == Rank.Joker) continue;

    for (let suit = 0; suit < suits.length / 2; suit++) {
      if (suit == Suit.Joker) continue;

      deck.push({ rank: rank, suit: suit });
    }
  }

  return deck;
}
