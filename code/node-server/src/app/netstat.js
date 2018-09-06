const Group = require('./group.js')


class Netstat {

  static getNetstat(gameObj) {
    return {
      totalWrites: Group.totalWrites(),
      wsConns: gameObj.wss.clients.size,
      groupStatsByID: Group.getStatsByID()
    }
  }
}

module.exports = Netstat
