class SocketConn {
  
  constructor(endpoint) {
    this.endpoint = endpoint
    this.ws = this.connectWS()
  }

  connectWS() {
    let ws = new WebSocket(this.endpoint)

    ws.onmessage = function() {
      console.log('Message from server ', event.data)
    }
    
    return ws
  }
}
