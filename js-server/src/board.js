class Board {

  constructor(rowCount, colCount, tileColor='#eee') {
    this.matrix = this.generateMatrix(rowCount, colCount, tileColor)
    this.defaultTileColor = tileColor
  }

  toJSON() {
    return this.matrix
  }

  generateMatrix(rowCount, colCount, tileColor) {
    const matrix = []
    for (let rIdx = 0; rIdx < rowCount; rIdx++) {
      const row = []
      for (let cIdx = 0; cIdx < colCount; cIdx++) {
        row.push(tileColor)
      }
      matrix.push(row)
    }
    return matrix
  }

  setTile(x, y, color) {
    this.matrix[x][y] = color
  }

  getTile(x, y) {
    return this.matrix[x][y]
  }

}

module.exports = Board
