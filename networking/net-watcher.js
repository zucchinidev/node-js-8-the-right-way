'use strict'

const filename = process.argv[2]
const { createServerWatcher } = require('./server')

if (!filename) {
  throw Error('Error: No filename specified')
}
createServerWatcher(filename).listen(60300, () => console.log('Listening for subscribers...'))
