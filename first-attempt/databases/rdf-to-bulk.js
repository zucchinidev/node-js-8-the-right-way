'use strict'

const dir = require('node-dir')
const parseRDF = require('./lib/parseRDF')
const minimist = require('minimist')

const args = minimist(process.argv)
const options = {
  match: /\.rdf$/,
  exclude: ['pg0.rdf'] // ignore the template RDF file (ID = 0)
}
dir.readFiles(args.dirname, options, (err, content, next) => {
  if (err) {
    throw err
  }
  const book = parseRDF(content)
  console.log(JSON.stringify({ index: { _id: `pg${book.id}` } }))
  console.log(JSON.stringify(book))
  next()
})
/*
Now, when head closes the pipe, the next attempt to use console.log() will trigger
the error event listener and the process will exit silently. If you’re worried
about output errors other than EPIPE, you can check the err object’s code
property and take action as appropriate.
 */
process.stdout.on('error', err => {
  if (err.code === 'EPIPE') {
    process.exit()
  }
  throw err
})