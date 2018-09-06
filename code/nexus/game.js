const config = require('./config.js')
const HTTPEndpoint = config.APIENDPOINT

const WSClient = require('./WSClient.js')
const HTTPConn = require('./HTTPConn.js')

class Game {
	// nexus needs auto start on fail
	constructor() {
		this.board = {} // TODO instantiate board 500x500 (matrix style 500 rows by 500 columns)
		this.wsc = new WSClient(this.board, this.writeTile.bind(this))
		this.HTTPConn = new HTTPConn(this.prepareBoard.bind(this))
		this.HTTPConn.getBoard()
	}

	intToHex(int) {
		let hex = Number(int).toString(16).toUpperCase()

		if (hex.length < 2) {
			hex = "0" + hex
		}
		return hex
	}

	setTile(){
		this.HTTPConn.setTile(...arguments)
	}

	prepareBoard(array) {
		let x = 0
		let y = 0
		const numElements = array.length
		const dimension = Math.sqrt(numElements/4)

		for(let i=0; i < numElements; i += 4) {
			let color = this.intToHex(array[i]) + this.intToHex(array[i+1]) + this.intToHex(array[i+2])
			this.board[`${x}-${y}`] = color
			y++
			if (y === dimension) {
				y = 0
				x++
			}
		}
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

	writeTile(obj){
		// console.log("UPDATING BOARD AT", obj)
		const { x, y, hexStr } = obj
		this.board[`${x}-${y}`] = hexStr
	}


}

module.exports = Game
