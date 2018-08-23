'use strict'

const cluster = require('cluster')
const fs = require('fs')
const zmq = require('zeromq')
const numWorkers = require('os').cpus().length

if (cluster.isMaster) {
  const router = zmq.socket('router').bind('tcp://127.0.0.1:60401')
  const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc')

  router.on('message', (...frames) => {
    console.log('incoming frames in router')
    dealer.send(frames)
  })
  dealer.on('message', (...frames) => router.send(frames))

  // listen for workers to come online
  cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`));

  [...Array(numWorkers).keys()].forEach(() => cluster.fork())
} else {
  const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc')
  responder.on('message', data => {
    const request = JSON.parse(data)
    console.log(`Received request to get: ${request.path}`)

    fs.readFile(request.path, (err, content) => {
      if (err) {
        throw err
      }
      console.log('Sending response content.')
      responder.send(JSON.stringify({
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      }))
    })
  })
}
