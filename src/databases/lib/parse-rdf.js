'use strict'
const cheerio = require('cheerio')

module.exports = rdf => {
  const $ = cheerio.load(rdf)
  const bookId = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '')
  const title = $('dcterms\\:title').text()
  const authors = $('pgterms\\:agent pgterms\\:name').toArray().map(e => $(e).text())
  const subjects = $('[rdf\\:resource$="LCSH"]')
    .parent().find('rdf\\:value').toArray().map(e => $(e).text())

  return {
    id: bookId,
    title,
    authors,
    subjects
  }
}
