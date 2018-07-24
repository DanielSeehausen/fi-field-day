const config = require('@config')

const BASECOLORS = [
  '#C0392B','#E74C3C','#9B59B6',
  '#8E44AD','#2980B9','#3498DB',
  '#1ABC9C','#16A085','#27AE60',
  '#2ECC71','#F1C40F','#F39C12',
  '#E67E22','#D35400','#BDC3C7',
  '#34495E','#17202A','#641E16',
  '#512E5F','#154360','#0E6251',
  '#145A32','#7D6608','#7E5109',
]
// '#6E2C00','#4D5656','#EAECEE' extras

// generates values from start positions and populates watchedTiles
// for O(1) lookup on the spots we want watched (alternative is to hold references to actual game matrix values, but id rather not in JS because they are strings)
const watchedTiles = config.IDENTICON.POSITIONS.reduce((acc, startPos, groupIdx) => {
  for (let rIdx = 0; rIdx < config.IDENTICON.SIZE; rIdx++) {
    for (let cIdx = 0; cIdx < config.IDENTICON.SIZE; cIdx++) {
      const tile = {
        groupId: groupIdx + 1,
        c: `${BASECOLORS[groupIdx]}`
      }
      acc[`${rIdx + startPos[0]}-${cIdx + startPos[1]}`] = tile
    }
  }
  return acc
}, {})

module.exports = watchedTiles
