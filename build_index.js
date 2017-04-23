const P = require('es6-promise')
const fs = require('fs')
const readdir = require('fs-readdir-promise')
const writeFile = require('node-fs-writefile-promise')
const readMultipleFiles = require('read-files-promise')

const source = __dirname + '/src/pantone_data'
const destination = __dirname + '/dist/data'

const err = (err) => {
    console.log(err)
}

readdir(source, { encoding: 'utf8' })
.then(
    (files) => {
        return files.map( (file) => {
            return source + '/' + file
        })
    }, err
)
.then(
    readMultipleFiles, err
)
.then(
    (bufs) => {
        return bufs.map( (buf) => {
            return JSON.parse(buf).reduce( (acc, item) => {
                acc.set(item.hex, item)
                return acc
            }, new Map())
        })
    }, err
)
.then(
    (maps) => {
        return maps.reduce( (acc, item) => {
            for (const [key, val] of item) {
                if (key in acc) {
                    if (typeof acc[key] == Array) {
                        acc[key] = acc[key].push(val)
                    }
                } else {
                    acc[key] = [val]
                }
            }
            return acc
        }, Object.create(null))
    }, err
)
.then(
    (obj) => {
        writeFile(
            destination + '/colours.json',
            JSON.stringify(obj)
        )
        return obj
    }, err
)
.then(
    (obj) => {
        // deconstruct obj and then create deltas files
        writeFile(
            destination + '/kdtree_colours.json',
            JSON.stringify(
                Object.keys(obj).map( (item) => {
                    return {
                        r: parseInt(item.substr(1,2), 16),
                        g: parseInt(item.substr(3,2), 16),
                        b: parseInt(item.substr(5,2), 16)
                    }
                })
            )
        )
        return obj
    }, err
)
.then(
    (obj) => {
        console.log('done')
    }, err
)
