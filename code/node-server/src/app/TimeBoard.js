const config = require('../../config.js')
const Group = require('./group.js')

class TimeBoard {
  
  constructor() {
    this.board = this.setBoard()
  }
  
  setBoard() {
    const ms = Date.now()
    const board = {}
    for (let x = 0; x < config.ROWS; x++) {
      for (let y = 0; y < config.COLUMNS; y++) {
        const key = `${x}-${y}`
        const tile = {
          time: ms,
          groupID: 0,
          c: null
        }
        board[key] = tile
      }
    }
    return board
  }
  
  updateTile(x, y, c) {
    const key = `${x}-${y}`
    const oldTime = this.board[key].time
    const newTime = Date.now()
    const tile = this.board[key]
    const group = Group.all[tile.groupID]
    const correctColor = group.hexColor
    if (tile.c !== correctColor) {
      const additionalTime = newTime - oldTime
      group.addTime(additionalTime)
    }
    this.board[key].c = c
    this.board[key].time = newTime
  }
  
}

module.exports = TimeBoard
