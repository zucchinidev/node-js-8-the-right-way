'use strict'

/*
*  A simple program that watch files
*  for changes and read arguments from the command line
*/

const fs = require('fs')
fs.watch('target.txt', () => console.log('File changed!'))
console.log('Now watching target.txt for changes...')