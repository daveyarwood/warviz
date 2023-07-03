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

* Have the game play itself (auto-advance)
* Visualize cards (using playing card emoji?)
* Speed slider
* Pause/play buttons
* Save game state
* Generative music
