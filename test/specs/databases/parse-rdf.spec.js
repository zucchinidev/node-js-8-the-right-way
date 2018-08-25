'use strict'
const fs = require('fs')
const path = require('path')
const parseRDF = require('../../../src/databases/lib/parse-rdf')

const url = path.resolve(__dirname, './pg132.rdf')
const rdf = fs.readFileSync(url)

describe('parseRDF', () => {
  it(`should parse RDF content`, () => {
    const book = parseRDF(rdf)
    expect(book).toBeInstanceOf(Object)
    expect(book).toEqual({
      id: 132,
      title: 'The Art of War',
      authors: [
        'Giles, Lionel',
        'Sunzi, active 6th century B.C.'
      ],
      subjects: [
        'War -- Early works to 1800',
        'Military art and science -- Early works to 1800'
      ]
    })
  })
})
