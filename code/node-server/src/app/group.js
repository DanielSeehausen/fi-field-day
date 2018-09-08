const Achievements = require('./achievements.js')

class Group {

  static addWrite(groupId) {
    Group.all[groupId].addWrite()
  }


  static totalWrites()  {
    let counter = 0
    for(const groupId in Group.all) {
      counter += Group.all[groupId].writes
    }
    return counter
  }

  static addError(errorType, groupId) {
    Group.all[groupId].addError(errorType)
  }

  static getStatsByID() {
    return Object.values(Group.all).reduce((acc, group) => {
      acc[group.id] = {
        writes: group.writes,
        errors: group.errors
      }
      return acc
    }, {})
  }

  constructor(id, hexColor) {
    this.id = id
    this.hexColor = hexColor
    this.writes = 0
    this.errors = 0
    this.errorTypes = []
    this.achievements = new Achievements(this.id)
    Group.all[this.id] = this
    this.time = 0
  }
  
  addTime(additionalTime) {
    this.time += additionalTime
  }

  addWrite() {
    this.writes++
    // this.achievements.addMilestone('writes', this.writes)
    // if (this.writes % 100 === 0) this.achievements.add(`Writes: ${this.writes}`)
  }

  addError(errorType) {
    this.errors++
    // this.achievements.addMilestone('errors', this.errors)
    // this.achievements.addErrorTypeMilestone(errorType)
    // if (this.errors % 100 === 0) this.achievements.add(`Errors: ${this.writes}`)
  }

  toJSON() {
    return {
      id: this.id,
      hexColor: this.hexColor,
      writes: this.writes,
      errors: this.errors,
      time: this.time
      // errorTypes: this.errorTypes,
      // achievements: this.achievements.stringifyAchievements()
    }
  }

}

Group.all = {}

module.exports = Group
