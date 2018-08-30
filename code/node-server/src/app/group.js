const Achievements = require('./achievements.js')

class Group {

  static addWrite(groupId) {
    Group.all[groupId].addWrite()
  }

  static addError(errorType, groupId) {
    Group.all[groupId].addError(errorType)
  }

  constructor(id, hexColor) {
    this.id = id
    this.hexColor = hexColor
    this.writes = 0
    this.errors = 0
    this.errorTypes = []
    this.achievements = new Achievements(this.id)
    Group.all[this.id] = this
  }

  addWrite() {
    this.writes++
    this.achievements.addMilestone('writes', this.writes)
    // if (this.writes % 100 === 0) this.achievements.add(`Writes: ${this.writes}`)
  }

  addError(errorType) {
    this.errors++
    this.errorTypes.push(errorType)
    this.achievements.addMilestone('errors', this.errors)
    this.achievements.addErrorTypeMilestone(errorType)
    // if (this.errors % 100 === 0) this.achievements.add(`Errors: ${this.writes}`)
  }

  toJSON() {
    return {
      id: this.id,
      hexColor: this.hexColor,
      writes: this.writes,
      errors: this.errors,
      errorTypes: this.errorTypes,
      achievements: this.achievements.stringifyAchievements()
    }
  }

}

Group.all = {}


module.exports = Group
