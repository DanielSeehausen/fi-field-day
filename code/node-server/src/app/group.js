const Achievements = require('./achievements.js')

class Group {

  static addWrite(groupId) {
    Group.all[groupId].addWrite()
  }

  static totalWrites()  {
    let counter
    for(const groupId in Group.all) {
      counter += Group.all[groupId].writes
    }
    return counter
  }

  constructor(id) {
    this.id = id
    this.writes = 0
    this.errors = 0
    this.achievements = new Achievements(this.id)
    Group.all[this.id] = this
  }

  addWrite() {
    this.writes++
    this.achievements.addMilestone(this.writes)
    // if (this.writes % 100 === 0) this.achievements.add(`Writes: ${this.writes}`)
  }

  addError() {
    this.errors++
    if (this.errors % 100 === 0) this.achievements.add(`Errors: ${this.writes}`)
  }

  toJSON() {
    return {
      id: this.id,
      writes: this.writes,
      errors: this.errors,
      achievements: this.achievements.stringifyAchievements()
    }
  }

}

Group.all = {}


module.exports = Group
