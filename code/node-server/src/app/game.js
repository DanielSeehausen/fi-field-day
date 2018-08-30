const config = require('../../config.js')
const Canvas = require('./canvas.js')
const Group = require('./group.js')

const BASECOLORS = [
  '#C0392B','#E74C3C','#9B59B6',
  '#8E44AD','#2980B9','#3498DB',
  '#1ABC9C','#16A085','#27AE60',
  '#2ECC71','#F1C40F','#F39C12',
  '#E67E22','#D35400','#BDC3C7',
  '#34495E','#17202A','#641E16',
  '#512E5F','#154360','#0E6251',
  '#145A32','#7D6608','#7E5109',
]

class Game {

	constructor() {
		this.canvas = new Canvas(config.ROWS, config.COLUMNS)
		this.wss = require('./wss.js')
		this.createGroups()
		this.setIdenticons()
	}

	setTile(tile, groupId) { // {x, y, hexStr} sans '#' on hexStr
		this.canvas.setTile(tile)
		Group.addWrite(groupId)
		this.wss.emit({action: "writeTile", payload: tile})
	}

	getTile(coords) {
		return this.canvas.getTile(coords)
	}

	getBoard() {
		return this.canvas.buffer
	}

	createGroups() {
		for (let i = config.IDLIMIT.low; i <= config.IDLIMIT.high; i++) {
			new Group(i, BASECOLORS[i])
		}
	}

	setIdenticons() {
		const numGroups = Object.keys(Group.all).length
		const boardArea = config.ROWS * config.COLUMNS
		debugger
		const identiconArea = boardArea / numGroups
		const identiconSideLength = Math.sqrt(identiconArea)
		for (let x = 0; x < config.ROWS; x++) {

		}
	}

	toJSON() {
		return {
			board: this.canvas.toJSON()
		}
	}

}

module.exports = Game
