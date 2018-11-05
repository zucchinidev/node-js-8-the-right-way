'use strict'

const fs = require('fs')
const request = require('request')
const program = require('commander')
const pkg = require('./package')

function fullUrl (path = '') {
  let url = `http://${program.host}:${program.port}/`
  if (program.index) {
    url += `${program.index}/`
    if (program.type) {
      url += `${program.type}/`
    }
  }
  return url + path.replace(/^\/*/, '')
}

function handleResponse (err, res, body) {
  if (isJson()) {
    console.log(JSON.stringify(err || body))
  } else {
    if (err) {
      throw err
    }
    console.log(body)
  }
}

const isJson = () => program.json

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <command> [...]')
  .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
  .option('-p, --port <number>', 'port number [9200]', '9200')
  .option('-j, --json', 'format output as JSON')
  .option('-i, --index <name>', 'which index to use')
  .option('-t, --type <type>', 'default type for bulk operations')

program.command('get [path]')
  .description('generate the URL for the options and path (default is /)')
  .action((path = '/') => {
    const options = {
      url: fullUrl(path),
      json: program.json
    }
    request(options, handleResponse)
  })

program.command('create-index')
  .description('Create an index in Elasticsearch')
  .action(() => {
    if (!program.index) {
      const msg = 'No index specified! Use --index <indexName>'
      if (!isJson()) {
        throw Error(msg)
      } else {
        console.log(JSON.stringify({ error: msg }))
        return
      }
    }

    request.put(fullUrl(), handleResponse)
  })

program.parse(process.argv)
const isObject = arg => typeof arg === 'object'
const hasDefinedCommands = program.args.filter(isObject).length
if (!hasDefinedCommands) {
  program.help()
}
