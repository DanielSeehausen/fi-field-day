function reverse8CharHexStr(hexStr) {
  if (hexStr.length !== 8)
    throw `Hex string: ${hexStr} wrong length! Should be 8`
  
  let reversed = ''
  for (let idx = 6; idx >= 0; idx -= 2) {
    reversed += hexStr.substring(idx, idx + 2)
  }
  return reversed
}

module.exports = reverse8CharHexStr
