const express = require('express')
const app = express()
const colours = require(__dirname + '/dist/data/colours.json')
const kdtree_colours = require(__dirname + '/dist/data/kdtree_colours.json')
const kdt = require(__dirname + '/lib/kdTree.js')
const kdTree = kdt.kdTree

const objToStrMap = (obj) => {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

const map = objToStrMap(colours)

const tree = new kdTree(
    kdtree_colours,
    (a, b) => {
        const dr = a.red - b.red;
        const dg = a.green - b.green;
        const db = a.blue - b.blue;
        const redMean = (a.red + b.red)/2;
        return (2+redMean/256)*dr*dr + 4*dg*dg + (2 + (255 - redMean)/256)*db*db;
    },
    ["r", "g", "b"]
)

const hexToRGB = (hex) => {
    return {
        "r": hex.substr(1,2),
        "g": hex.substr(3,2),
        "b": hex.substr(5,2)
    }
}

const RGBToHex = (rgb) => {
    return '#' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16)
}

const validateHexParam = (hex) => {
    return !!hex.match(/^[0-9a-f]{6}$/)
}

const res400 = (res, msg) => {
    res.statusCode = 400
    res.send(msg)
}

app.get('/', function (req, res) {
    res.send('<h1>Hexover</h1><p>GET /{hex code} to get Pantone colours similar to any hex RGB value.</p><p>For example: <a href="./1155bb">GET /1155bb</a></p>')
})

app.get('/:hex', function (req, res) {
    if (!validateHexParam(req.params['hex'])) {
        return res400(res, '<h1>400 - Bad request</h1><p>The parameter should be a 6 character hexidecimal string, for example <a href="./aa11f5">/aa11f5</a></p>')
    }
    const hex = '#' + req.params['hex']
    const RGBs = tree.nearest(hexToRGB(hex), 3).map(
        (rgb) => {
            return rgb[0]
        }
    )
    const hexes = RGBs.map( RGBToHex )
    const colours = hexes.map(
        (item) => {
            return map.has(item) ? map.get(item)[0] : null
        }
    )
    .filter(
        (item) => {
            return !!item
        }
    )
    res.send(colours)
})

var port = process.env.PORT || 3003;
app.listen(port, function () {
  console.log("Hexover listening on port " + port + "!");
});
