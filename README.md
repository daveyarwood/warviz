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

* Allow inputting player names / enforce a limit
* Generative music
* Nicer display of players' cards - bigger font, table
* Draw attention to the higher card somehow
  * e.g. make the higher card green and the lower card red
