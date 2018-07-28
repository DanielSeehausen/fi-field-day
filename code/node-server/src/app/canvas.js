class Canvas {

  constructor(rowCount, colCount) {
    this.height = height
    this.width = width
    this._buffer = this._generateBuffer(height, width)
    this._colorView = new Int32Array(this._buffer) // for easy writing
    this._imgView = new Int8Array(this._buffer) // for nice unpacking to <canvas>
  }
  
  setTile(x, y, hexStr) {
    const idx = this._coordToByteIdx(x, y)
    this._colorView[idx] = hexStr + 'ff'
  }

  getTile(x, y) {
    const idx = this._coordToByteIdx(x, y)
    return this._colorView[idx]
  }
  
  _generateBuffer(height, width) {
    const bytes = height * width * 4 // argb
    return new ArrayBuffer(bytes).fill(128)
  }
  
  _coordToByteIdx(x, y) {
    return (this.width * x + y)
  }

  toJSON() {
    return this.pixels
  }

}

module.exports = Canvas
