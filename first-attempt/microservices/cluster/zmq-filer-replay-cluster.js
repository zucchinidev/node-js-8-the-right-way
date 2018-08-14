'use strict'

const cluster = require('cluster')
const zmq = require('zeromq')
const createReplaySocket = require('./zmq-filer-replay')
const numWorkers = require('os').cpus().length
const ipcAddr = 'ipc://file-dealer.ipc'
if (cluster.isMaster) {
  const router = zmq.socket('router').bind('tcp://127.0.0.1:60401')
  const dealer = zmq.socket('dealer').bind(ipcAddr)

  // forward messages between the router and dealer
  router.on('message', (...frames) => dealer.send(frames))
  dealer.on('message', (...frames) => router.send(frames))

  cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`))

  // fork some worker processes.
  const workers = [...Array(numWorkers).keys()]
  workers.forEach(() => cluster.fork())
} else {
  // worker processes create a Replay socket and connect to the Dealer
  createReplaySocket(ipcAddr)
}