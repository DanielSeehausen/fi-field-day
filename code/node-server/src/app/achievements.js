class Achievements {
  constructor(groupId) {
    this.groupId = groupId
    this.mileStones = {
      '1': true,
      '100': false,
      '500': false,
      '1000': false,
      '5000': false,
      '10000': false,
      '20000': false,
      '30000': false,
      '40000': false,
      '50000': false
    }
  }

  addMilestone(numWrites) {
    if (this.mileStones[numWrites] !== undefined) this.mileStones[numWrites] = true
  }

  stringifyAchievements() {
    const mileStones = Object.keys(this.mileStones).filter(k => this.mileStones[k])
    return `congratulations on the following achievements: ${mileStones.join(', ')} writes!`
  }
}

module.exports = Achievements
