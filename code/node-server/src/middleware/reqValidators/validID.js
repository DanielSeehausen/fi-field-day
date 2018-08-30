const config = require('../../../config.js')

function validID(req) {
  const id = req.query.id
  return id < config.IDLIMIT['low'] || id > config.IDLIMIT['high'] ? true : false
}

module.exports = validID
