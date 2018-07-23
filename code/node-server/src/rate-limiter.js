const config = require('../config.js')
const RateLimit = require('express-rate-limit')

const limiter = new RateLimit({ 
  windowMs: config.LIMITWINDOW, // window of limit
  max: config.LIMITCOUNT, // max requests in count
  delayMs: 0, // more relevant for client sign/captcha type stuff
  headers: false,
  message: `Rate Limit Exceeded. Retry-After ${this.windowMs} ms`,
  keyGenerator: (req) => { req.query.id },
  handler: (req, res, next) => { res.status(429).send(this.msg) }
})

module.exports = limiter
