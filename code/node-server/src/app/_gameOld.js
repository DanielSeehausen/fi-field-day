const config = require('@config.js')
const Board = require('./board.js')
const Conn = require('./conn.js')
const Group = require('./group.js')
const WSS = require('./wss.js')
const identicons = require('./identicons.js')
const RedisConn = require('./redisConn.js')
const redis = require('redis')
const redisClient = redis.createClient()

class Game {

  constructor() {
    this.board = new Board(config.ROWS, config.COLUMNS, config.DEFAULTCOLOR)
    this.conns = new Set()
    this.wss = new WSS(this)
    this.groups = {0: new Group(0)} // admin
    this.identicons = identicons
    this.redisConn = null // assigned once connection established
    this.initRedisConn()
  }

  //*************************** INIT + REDIS CONN ******************************
  setTilesFromRedis() {
    // returns colors only by default. See optional args
    this.redisConn.getAllTiles(board => this.board.matrix = board)
  }

  updateGroupsFromRedis() {
    console.log("getting group values from redis");
    const ids = Array.from(new Array(config.IDLIMIT['high']), (x, i) => i)
    this.redisConn.getGroups(ids, (id, groupData) => {
      this.groups[id] = new Group(id, this.redisConn)
      this.groups[id].time = parseInt(groupData.time)
      this.groups[id].writes = parseInt(groupData.writes)
      this.groups[id].errors = parseInt(groupData.errors)
      this.groups[id].achievements = groupData.achievements
    })
    console.log("\t...done");
  }

  initializeGroups() {
    console.log("...setting new group values in redis...");
    const groups = {0: new Group(0)}
    for (let id = 1; id < config.IDLIMIT.high; id++) {
      this.groups[id] = new Group(id, this.redisConn, identicons[id])
      this.redisConn.setGroup(id)
    }
    console.log("\t...done");
  }

  setIdenticons() {
    console.log("Populating identicons...wait...")
    const startTime = Date.now()
    Object.keys(this.identicons).forEach((tileStr) => {
      const tile = this.identicons[tileStr]
      const [x, y] = tileStr.split('-').map(str => parseInt(str))
      this.board.setTile(x, y, tile.c)
      this.redisConn.setTileFromString(tileStr, tile.c, tile.groupId, startTime)
    })
  }

  initRedisConn() {
    redisClient.on('connect', () => {
      this.redisConn = new RedisConn(redisClient)
      console.log('\n\ninitializing redis conn...wait..');
      this.redisConn.initialize((dataExists) => {
        console.log('\t...initialized');
        if (dataExists) {
          console.log("Existing redis data found...populating from it...wait");
          this.setTilesFromRedis()
          console.log("\t...done");
          console.log("loading group data...");
          this.updateGroupsFromRedis()
          console.log("\t...done");
        } else {
          console.log("...unpopulated...setting board to ", config.DEFAULTCOLOR, "...");
          this.redisConn.clear()
          this.initializeGroups()
          console.log("\t...done");
          this.setIdenticons()
        }

        console.log("\n\n\t\t*****finished setup*****");
      })
    })
  }

  //*************************** GROUP ******************************************
  // addGroup(id, ip) {
  //   // this shouldn't be needed in the current implementation, all groups initialized
  //   this.groups[id] = new Group(id)
  //   this.redisConn.setGroup(id, this.groups[id].toJSON())
  //   return this.groups[id]
  // }

  // findGroupOrCreate(id, ip) {
  //   //   // this shouldn't be needed in the current implementation, all groups initialized
  //   if (id < 0 || id > config.IDLIMIT['high']) return false // this should already be asserted in query param checking
  //   if (!this.groups[id]) console.log('creating new group with id: ', id)
  //   const group = this.groups[id] || this.addGroup(id)
  //   group.ips.add(ip)
  //   return group
  // }

  findGroup(id, ip) {
    if (id < 0 || id > config.IDLIMIT['high']) return false // this should already be asserted in query param checking
    this.groups[id].ips.add(ip)
    return this.groups[id]
  }

  findGroupById(id) {
    return this.groups[id]
  }

  getCompressedBoard() {
    return this.board
  }

  addTime(group, newTime, lastTime) {
    group.addTime(newTime - lastTime, this.redisConn)
  }

  setTile(x, y, c, group) {
    const iTile = this.identicons[`${x}-${y}`] // identicon tile value { groupId, c }
    // if we should increment the owning groups time
    if (iTile && (this.getTile(x, y) !== iTile.c))  {
      const defendingGroup = this.groups[iTile.groupId]
      this.redisConn.setIdenticonTile(x, y, c, defendingGroup, Date.now())
    } else {
      this.redisConn.setTile(x, y, c, group.id, Date.now()) // addTime will be falsey if it doesn't need to be called
    }

    this.board.setTile(x, y, c)
    this.emit('setTile', {x: x, y: y, c: c})
  }

  getTile(x, y) {
    return this.board.getTile(x, y)
  }

  getScores() {
    // not map to avoid 0 going to undefined
    return Object.values(this.groups).reduce((acc, group) => {
      if (group.id !== 0)
        acc.push(group.getScore())
      return acc
    }, [])
  }


  //********************************** WSS *************************************
  connect(ws, ip) {
    const conn = new Conn(ws, ip)
    this.conns.add(conn)
    return conn
  }

  sendBoard(conn) {
    conn.send('setBoard', this.board)
  }

  emit(action, data) {
    this.conns.forEach(conn => { conn.send(action, data) })
  }

  removeConn(conn) {
    if (conn)
      conn.terminate()
    this.conns.delete(conn)
  }


  //********************************** MISC ************************************
  toJSON() {
    return {
      connections: this.conns.map(conn => conn),
      board: this.board
    }
  }


}

module.exports = Game
