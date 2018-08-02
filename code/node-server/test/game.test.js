const config = require('../config.js')
config.ROWS = 10
config.COLUMNS = 10
const Game = require('../src/app/game.js')
const Canvas = require('../src/app/canvas.js')
const hex6CharToInt32 = require('../src/app/canvasHelpers/hex6CharToInt32.js')

const game = new Game()

test('creates a canvas', () => {
  expect(game.canvas instanceof Canvas).toBe(true)
})

test('properly updates the canvas with setTile and asserts that both views into the pixel byte buffer are returning accurate data', () => {
  const hexStr = '87FE21'
  const int32 = hex6CharToInt32(hexStr)
  
  game.setTile({x: 0, y: 0, hexStr})
  
  expect(game.getTile({x: 0, y: 0, hexStr})).toBe(int32)
  expect(game.canvas.int8View[0]).toBe(135)
  expect(game.canvas.int8View[1]).toBe(254)
  expect(game.canvas.int8View[2]).toBe(33)
  expect(game.canvas.int8View[3]).toBe(255)
  
  game.setTile({x: 1, y: 1, hexStr})
  expect(game.getTile({x: 0, y: 0, hexStr})).toBe(int32)
  expect(game.canvas.int8View[44]).toBe(135)
  expect(game.canvas.int8View[45]).toBe(254)
  expect(game.canvas.int8View[46]).toBe(33)
  expect(game.canvas.int8View[47]).toBe(255)
})
