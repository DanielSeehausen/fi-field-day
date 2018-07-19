const config = require('../config.js')
const WebSocketServer = require('ws').Server

class WSS {

  constructor(game) {
    this.wss = new WebSocketServer({port: config.PORT})
    this.game = game

    this.wss.on('connection', (ws, req) => {

      const ip = req.connection.remoteAddress
      const conn = this.game.connect(ws, ip)
      console.log(`New wsclient from: ${ip}`);
      game.sendBoard(conn)

      ws.on('message', (data) => {
        return // do nothing...not supposed to handle incoming traffic from wsclients
      })

      ws.on('close', () => {
        game.removeConn(conn)
        console.log(`${ip}: disconnected wsclient`)
      })

      ws.on('error', (error) => {
        console.log(`${ip} ERRORED: ${error}`)
      })

    })
    console.log(`New wss initiated. listening for clients on: ${config.PORT}`);
  }
}

module.exports = WSS
