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
