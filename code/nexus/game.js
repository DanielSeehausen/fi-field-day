const config = require('./config.js') 
const WSClient = require('./WSClient.js')
const fetch = require('node-fetch')
const HTTPEndpoint = config.APIENDPOINT

class Game {

  constructor() {
    this.board = {} // TODO instantiate board 500x500 (matrix style 500 rows by 500 columns)
    this.wsc = new WSClient(this.board, this.writeTile.bind(this))
    this.getBoard()
    // this.serverConn = new ServerConn()
  }

  intToHex(int) {
    let hex = Number(int).toString(16).toUpperCase()

    if (hex.length < 2) {
      hex = "0" + hex
    }
    return hex
  }

  prepareBoard(array) {
    let x = 0
    let y = 0
    const numElements = array.length
    const dimension = Math.sqrt(numElements/4)

    for(let i=0; i < numElements; i += 4) {
      let color = this.intToHex(array[i]) + this.intToHex(array[i+1]) + this.intToHex(array[i+2])
      this.board[`${x}-${y}`] = color
      y++
      if (y === dimension) {
        y = 0 
        x++
      } 
    }
  }

  writeTile(obj){
    const { x, y, hexStr } = obj
    this.board[`${x}-${y}`] = hexStr
  }

  getBoard() {
    const route = `/board?id=${1}`
    fetch(HTTPEndpoint + route)
    .then(response => response.arrayBuffer())
    .then(bufferData => {
      const pixelArray = Array.prototype.slice.call(new Uint8ClampedArray(bufferData))
      this.prepareBoard(pixelArray)
    })
  }

  setTile(x, y, c) {
    console.log('sjns')
      fetch(HTTPEndpoint + `/tile?x=${x}&y=${y}&c=${c}&id=${config.GROUPID}`, {
        method: 'Post',
        mode: 'no-cors',
      })
      .then(response => response)
      // .then(console.log)
    }
}

module.exports = Game
