'use strict'

const fs = require('fs')
const parseRDF = require('./lib/parse-rdf')
const filename = process.argv[2]
fs.readFile(filename, (err, data) => {
  if (err) {
    throw err
  }
  const book = parseRDF(data)
  console.log(JSON.stringify(book, null, '  '))
})
