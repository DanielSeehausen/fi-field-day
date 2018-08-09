class Group {
  constructor(id) {
    this.id = id
    this.writes = 0
    this.errors = 0
    this.time = 0
    this.achievements = {
      writes: [],
      goofs: []
    }
    this.constructor.all[this.id] = this
  }

  addWrite() {
    this.writes++
    // consider milestones to be multiples of 100
    if (this.writes % 100 === 0) this.achievements.writes.push(this.writes)
  }

  addGoof() {
    this.goofs++
    if (this.goofs % 100 === 0) this.achievements.goofs.push(this.goofs)
  }

  addTime() {}

  score() {}

  stats() {
    const { id, writes, errors, time, achievements } = this
    return { id, writes, errors, time, achievements }
  }

  stringifyAchievements() {
    /*
    might ditch this but consider taking goofs and achievements and creating student message
    `Congrats on over ${this.writes[this.writes.length-1]} writes!`
    */
  }
}

Group.all = {}

module.exports = Group
