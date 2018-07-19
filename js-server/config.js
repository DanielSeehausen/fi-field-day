// hard coding how identicons are done right now for a 500x500 board
module.exports = {
  ROWS: 500,
  COLUMNS: 500,
  DEFAULTCOLOR: '#EEE',
  PORT: 8080,
  IDLIMIT: {low: 0, high: 25},
  LIMITWINDOW: 1000,
  LIMITCOUNT: 5,
  IDENTICON: {
    SIZE: 50,
    POSITIONS: [
      [ 81, 9 ],
      [ 153, 9 ],
      [ 225, 9 ],
      [ 297, 9 ],
      [ 369, 9 ],
      [ 441, 9 ],
      [ 441, 81 ],
      [ 441, 153 ],
      [ 441, 225 ],
      [ 441, 297 ],
      [ 441, 369 ],
      [ 441, 441 ],
      [ 369, 441 ],
      [ 297, 441 ],
      [ 225, 441 ],
      [ 153, 441 ],
      [ 81, 441 ],
      [ 9, 441 ],
      [ 9, 369 ],
      [ 9, 297 ],
      [ 9, 225 ],
      [ 9, 153 ],
      [ 9, 81 ],
      [ 9, 9 ]
    ]
  }
}

//
// // used to get start positions for our 500x500 board w/ 24 groups
// const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
//
// const currPos = Array(2).fill(9)
//
// const startPositions = directions.reduce((acc, dir) => {
//   for (let idx = 0; idx < 6; idx++) {
//     currPos[0] += (50 + 11*2) * dir[1]
//     currPos[1] += (50 + 11*2) * dir[0]
//     acc.push(currPos.slice())
//     console.log(currPos.slice())
//   }
//   return acc
// }, [])
