// expects hex value to have the '#' chopped off with a length of 3

function hexStrToInt32(hexStr) {
  const byteArray = new Uint8ClampedArray(3).fill(0)
  byteArray.forEach((_, idx) => {
    byteArray[idx] = parseInt(hexStr[idx], 16)
  })
  return byteArray
}

module.exports = hexStrToInt32
