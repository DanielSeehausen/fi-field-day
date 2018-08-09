class Group {

  static addWrite(groupId) {
    Group.all[groupId].addWrite()
  }

  constructor(id) {
    this.id = id
    this.writes = 0
    this.errors = 0
    this.achievements = new Set()
    Group.all[this.id] = this
  }

  addWrite() {
    this.writes++
    if (this.writes % 100 === 0) this.achievements.writes.push(this.writes)
  }

  addError() {
    this.errors++
    if (this.errors % 100 === 0) this.achievements.errors.push(this.goofs)
  }

  toJSON() {
    return {
      id: this.id,
      writes: this.writes,
      errors: this.errors,
      achievements: this.achievements
    }
  }

}

Group.all = {}

//create admin group for now; will do w/ student ids
new Group(0)


module.exports = Group
