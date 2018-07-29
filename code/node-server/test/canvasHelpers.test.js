const reverse8CharHexStr = require('../src/app/canvasHelpers/reverse8CharHexStr.js')
const hex6CharToInt32 = require('../src/app/canvasHelpers/hex6CharToInt32.js')

test('reverse8CharHexStr reverses an 8 character hex str', () => {
  const str = '213141FF'
  expect(reverse8CharHexStr(str)).toBe('FF413121')
})

test('hex6CharToInt32 reverses a 6 char hex str and adds an alpha value in the process', () => {
  const str = '010203'
  const reversedWithAlpha = reverse8CharHexStr('010203FF')
  const int32 = parseInt(reversedWithAlpha, 16)
  expect(hex6CharToInt32(str)).toBe(int32)
})
