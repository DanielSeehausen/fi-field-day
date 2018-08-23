const config = require('./config.js') 
const WSClient = require('./WSClient.js')

class Game {

  constructor() {
    this.board = this.setBoard()
    this.wsc = new WSClient(this.setTile) // so updates can call setTile
    this.serverConn = new ServerConn()
    this.queue = [{x: 1, y: 2, c: 'ff0000', id: 3}]
    this.startQueueProcess()
  }
  
  _setBoardFromUtf8Arr(utf8Arr) {
    //TODO: do this
  }
  
  _setDefaultBoard() {
    return new Array(config.BOARDDIMENSION).fill(null).forEach(row => {
      row = new Array(config.BOARDDIMENSION).fill("FFFFFF")
    })
  }
  
  setBoard(utf8Arr=false) {
    return (utf8Array) ? this._setBoardFromUtf8Arr(utf8Array) : this._setDefaultBoard()
  }
  
  startQueueProcess() {
    console.log('starting queue')
    setInterval(() => {
      if (this.queue.length > 0) {
        let nextPoint = queue.shift()
        console.log("interval is digesting: ", nextPoint)
      }
    }, config.interval)
  }

}

module.exports = Game
