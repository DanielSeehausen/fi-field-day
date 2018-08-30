const config = require('../../config.js')
const Canvas = require('./canvas.js')
const Group = require('./group.js')

const BASECOLORS = [
  'C0392B','E74C3C','9B59B6',
  '8E44AD','2980B9','3498DB',
  '1ABC9C','16A085','27AE60',
  '2ECC71','F1C40F','F39C12',
  'E67E22','D35400','BDC3C7',
  '34495E','17202A','641E16',
  '512E5F','154360','0E6251',
  '145A32','7D6608','7E5109',
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
    const fullSize = 55
    const buffer = 15
    const groupCount = Object.keys(Group.all).length

    const recs = [
      {spx: 0, spy: 0, dx: 1, dy: 0, count: null},
      {spx: config.ROWS - 15, spy: 0, dx: 0, dy: 1, count: null},
      {spx: config.ROWS - 15, spy: config.COLUMNS - 15, dx: -1, dy: 0, count: null},
      {spx: 0, spy: config.COLUMNS - 15, dx: 0, dy: -1, count: null}
    ]

    const minPerSide = Math.floor(groupCount / 4)

    recs.forEach(obj => obj.count = minPerSide)

    const remainingIdenticons = groupCount % minPerSide

    recs.slice(0, remainingIdenticons).forEach(obj => obj.count++)

    const startPositions = []
    recs.forEach(rec => {
      getStartIdenticonPositions(rec)
    })

		Object.keys(Group.all).forEach((groupId) => {
			for (let row = 0; row < identiconSideLength; row++) {
				for (let col = 0; col < identiconSideLength; col++) {
          this.canvas.setTile({x: row + (groupId * identiconSideLength), y: col + (groupId * identiconSideLength), hexStr: Group.all[groupId].hexColor})

				}

			}

		})
	}

  getStartIdenticonPositions({spx, spy, dx, dy, count}) {
    const posArray = []

    for (let idx = 0; idx < count; idx++) {
      const posHash = {}
      posHash['x'] = (fullSize * idx * dx) + (spx + buffer)
      posHash['y'] = (fullSize * idx * dy) + (spy + buffer)
      posHash['c'] = '00FF00'
      posArray.push(posHash)
    }

    return posArray
  }

	toJSON() {
		return {
			board: this.canvas.toJSON()
		}
	}

}

module.exports = Game

////////////////////////////////////////////////////////////////
// const fullSize = 55
// const buffer = 15
// const groupCount = 29
//
// function getStartPositions({spx, spy, dx, dy, count}) {
//   const posArray = []
//
//   for (let idx = 0; idx < count; idx++) {
//     const posHash = {}
//     posHash['x'] = (fullSize * idx * dx) + (spx + buffer)
//     posHash['y'] = (fullSize * idx * dy) + (spy + buffer)
//     posHash['c'] = '00FF00'
//     posArray.push(posHash)
//   }
//
//   console.log(posArray)
// }

// get7(0, 0, 1, 0)
// get7(445, 0, 0, 1)

// const recs = [
//   {spx: 0, spy: 0, dx: 1, dy: 0, count: null},
//   {spx: 445, spy: 0, dx: 0, dy: 1, count: null},
//   {spx: 445, spy: 445, dx: -1, dy: 0, count: null},
//   {spx: 0, spy: 445, dx: 0, dy: -1, count: null}
// ]
// const minPerSide = Math.floor(groupCount / 4)
// recs.forEach(obj => obj.count = minPerSide)
//
// const remainingIdenticons = groupCount % minPerSide
// recs.slice(0, remainingIdenticons).forEach(obj => obj.count++)
//
// recs.forEach(rec => getStartPositions(rec))
