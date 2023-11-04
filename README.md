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
* Draw attention to the higher card somehow
  * e.g. make the higher card green and the lower card red
* Generative music
* GitHub Pages / Netlify automatic build
* Share button - use TinyURL (or similar) to generate a short URL and provide a
  way for the user to copy it
