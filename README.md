# warviz

## Development

To serve the app locally and automatically recompile whenever code changes:

```bash
yarn dev
```

To automatically run tests every time code changes:

```bash
find . -type f -name '*.ts' | entr -r bash -c "npx vitest run"
```

## TODO

* Nicer display of players' cards - bigger font, table
* Make red cards red - could put them in a span
* Draw attention to the higher card somehow
  * e.g. make the higher card green and the lower card red
* Save game state
* Generative music
* Confetti explosion when a player wins
* Sunglasses emoji + trophy for the winner
* Use the name of the player instead of "player 1" / "player 2"
