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

  stats() {
    return ({ id, writes, errors, achievements } = this)
  }
  
  toJSON() {
    return this.stats()
  }
  
}

Group.all = {}

module.exports = Group
