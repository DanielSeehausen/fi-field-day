const WebSocket = require('ws')
const config = require("./config.js")
const socketURI = config.APIWSENDPOINT

class WSClient {
		constructor(board, writeTile) {

			// INITIALIZER DISPATCH
			this.dispatch = {
				"writeTile": writeTile,
			}

			this.board = board

			// BIND CONTEXT 
			this.handleMsg = this.handleMsg.bind(this)

			// INITIALIZE WS CONNECTION & ATTACH LISTENERS
			this.wsConn = new WebSocket(socketURI)
			this.wsConn.on('open', () => console.log("CONNECTED"))
			this.wsConn.on('message', this.handleMsg)
			this.wsConn.on('close', () => console.log('Socket closed'))
		}

		handleMsg(msg){
			let data = JSON.parse(msg)
			// console.log(data)
			const {action, payload} = data

			if (action && payload)
				this.dispatch[action](payload)

		}



	}

module.exports = WSClient
