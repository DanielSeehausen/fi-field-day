const WebSocket = require('ws')
const socketURI = "ws://mayisgr8.win:8080"

//WSS Manager
const WSSManager = (function (){
  let board = []

  return class {

    constructor(){

      // INITIALIZER DISPATCH
      this.dispatch = {
        "setBoard": this.writeBoard,
        "setTile": this.writeTile,
      }

      // BIND CONTEXT 
      this.writeTile = this.writeTile.bind(this)
      this.writeBoard = this.writeBoard.bind(this)
      this.handleMsg = this.handleMsg.bind(this)
      this.requestBoard = this.requestBoard.bind(this)

      // INITIALIZE WS CONNECTION & ATTACH LISTENERS
      this.wsConn = new WebSocket(socketURI)
      this.wsConn.addEventListener('open', this.requestBoard)
      this.wsConn.addEventListener('message', this.handleMsg)
      this.wsConn.addEventListener('close', () => console.log('Socket closed'))
    }

    writeTile(obj){
    }

    writeBoard(arr){
    }


    handleMsg(msg){
      const {action, payload} = JSON.parse(msg.data)
      this.dispatch[action](payload)
    }

    requestBoard(){
      this.wsConn.send(JSON.stringify({
        action: "getBoard", 
        payload: null
      }))
    }
  }
})()


module.exports = { WSSManager }

