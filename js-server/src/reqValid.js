const config = require('../config.js')

// TODO all ternaries could just return conditionals instead

function isNumeric(num=undefined) {
  return !isNaN(num)
}

function validID(id=-1) {
  return (id < config.IDLIMIT["low"] || id > config.IDLIMIT["high"]) ? false : true
}

function isHex(str) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test('#aabbcc')
}

function validColor(str='') {
  if (str.length === 3 || str.length === 6)
    return isHex(str)
  return false
}

function validTile(x, y) {
  return (
    isNumeric(x) &&
    isNumeric(y) &&
    x < config.COLUMNS &&
    x > -1 &&
    y < config.ROWS &&
    y > -1
  )
}

function reqValid(req) {
  switch (req.path) {
    case "/getBoard":
      return validID(req.query.id)
            ? true : false
      break

    case "/getTile":
      return (validTile(req.query.x, req.query.y) &&
              validID(req.query.id))
            ? true : false
      break

    case "/setTile":
      return (validTile(req.query.x, req.query.y) &&
              validID(req.query.id) &&
              validColor(req.query.c))
            ? true : false
      break

    case "/getScores":
      return (req.query.id === '0')
      break

    case "/getGroup":
      return (validID(req.query.id))
      break

    default:
      return false
  }

}

module.exports = reqValid
