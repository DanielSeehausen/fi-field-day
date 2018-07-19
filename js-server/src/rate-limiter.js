const config = require('../config.js')
const RateLimit = require('express-rate-limit')

var limiter = new RateLimit({ 
  windowMs: config.LIMITWINDOW, // window of limit
  max: config.LIMITCOUNT,
  delayMs: 0, // more relevant for client sign/captcha type stuff
  headers: false,
  msg: `Rate Limit Exceeded. Retry-After ${this.windowMs} ms`,
  handler: (req, res, next) => { res.status(429).send(this.msg) }
})
module.exports = limiter
