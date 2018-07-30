const config = require('../../config.js') 
const Canvas = require('./canvas.js')

class Game {

  constructor() {
    this.canvas = new Canvas(config.ROWS, config.COLUMNS)
  }

  setTile(tile) { // {x, y, hexStr}
    return this.canvas.setTile(tile)
  }

  getTile(coords) {
    return this.canvas.getTile(coords)
  }
  
  getBoard() {
    return this.canvas.int8View
  }

  //********************************** MISC ************************************
  toJSON() {
    return {
      board: this.canvas.toJSON()
    }
  }

}

module.exports = Game
