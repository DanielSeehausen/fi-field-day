const fs = require('fs')
const logStream = fs.createWriteStream('../../logs/http-req.log', {flags: 'a'})
const errStream = fs.createWriteStream('../../logs/http-req-error.log', {flags: 'a'})

// log success
app.use((req, res, next) => {
  logStream.write(`\n${req.connection.remoteAddress} ${req.url} ${Date.now()}`)
  next()
})

// log failure
app.use((err, req, res, next) => {
  errStream.write(`\n${req.connection.remoteAddress} ${req.url} ${Date.now()}`)
  next(err)
})

module.exports = logger
