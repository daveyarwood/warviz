import { useState } from "react";
import "./App.css";
import { Card, Rank, Suit, standardDeck } from "./deck";
import { shuffle } from "./shuffle";

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

function cardToText(card: Card): string {
  if (card.rank == Rank.Joker) return "Joker";

  return ((rankText.get(card.rank) as string) +
    suitCharacter.get(card.suit)) as string;
}

function War() {
  const [deck, setDeck] = useState(shuffle(standardDeck()));
  const [card, setCard] = useState(null);

  function drawCard() {
    const card = deck.shift();
    setDeck(deck);
    setCard(card);
  }

  function resetDeck() {
    setDeck(shuffle(standardDeck()));
    setCard(null);
  }

  if (deck.length == 0) {
    return (
      <div className="card">
        <p>deck empty</p>

        <button onClick={resetDeck}>Reset deck</button>
      </div>
    );
  }
  return (
    <div className="card">
      <button onClick={drawCard}>Click to draw a card</button>
      <p>Card: {card ? cardToText(card) : "(none)"}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>War</h1>
      <War />
    </div>
  );
}

export default App;
