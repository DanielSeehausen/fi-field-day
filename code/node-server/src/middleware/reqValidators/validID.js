const config = require('../../../config.js')

function validID(req) {
  const id = parseInt(req.query.id)
  return (isNaN(id) || (id < config.IDLIMIT['low'] || id > config.IDLIMIT['high'])) ? false : true
}

module.exports = validID
