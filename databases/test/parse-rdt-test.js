'use strict'

const fs = require('fs')
const expect = require('chai').expect
const parseRDF = require('../lib/parseRDF')

const rdf = fs.readFileSync(`${__dirname}/fixtures/pg132.rdf`)
describe('parseRFD', () => {
  it('should be an object', function () {
    const book = parseRDF(rdf)
    expect(book).to.be.a('object')
    expect(book).to.have.a.property('id', 132)
    expect(book).to.have.a.property('title', 'The Art of War')
    expect(book).to.have.a.property('authors')
      .that.is.an('array').with.lengthOf(2)
    expect(book).to.have.a.property('subjects')
      .that.is.an('array').with.lengthOf(2)
      .and.contains('Military art and science -- Early works to 1800')
      .and.contains('War -- Early works to 1800')
    expect(book.lcc).to.be.a('string')
    const isCorrectValue = /[A-Z]/gi.test(book.lcc) && /[^IOWXY]/gi.test(book.lcc)
    expect(isCorrectValue).to.equal(true)
    expect(book).to.have.a.property('link', 'http://www.gutenberg.org/ebooks/132.txt.utf-8')
  })
})
