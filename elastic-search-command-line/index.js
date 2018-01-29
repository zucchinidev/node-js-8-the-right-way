'use strict'

const request = require('request')
const commander = require('commander')
const { version, description } = require('./package')

const COMMANDS = {
  url: 'url [path]',
  get: 'get [path]',
  createIndex: 'create-index'
}

const fullUrl = (path = '') => {
  let url = `http://${commander.host}:${commander.port}/`
  if (commander.index) {
    url += commander.index + '/'
    if (commander.type) {
      url += commander.type + '/'
    }
  }
  return `${url}${path.replace(/^\/*/, '')}`
}

const onCreateIndexCommand = (...args) => handleResponse(...args)
const onGetDataCommand = (...args) => handleResponse(...args)

const handleResponse = (err, res, body) => {
  if (err) {
    throw err
  }

  const isJsonFormatSelected = commander.json
  if (isJsonFormatSelected) {
    return console.log(JSON.stringify(err || body))
  }
  console.log(body)
}

commander
  .version(version)
  .description(description)
  .usage('[options] <command> [...]')
  .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
  .option('-p, --port <number>', 'port number [9200]', '9200')
  .option('-j, --json', 'format output as JSON')
  .option('-i, --index <name>', 'which index to use')
  .option('-t, --type <type>', 'default type for bulk operations')

commander
  .command(COMMANDS.url)
  .description('generate the URL for the options and path (default is /)')
  .action((path = '/') => console.log(fullUrl(path)))

commander
  .command(COMMANDS.get)
  .description('perform an HTTP GET request for path (default is /)')
  .action((path = '/') => {
    const options = {
      url: fullUrl(path),
      json: commander.json
    }
    request(options, onGetDataCommand)
  })

commander.command(COMMANDS.createIndex)
  .description('create an index')
  .action(() => {
    if (!commander.index) {
      const message = 'No index specified! Use --index <name>'
      if (!commander.json) {
        throw new Error(message)
      }
      console.log(JSON.stringify({ error: message }))
      return
    }
    request.put(fullUrl(), onCreateIndexCommand)
  })

commander.parse(process.argv)
if (!commander.args.filter(arg => typeof arg === 'object').length) {
  commander.help()
}

// ./es-cli.js url 'some/path' -p 8080 -o my.cluster
// http://my.cluster:8080/some/path

//  the _cat endpoint offers a humanreadable
// (non-JSON) API for assessing the health and status of your cluster.
// ./es-cli.js get '_cat'
/*
/_cat/allocation
/_cat/shards
/_cat/shards/{index}
/_cat/master
/_cat/nodes
....
....
*/
