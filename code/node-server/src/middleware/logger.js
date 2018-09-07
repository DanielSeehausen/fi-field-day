const fs = require('fs')
const logStream = fs.createWriteStream('logs/http-req.log', { flags: 'a' })
const errStream = fs.createWriteStream('logs/http-req-error.log', { flags: 'a' })

const logger = (err, req, res, next) => {
  if (err) {
    errStream.write(`\nErr: ${err.message} Req Conn: ${req.connection.remoteAddress} ** Time: ${Date.now()} | Endpoint: ${req.url} | GroupID: ${req.query.id} | X: ${req.query.x} Y: ${req.query.y} Color: ${req.query.c} **`)
    next(err)
  }
  logStream.write(`\nReq Conn: ${req.connection.remoteAddress} ** Time: ${Date.now()} | Endpoint: ${req.url} | GroupID: ${req.query.id} | X: ${req.query.x} Y: ${req.query.y} Color: ${req.query.c} **`)
  next()
}

module.exports = logger
