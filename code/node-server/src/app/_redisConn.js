// thanks to steven b
const config = require('@config')

class RedisConn {

  constructor(client) {
    this.client = client
  }

  setRec(start, stop, color, time=Date.now()) {
    for (let x = start[0]; x < stop[0]; x++) {
      for(let y = start[1]; y < stop[1]; y++) {
        this.client.hmset(`${x}-${y}`, {c: color, id: 0, time: time})
      }
    }
  }


  clear() {
    this.setRec([0, 0], [config.ROWS, config.COLUMNS], config.DEFAULTCOLOR)
  }

  initialize(callback) {
    this.client.get("populated", (err, bool) => {
      this.client.set("populated", true)
      callback(bool)
    })
  }

  getAllTiles(callback, colorsOnly=true) {
    const board = []
    for (let y = 0; y < config.ROWS; y++) {
      board[y] = []
      for (let x = 0; x < config.COLUMNS; x++) {
        this.client.hgetall(`${y}-${x}`, (err, tile) => {
          (colorsOnly) ? (board[y].push(tile.c)) : (board[y].push(tile))
          if (board.length === config.ROWS && board[y].length === config.COLUMNS)
            callback(board)
        })
      }
    }
  }


  getGroups(ids, assignGroup) {
    ids.forEach(id => {
      this.client.hgetall(`g-${ids[id]}`, (err, groupData) => {
        if (id === 0) return
        console.log("adding group data: ", id, groupData);
        assignGroup(id, groupData)
      })
    })
  }

  setGroupTime(id, time) {
    this.client.hgetall(`g-${id}`, (err, group) => {
      this.client.hmset(`g-${id}`, {time: time})
    })
  }

  setGroup(id) {
    this.client.hmset(`g-${id}`, {time: 0})
  }

  readTile(x, y, callback) {
    this.client.hgetall(`${x}-${y}`, (err, tile) => {
      callback(tile)
    })
  }

  setTile(x, y, c, id, setTime) {
    this.client.hmset(`${x}-${y}`, {c, id, time: setTime})
  }

  setTileFromString(tileStr, c, id, setTime) {
    const [x, y] = tileStr.split("-")
    this.setTile(x, y, c, id, setTime)
  }

  setIdenticonTile(x, y, c, owningGroup, setTime) {
    this.client.hgetall(`${x}-${y}`, (err, tile) => {
      owningGroup.addTime(setTime - tile.time)
      this.setGroupTime(owningGroup.id, owningGroup.time)
      // console.log("this set time: ", setTime);
      // console.log("last set time: ", tile.time);
      // console.log(`old time for ${x}-${y}: `, tile.time,
      //           `\nnew time: `, setTime,
      //           `\naddition: ${setTime - tile.time}`,
      //           `\ngroup total time: ${owningGroup.time}`);
      this.setTile(x, y, c, owningGroup.id, setTime)
    })
  }

}



module.exports = RedisConn
