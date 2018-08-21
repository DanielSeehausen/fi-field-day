const WebSocket = require('ws')
const socketURI = "ws://localhost:8080"
const fetch = require('node-fetch')
const HTTPEndpoint = "http://localhost:3000"



//WSS Manager
const WSSManager = (function (){
  let board = {}

  function intToHex(int) {
		let hex = Number(int).toString(16).toUpperCase()

		if (hex.length < 2) {
			hex = "0" + hex
		}
		return hex
	}

	function prepareBoard(array) {
		let x = 0
		let y = 0
		const numElements = array.length
		const dimension = Math.sqrt(numElements/4)

		for(let i=0; i < numElements; i += 4) {
			let color = intToHex(array[i]) + intToHex(array[i+1]) + intToHex(array[i+2])
			board[`${x}-${y}`] = color
			y++
			if (y === dimension) {
				y = 0 
				x++
			} 
		}
	}

  const route = `/board?id=${1}`
  fetch(HTTPEndpoint + route)
  .then(response => response.arrayBuffer())
  .then(bufferData => {
    const pixelArray = Array.prototype.slice.call(new Uint8ClampedArray(bufferData))
    prepareBoard(pixelArray)
    // console.log('fetched board: ', board)
  })


  return class {

    constructor(){

      // INITIALIZER DISPATCH
      this.dispatch = {
        "setBoard": this.writeBoard,
        "setTile": this.writeTile,
      }

      this.board = board

      // BIND CONTEXT 
      this.writeTile = this.writeTile.bind(this)
      this.writeBoard = this.writeBoard.bind(this)
      this.handleMsg = this.handleMsg.bind(this)
      this.requestBoard = this.requestBoard.bind(this)

      // INITIALIZE WS CONNECTION & ATTACH LISTENERS
      this.wsConn = new WebSocket(socketURI)
      this.wsConn.on('open', this.requestBoard)
      this.wsConn.on('message', this.handleMsg)
      this.wsConn.on('close', () => console.log('Socket closed'))
    }

    writeTile(obj){
    }

    writeBoard(arr){
    }

    convertBoard(){
    	let array = []

    	for (var key in this.board) {
    		let coordinates = key.split("-")
    		let x = parseInt(coordinates[0], 10)
    		let y = parseInt(coordinates[1], 10)
    		array.push({x,y, color: this.board[key]})
    	}

    	return array
    }

    setTile(x, y, c) {
			fetch(HTTPEndpoint + `/tile?x=${x}&y=${y}&c=${c}&id=${1}`, {
				method: 'Post',
				mode: 'no-cors'
			})
				.then(response => response)
				.then(x => {
					// console.log('%cJUST SET A TILE', 'color: purple', x.headers)
				})
		}


    handleMsg(msg){
      console.log("RECEIVED", msg)
      // const {action, payload} = JSON.parse(msg.data)
      // this.dispatch[action](payload)
    }

    requestBoard(){
      console.log("REQUESTING")
      this.wsConn.send(JSON.stringify({
        action: "getBoard", 
        payload: null
      }))
    }
  }
})()


module.exports = { WSSManager }

