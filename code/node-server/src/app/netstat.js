const Group = require('./group.js')

class Netstat {

  static showTotalWrites() {
    return Group.totalWrites()
  }
}

module.exports = Netstat
