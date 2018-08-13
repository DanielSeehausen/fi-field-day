const config = require('./config.js') 
const WSClient = require('./socket-server.js')
const ServerConn = require('./socket-server.js')

class Game {

  constructor() {
    this.board = [] // TODO instantiate board 500x500 (matrix style 500 rows by 500 columns)
    this.wsc = new WSClient(this.setTile) // so updates can call setTile
    this.serverConn = new ServerConn()
    this.queue = []
    this.startQueueProcess()
  }
  
  startQueueProcess() {
    setInterval(() => {
      if (this.queue.length > 0) {
        let nextPoint = queue.shift()
        console.log("interval is digesting: ", nextPoint)
      }
    }, config.interval)
  }

  


}

module.exports = Game
