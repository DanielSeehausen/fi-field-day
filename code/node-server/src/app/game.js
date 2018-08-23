const config = require('../../config.js')
const Canvas = require('./canvas.js')
const Group = require('./group.js')

class Game {

	constructor() {
		this.canvas = new Canvas(config.ROWS, config.COLUMNS)
		this.wss = require('./wss.js')
		this.createGroups()
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
			new Group(i)
		}
	}

	toJSON() {
		return {
			board: this.canvas.toJSON()
		}
	}

}

module.exports = Game
