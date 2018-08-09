class Canvas {
  constructor(dimension, pixelArray) {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dimension = this.setDimension(dimension)
    this.pixelArray = this.setImageFromArray(pixelArray)
  }

  setDimension(value) {
    this.canvas.height = value
    this.canvas.width = value
    return value
  }

  setImageFromArray(pixelArray = config.DEFAULTARRAY) {
    this.setDimension(Math.sqrt(pixelArray.length / 4))
    const data = new ImageData(pixelArray, this.dimension, this.dimension)
    this.ctx.putImageData(data, 0, 0)
    return pixelArray
  }

  drawTile(x, y) {}
}
