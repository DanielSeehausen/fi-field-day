const config = require('../config.js')
const Game = require('../src/app/game.js')
const Canvas = require('../src/app/canvas.js')
const hex6CharToInt32 = require('../src/app/canvasHelpers/hex6CharToInt32.js')

const game = new Game()
const canvas = game.canvas

test('creates a canvas', () => {
  expect(game.canvas instanceof Canvas).toBe(true)
})

test('properly updates the canvas with setTile and asserts that both views into the pixel byte buffer are returning accurate data', () => {
  const hexStr = '87FE21'
  const int32 = hex6CharToInt32(hexStr)
  
  game.setTile({x: 0, y: 0, hexStr})
  
  // TODO: these should really be in the canvas too
  expect(canvas.int32View[0]).toBe(int32)
  expect(canvas.int8View[0]).toBe(135)
  expect(canvas.int8View[1]).toBe(254)
  expect(canvas.int8View[2]).toBe(33)
  expect(canvas.int8View[3]).toBe(255)
  
  game.setTile({x: 1, y: 1, hexStr})
  expect(canvas.int32View[3]).toBe(int32)
  expect(canvas.int8View[12]).toBe(135)
  expect(canvas.int8View[13]).toBe(254)
  expect(canvas.int8View[14]).toBe(33)
  expect(canvas.int8View[15]).toBe(255)
})
