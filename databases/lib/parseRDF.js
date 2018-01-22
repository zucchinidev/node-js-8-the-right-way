'use strict'
const cheerio = require('cheerio')

function getBookId ($pgterms) {
  return +$pgterms.attr('rdf:about').replace('ebooks/', '')
}

function getBookTitle ($pgterms) {
  return $pgterms.find('dcterms\\:title').text()
}

function getBookAuthors ($, $pgterms) {
  const namesOfAgents = $pgterms.find('pgterms\\:agent pgterms\\:name')
  return namesOfAgents.toArray().map(agent => $(agent).text())
}

function getBookSubjects ($pgterms, $) {
  return $pgterms.find('[rdf\\:resource$="/LCSH"]')
    .parent()
    .find('rdf\\:value')
    .toArray()
    .map(subject => $(subject).text())
}

module.exports = rdf => {
  const $ = cheerio.load(rdf)
  const $pgterms = $('pgterms\\:ebook')
  const id = getBookId($pgterms)
  const title = getBookTitle($pgterms)
  const authors = getBookAuthors($, $pgterms)
  const subjects = getBookSubjects($pgterms, $)
  return { id, title, authors, subjects }
}