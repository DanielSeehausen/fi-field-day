const config = require('../../../config.js')

function isNumeric(num=undefined) {
  return !isNaN(num)
}

function validTile(req) {
  const [x, y] = [req.query.x, req.query.y]

  return (
    isNumeric(x) &&
    isNumeric(y) &&
    x < config.COLUMNS &&
    x > -1 &&
    y < config.ROWS &&
    y > -1
  )
}

module.exports = validTile
