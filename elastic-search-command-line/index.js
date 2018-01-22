'use strict'

const fs = require('fs')
const request = require('request')
const commander = require('commander')
const { version, description } = require('./package')

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
  .command('url [path]')
  .description('generate the URL for the options and path (default is /)')
  .action((path = '/') => console.log(fullUrl(path)))

commander.parse(process.argv)
if (!commander.args.filter(arg => typeof arg === 'object').length) {
  commander.help()
}

// ./es-cli.js url 'some/path' -p 8080 -o my.cluster
// http://my.cluster:8080/some/path
