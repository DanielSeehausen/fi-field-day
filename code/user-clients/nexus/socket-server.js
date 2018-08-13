const WSClient = require('ws').client
const config = require('./config.js')


class WSClient {
  
  constructor(setTile) {
    this.board = board
    this.wsConn = new WebSocket(config.SERVERWSPORT)
    this.wsConn.addEventListener('message', setTile)
    this.wsConn.addEventListener('close', () => console.log('Socket closed'))
  }
  
  setTile(data) {
    //TODO set tile here. 
  }

}


module.exports = WSClient
