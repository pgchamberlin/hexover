# Hexover

## An API for searching for similar colours.

Hexover uses the colors from [Colorly](https://github.com/jpederson/Colorly) and the search library [kd-tree-javascript](https://github.com/ubilabs/kd-tree-javascript) to provide an API for matching a hex colour code to similar commercially available swatches, such as Pantone colours.

## Usage

To run Hexover:

```
npm install
node index.js
```

Hexover will run on port `3003` by default, but you can specify one when you run it.

For example:

```
PORT=3210 index.js
```
