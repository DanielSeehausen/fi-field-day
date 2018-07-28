const config = require('@config')
const Canvas = require('./canvas.js')

class Game {

  constructor() {
    this.canvas = new Board(config.ROWS, config.COLUMNS)
  }

  getCompressedBoard() {
    return this.canvas.getCompressed()
  }

  setTile(x, y, c) {
    return this.canvas.setTile(x, y, c)
  }

  getTile(x, y) {
    return this.canvas.getTile(x, y)
  }

  //********************************** MISC ************************************
  toJSON() {
    return {
      board: this.canvas.toJSON()
    }
  }

}

module.exports = Game
