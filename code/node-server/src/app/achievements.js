class Achievements {
  constructor(groupId) {
    this.groupId = groupId
    this.mileStones = {
      'writes': {
        '1': false,
        '100': false,
        '500': false,
        '1000': false,
        '5000': false,
        '10000': false,
        '20000': false,
        '30000': false,
        '40000': false,
        '50000': false
      },

      'errors': {
        '1': false,
        '10': false,
        '50': false,
        '100': false,
        '500': false,
        '1000': false
      },

      'errorTypes': {
        'invalidTile': false,
        'invalidColor': false,
        'invalidID': false
      }
    }
  }

  addMilestone(type, num) {
    if (this.mileStones[type][num] !== undefined) this.mileStones[type][num] = true
  }

  addErrorTypeMilestone(errorType) {
    if (this.mileStones['errorTypes'][errorType] !== undefined) this.mileStones['errorTypes'][errorType] = true
  }

  stringifyAchievements() {
    const writes = Object.keys(this.mileStones['writes']).filter(k => this.mileStones['writes'][k])
    const errors = Object.keys(this.mileStones['errors']).filter(k => this.mileStones['errors'][k])
    const errorTypes = Object.keys(this.mileStones['errorTypes']).filter(k => this.mileStones['errorTypes'][k])
    const stringifiedTypes = errorTypes.map(e => e.toLowerCase().split('invalid').join('invalid ')) // e.g. changes 'invalidTile' to 'invalid tile'

    if (writes.length > 0 || errors.length > 0 || errorTypes.length > 0) {
      return `Congratulations on the following achievements: \n
      ${writes.length > 0 ? `${writes.join(', ')} write(s)` : ''} \n
      ${errors.length > 0 ? `${errors.join(', ')} error(s). \n
      Type(s) of errors achieved: ${stringifiedTypes.join(', ')}` : ''}`
    } else {
      return 'No achievements yet'
    }
  }
}

module.exports = Achievements
