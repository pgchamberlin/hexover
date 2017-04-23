# Hexover

## An API for searching for similar colours.

Hexover uses the colors from [Colorly](https://github.com/jpederson/Colorly) and the search library [kd-tree-javascript](https://github.com/ubilabs/kd-tree-javascript) to provide an API for matching a hex colour code to similar commercially available swatches, such as Pantone colours.

## Usage

To run Hexover as-is:

```
npm install
node index.js
```

Hexover will run on port `3003` by default, but you can specify one when you run it.

For example:

```
PORT=3210 index.js
```
## Output

Hexover will output the 3 nearest colour values in its index to the hex code argument. If you want to change the default, it is the second parameter to `tree.nearest` in `index.js` and you can change it there. If Hexover finds fewer near matches than this value requests then it may return a shortened or empty result.

## More extensive usage

By default Hexover only searches against the Pantone colours from `/src/pantone_data`. There's a lot more data from other colour books in Colorly's dataset. That's all in `/src/data`, and you can index it by manipulating and running `./build_index.js`.
