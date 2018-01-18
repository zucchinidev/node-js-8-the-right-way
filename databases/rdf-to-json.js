#!/usr/bin/env node
const fs = require('fs')
const minimist = require('minimist')
const parseRDF = require('./')
const args = minimist(process.argv)
const rdf = fs.readFileSync(args.filename)
const book = parseRDF(rdf)
console.log(JSON.stringify(book, null, '    '))
