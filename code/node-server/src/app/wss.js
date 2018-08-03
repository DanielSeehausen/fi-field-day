const config = require('../../config.js')
const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({port: config.WSPORT})
wss.clients = new Set()

wss.on('connection', (ws, req) => {

  wss.clients.add(ws)
  // ws.on('message', (data) => {
  //   return // do nothing...not supposed to handle incoming traffic from wsclients
  // })
  ws.on('close', () => {
    console.log("WS conn closed!")
    wss.clients.delete(ws)
  })
  
  ws.on('error', (error) => {
    console.log("WS conn errored! ", error)
    wss.clients.delete(ws)
  })
  
  console.log(`New wss initiated. listening for clients on: ${config.WSPORT}`)
})
  
wss.emit = (data) => {
  console.log(wss.clients.length)
  wss.clients.forEach(client => {
    if (client.readyState === WebSocketServer.OPEN)
      client.send(data);
  })
}

module.exports = wss
