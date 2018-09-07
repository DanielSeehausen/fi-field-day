const config = require('../../config.js')
const Canvas = require('./canvas.js')
const Group = require('./group.js')
const TimeBoard = require('./TimeBoard.js')


const BASECOLORS = [
  'C0392B','E74C3C','9B59B6','008941',
  '8E44AD','2980B9','3498DB','1B4400',
  '512E5F','154360','0E6251','FEFFE6',
  'E67E22','D35400','BDC3C7','885578',
  '34495E','17202A','641E16','6F0062',
  '2ECC71','F1C40F','F39C12','5A0007',
  '145A32','7D6608','7E5109','A079BF',
  '1ABC9C','16A085','27AE60','A1C299',
  '1CE6FF','FF34FF','FF4A46','008941'
]

class Game {
  constructor() {
    this.timeBoard = new TimeBoard()
    this.canvas = new Canvas(config.ROWS, config.COLUMNS, this.timeBoard)
    this.wss = require('./wss.js')
    this.createGroups()
    this.setIdenticons()
  }

  setTile(tile, groupID) {
    // {x, y, hexStr} sans '#' on hexStr
    this.canvas.setTile(tile)
    if (groupID != config.ADMIN_SECRET) {
      Group.addWrite(groupID)
    }
    this.wss.emit({ action: 'writeTile', payload: tile })
  }

  getTile(coords) {
    return this.canvas.getTile(coords)
  }

  getBoard() {
    return this.canvas.buffer
  }

  createGroups() {
    for (let idx = 0; idx <= config.IDLIMIT.high; idx++) {
      const groupID = idx + 1
      new Group(groupID, BASECOLORS[idx])
    }
  }

  getStartIdenticonPosPerSide({ spx, spy, dx, dy, count }) {
    const fullSize = 50
    const buffer = 10
    const posArray = []

    for (let idx = 0; idx < count; idx++) {
      const posHash = {}
      posHash['x'] = fullSize * idx * dx + (spx + buffer)
      posHash['y'] = fullSize * idx * dy + (spy + buffer)
      posArray.push(posHash)
    }

    return posArray
  }

  getAllStartIdenticonPos() {
    const groupCount = Object.keys(Group.all).length
    const recs = [
      { spx: 0, spy: 0, dx: 1, dy: 0, count: null },
      { spx: config.ROWS - 50, spy: 0, dx: 0, dy: 1, count: null },
      { spx: config.ROWS - 50, spy: config.COLUMNS - 50, dx: -1, dy: 0, count: null },
      { spx: 0, spy: config.COLUMNS - 50, dx: 0, dy: -1, count: null }
    ]
    const minPerSide = Math.floor(groupCount / 4)
    recs.forEach(obj => (obj.count = minPerSide))
    const remainingIdenticons = groupCount % minPerSide
    recs.slice(0, remainingIdenticons).forEach(obj => obj.count++)
    const startPositions = []
    recs.forEach(rec => {
      startPositions.push(...this.getStartIdenticonPosPerSide(rec))
    })
    return startPositions
  }

  setIdenticons() {
    const allStartPositions = this.getAllStartIdenticonPos()
    const watchedTiles = new Set()
    allStartPositions.forEach((pos, idx) => {
      for (let row = pos['x']; row < pos['x'] + 25; row++) {
        for (let col = pos['y']; col < pos['y'] + 25; col++) {
          // could use this.setTile() but not sure if we want to add a write achievement here
          const groupID = idx + 1
          const tile = { x: row, y: col, hexStr: Group.all[groupID].hexColor }
          this.canvas.setTile(tile)
          
          const key = `${row}-${col}`
          watchedTiles.add(key)
          this.timeBoard.board[key].c = Group.all[groupID].hexColor
          this.timeBoard.board[key].groupID = groupID
        }
      }
    })
    this.canvas.watchedTiles = watchedTiles
  }

  toJSON() {
    return {
      board: this.canvas.toJSON()
    }
  }
}

module.exports = Game
