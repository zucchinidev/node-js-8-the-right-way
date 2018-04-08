'use strict'

const fs = require('fs')
const zmq = require('zeromq')
const args = require('minimist')(process.argv)
const { filename: file } = args
const publisher = zmq.socket('pub')
fs.watch(file, () => {
  publisher.send(JSON.stringify({
    type: 'changed',
    file,
    timestamp: Date.now()
  }))
})
publisher.bind('tcp://*:60400', err => {
  if (err) {
    throw err
  }
  console.log('Listening for zmq subscribers...')
})
