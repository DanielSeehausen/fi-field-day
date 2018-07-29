const config = require('@config')
const validID = require('./reqValidators/validID.js')
const validColor = require('./reqValidators/validColor.js')
const validTile = require('./reqValidators/validTile.js')

/* this is strictly for validating routes that have specific parameter
 * requirements. If a request url isn't present here, it doesn't mean 404
 * instead, it means it doesn't require any special validation
 */
 
const routeValidators = {
  "POST": {
    "/tile": [validID, validTile, validColor],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  },
  "GET": {
    "/board": [validID],
    "/tile": [validTile, validID],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  }
}

pry = require('pryjs')
function validRequest(req, res, next) {
  const validators = routeValidators[req.method][req.url]
  if (!validators.every(validator => validator(req)))
    return res.status(422).send("Bad Request! Check your id, coordinates, color value, etc.")
  
  next()
}

module.exports = validRequest
