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

  setImageFromArray(pixelArray=config.DEFAULTARRAY) {
    // TODO somewhere the draggable container needs to resize (ideally at the same time)
    this.setDimension(Math.sqrt(pixelArray.length/4))
    const data = new ImageData(pixelArray, this.dimension, this.dimension)
    this.ctx.putImageData(data, 0, 0)
    return pixelArray
  }

  drawTile(x, y, color) {
    let r = parseInt(color.slice(0,2), 16)
    let g = parseInt(color.slice(2,4), 16)
    let b = parseInt(color.slice(4), 16)
    let a = 255

    let colorData = new Uint8ClampedArray([r,g,b,a])

    const data = new ImageData(colorData, 1, 1)

    this.ctx.putImageData(data, x, y)
  }
}
