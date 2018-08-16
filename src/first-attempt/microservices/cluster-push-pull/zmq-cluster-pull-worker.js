const zmq = require('zeromq')
const cluster = require('cluster')
const numWorkers = require('os').cpus().length
const ipcAddr = 'ipc://file-work.ipc'

if (cluster.isMaster) {
  cluster.on('online', worker => console.log(`Worker ${worker.process.pid} is online`))
  const workers = [...Array(numWorkers).keys()]
  workers.forEach(() => cluster.fork())
} else {
  const worker = zmq.socket('pull')
  worker.connect(ipcAddr)
  console.log('Worker connected to: %s - %d', ipcAddr, process.pid)
  worker.on('message', function (msg) {
    console.log('work: %s - %d', msg.toString(), process.pid)
  })
}
