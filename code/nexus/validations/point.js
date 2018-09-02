const config = require("../config.js")

function validPoint(x,y) {
  const integers = Number.isInteger(x) && Number.isInteger(y)
  const inRange = x >= 0 && y >= 0 && x < config.BOARDDIMENSION && y < config.BOARDDIMENSION 
  return integers && inRange
}

module.exports = validPoint