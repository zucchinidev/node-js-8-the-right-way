'use strict'
const fs = require('fs')
const path = require('path')
const parseRDF = require('../../../src/databases/lib/parse-rdf')

const url = path.resolve(__dirname, './pg132.rdf')
const rdf = fs.readFileSync(url)

describe('parseRDF', () => {
  it(`should parse RDF content`, () => {
    expect(parseRDF(rdf)).toBeInstanceOf(Object)
  })
})
