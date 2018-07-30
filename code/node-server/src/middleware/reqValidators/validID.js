const config = require('@config')

function validID(req) {
  const id = req.query.id
  return (id < config.IDLIMIT["low"] || id > config.IDLIMIT["high"]) ? false : true
}

module.exports = validID
