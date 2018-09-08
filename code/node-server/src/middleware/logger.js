const fs = require('fs')
const logStream = fs.createWriteStream('logs/http-req.log', { flags: 'a' })
const errStream = fs.createWriteStream('logs/http-req-error.log', { flags: 'a' })

const logger = (err, req, res, next) => {
  if (err) {
    errStream.write(`\n${err.message}|${req.connection.remoteAddress}|${Date.now()}|${req.url}|${req.query.id}|${req.query.x}|${req.query.y}|${req.query.c}`)
    next(err)
  }
  logStream.write(`\n${req.connection.remoteAddress}|${Date.now()}|${req.url}|${req.query.id}|${req.query.x}|${req.query.y}|${req.query.c}`)
  next()
}

module.exports = logger
