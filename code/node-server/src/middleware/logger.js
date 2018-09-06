const fs = require('fs')
const logStream = fs.createWriteStream('logs/http-req.log', { flags: 'a' })
const errStream = fs.createWriteStream('logs/http-req-error.log', { flags: 'a' })

const logger = (err, req, res, next) => {
  if (err) {
    errStream.write(`\nErr: ${err.message} Req Conn: ${req.connection.remoteAddress} Req Url: ${req.url} Time: ${Date.now()}`)
    next(err)
  }
  logStream.write(`\nReq Conn: ${req.connection.remoteAddress} Req Url: ${req.url} Time: ${Date.now()}`)
  next()
}

module.exports = logger
