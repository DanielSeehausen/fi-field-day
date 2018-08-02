const hex6CharToInt32 = require('./canvasHelpers/hex6CharToInt32.js')

class Canvas {

  constructor(rowCount, colCount) {
    this.height = rowCount
    this.width = colCount
    this._buffer = this._generateBuffer(this.height, this.width)
    this.int32View = new Uint32Array(this._buffer) // for easy writing
    this.int8View = new Uint8ClampedArray(this._buffer) // (don't need this as we can send an array _buffer straight?) for nice unpacking to <canvas>
  }
  
  setTile({x, y, hexStr}) {
    const idx = this._coordToByteIdx(x, y)
    const int32 = hex6CharToInt32(hexStr)
    this.int32View[idx] = int32
  }

  getTile({x, y}) {
    const idx = this._coordToByteIdx(x, y)
    return this.int32View[idx]
  }
  
  _generateBuffer(height, width) {
    const bytes = height * width * 4 // argb
    return new ArrayBuffer(bytes)
  }

  _coordToByteIdx(x, y) {
    return (this.width * x + y)
  }

  toJSON() {
    return this.pixels
  }

}

module.exports = Canvas
