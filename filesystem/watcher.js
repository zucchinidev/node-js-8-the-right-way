'use strict'
const fs = require('fs')
const path = require('path')

fs.watch(path.resolve(__dirname, './target.txt'), () => console.log('file changed!'))
console.log('now watching target.txt for changes....')
