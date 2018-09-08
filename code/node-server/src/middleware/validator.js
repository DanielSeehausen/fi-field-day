const config = require('../../config.js')
const validID = require('./reqValidators/validID.js')
const validColor = require('./reqValidators/validColor.js')
const validTile = require('./reqValidators/validTile.js')
const Group = require('../app/group.js')

/* this is strictly for validating routes that have specific parameter
 * requirements. If a request url isn't present here, it doesn't mean 404
 * instead, it means it doesn't require any special validation
 */

const routeValidators = {
  POST: {
    '/tile': [validID, validTile, validColor],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  },
  GET: {
    '/board': [validID],
    '/groups': [validID],
    '/tile': [validTile, validID],
    '/allGroups': [() => true],
    '/netstat': [() => true],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  }
}

function validRequest(req, res, next) {
  const validators = routeValidators[req.method][req.path]
  if (!validators.every(validator => validator(req))) {
    const invalids = validators.filter(validator => !validator(req)) // finds the validation methods that failed
    const groupId = req.query.id
    invalids.forEach(invalid => Group.addError(`in${invalid.name}`, groupId)) // passes name of validation method failed and changes it from e.g. "validTile" to "invalidTile"
    return res.status(422).send('Bad Request! Check your id, coordinates, color value, etc.')
  }
  next()
}

module.exports = validRequest
