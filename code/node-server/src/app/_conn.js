class Conn {

  constructor(ws, ip) {
    this.ws = ws
    this.ip = ip
  }

  _packPayload(action, data) {
    return JSON.stringify({action: action, payload: data})
  }

  send(action, data) {
    // console.log("sending action:" , action);
    this.ws.send(this._packPayload(action, data))
  }

  terminate() {
    if (this.ws)
      this.ws.terminate()
  }

  toJSON() {
    return {ip: this.ip}
  }

  toString() {
    return this.ip
  }

}

module.exports = Conn
