const reverse8CharHexStr = require('./reverse8CharHexStr.js')

function hex6CharToInt32(hexStr) {
  const hex8Char = hexStr + 'FF'
  const reversedWithAlpha = reverse8CharHexStr(hex8Char)
  return parseInt(reversedWithAlpha, 16)
}

module.exports = hex6CharToInt32
