#!/usr/bin/env node
'use strict'

const file = process.argv[2]
require('fs').createReadStream(file).pipe(process.stdout)
// $ ./cat.js file.txt
