class SocketConn {
  
  constructor(endpoint, canvas) {
    this.endpoint = endpoint
    this.ws = this.connectWS()

    this.canvas = canvas
  }

  connectWS() {
    let ws = new WebSocket(this.endpoint)

    ws.onmessage = (function() {
      const data = JSON.parse(event.data)
      if (data.payload) {
        const {x, y, hexStr} = data.payload

        this.canvas.drawTile(x, y, hexStr)
      }
      // console.log('Message from server ', event.data)
    }).bind(this)
    
    return ws
  }
}
