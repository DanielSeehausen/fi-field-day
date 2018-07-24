const config = require('@config')
const validID = require('./validID')
const validColor = require('./validColor')
const getTile = require('./getTile')

// this is strictly for validating routes that have specific parameter requirements 
// if a request url isn't present here, it doesn't mean 404 (instead, it doesn't require any special validation)

const routeValidators = {
  "/setTile": [validID, validTile, validColor],
  "/getBoard": [validID],
  "/getTile": [validTile, validID],
  __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
}

function validRequest(req, res) {
  const validators = routeValidators[req.url]
  return validators.every(validator => validator(req))
}

module.exports = validRequest
