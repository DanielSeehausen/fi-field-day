const config = require('config.js')
const validID = require('./validID')
const validColor = require('./validColor')
const getTile = require('./getTile')


const routeValidators = {
  "/setTile": [validID, validTile, validColor],
  "/getBoard": [validID],
  "/getTile": [validTile, validID],
  __noSuchMethod__: [() => (false)]
}

function validReq(req) {
  const validators = routeValidators[req.url]
  return validators.every(validator => validator(req))
}

module.exports = validReq
