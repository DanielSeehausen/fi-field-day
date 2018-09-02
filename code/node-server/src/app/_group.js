// TODO dynamically load into the class not hard copy
const WRITE_MILESTONES = new Set([100, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000])
const BAD_REQUEST_MILESTONES = new Set([100, 500, 1000, 5000, 10000])

class Group {
  // stored as g-<id> as redis key

  constructor(id, redisConn) {
    this.ips = new Set()
    this.redisConn = redisConn
    this.id = id
    this.writes = 0
    this.errors = 0
    this.time = 0
    this.achievements = {
      '100 Written': false,
      '500 Written': false,
      '1000 Written': false,
      '5000 Written': false,
      '10000 Written': false,
      '20000 Written': false,
      '30000 Written': false,
      '40000 Written': false,
      '50000 Written': false,
      '100 Goofs': false,
      '500 Goofs': false,
      '1000 Goofs': false,
      '5000 Goofs': false,
      '10000 Goofs': false
    }
  }

  addTime(timeElapsed) {
    this.time += timeElapsed
  }

  addWrite() {
    this.writes++
    if (WRITE_MILESTONES.has(this.writes)) {
      this.achievements[`${this.writes} Written`] = true
      this.persist()
    }
  }

  addBadRequest() {
    this.errors++
    if (WRITE_MILESTONES.has(this.writes)) {
      this.achievements[`${this.errors} Goofs`] = true
      this.persist()
    }
  }

  getScore() {
    return this.time
  }

  persist() {
    this.redisConn.setGroup(this.id, this.toJSON())
  }

  toJSON() {
    return {
      id: this.id,
      time: this.time,
      achievements: this.achievements,
      writes: this.writes,
      errors: this.errors
    }
  }

}


module.exports = Group
