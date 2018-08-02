const config = require('../../config.js')
const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({port: config.WSPORT})

wss.on('connection', (ws, req) => {

    // ws.on('message', (data) => {
    //   return // do nothing...not supposed to handle incoming traffic from wsclients
    // })
    
    ws.on('close', () => {
      console.log("WS conn closed!")
    })
    
    ws.on('error', (error) => {
      console.log("WS conn errored! ", error)
    })
    
  })
  console.log(`New wss initiated. listening for clients on: ${config.WSPORT}`)
}
  
wss.emit = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocketServer.OPEN)
      client.send(data);
  })
}

module.exports = wss
