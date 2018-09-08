const fs = require('fs')

console.log(process.cwd())
const logStream = fs.createWriteStream('./code/node-server/logs/http-req.log', { flags: 'a' })
const errStream = fs.createWriteStream('./code/node-server/logs/http-req-error.log', { flags: 'a' })

const logger = (req, res, next) => {
  logStream.write(`\n${req.connection.remoteAddress}|${Date.now()}|${req.url}|${req.query.id}|${req.query.x}|${req.query.y}|${req.query.c}`)
  next()
}

module.exports = logger
