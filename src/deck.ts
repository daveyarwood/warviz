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

const rankText = new Map([
  [Rank.Two, "2"],
  [Rank.Three, "3"],
  [Rank.Four, "4"],
  [Rank.Five, "5"],
  [Rank.Six, "6"],
  [Rank.Seven, "7"],
  [Rank.Eight, "8"],
  [Rank.Nine, "9"],
  [Rank.Ten, "10"],
  [Rank.Jack, "J"],
  [Rank.Queen, "Q"],
  [Rank.King, "K"],
  [Rank.Ace, "A"],
]);

const suitCharacter = new Map([
  [Suit.Heart, "♥"],
  [Suit.Diamond, "♦"],
  [Suit.Club, "♣"],
  [Suit.Spade, "♠"],
]);

export function cardToText(card: Card): string {
  if (card.rank == Rank.Joker) return "Joker";

  return ((rankText.get(card.rank) as string) +
    suitCharacter.get(card.suit)) as string;
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
