const config = require('../../config.js')
const WebSocketServer = require('ws')

const wss = new WebSocketServer.Server({port: config.WSPORT})

wss.on('connection', (ws) => {
  
  // console.log("New wsclient connected: \n\t", wss.clients.size, " now connected")

  ws.on('message', (data) => {
    return // do nothing...not supposed to handle incoming traffic from wsclients
  })
  
  ws.send("ws connection established with server")
  
  ws.on('close', () => {
    console.log("WS conn closed!")
  })
  
  ws.on('error', (error) => {
    console.log("WS conn errored! ", error)
  })
  
})

wss.emit = (data) => {
  try {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  } catch (e) {
    console.error('websocket emit failure!\n', e)
  }

}


module.exports = wss
