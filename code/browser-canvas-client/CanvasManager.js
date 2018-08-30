class CanvasManager {

  constructor(dimension) {
    this.zoomer = document.getElementById(`zoomer`)
    this.setDefaultDimension()
    this.zoomStatus = document.getElementById(`zoomStatus`)
    this.mover = document.getElementById('mover')
    this.x = 0
    this.y = 0
    this.zoom = 1
    this.mover.style.transform = `translate(0px, 0px)`
    this.zoomer.style.transform = `scale(1.3, 1.3)`
    this.dragger = document.getElementById('dragger')
  }

  setDefaultDimension() {
    this.zoomer.height = config.DEFAULTLENGTH
    this.zoomer.width = config.DEFAULTLENGTH
  }

  resetMove(e) {
    this.x = 0
    this.y = 0
    this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
    this.dragger.style.transform = `translate(${this.x}px, ${this.y}px)`
  }

  handleMove(e) {
    e.preventDefault()
    switch(e.keyCode){
      case 37:
        this.x += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 65:
        this.x += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 38:
        this.y += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 87:
        this.y += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 39:
        this.x -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 68:
        this.x -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 40:
        this.y -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 83:
        this.y -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 32:
        this.cycleZoom(e)
      default:
      this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
  }

  cycleZoom(e) {
    e.preventDefault()
    switch (this.zoomer.style.transform) {
      case `scale(1.3, 1.3)`:
        this.zoomer.style.transform = `scale(2.6, 2.6)`
        this.zoom = 2
        this.zoomStatus.innerText = `Current Zoom: x2`
        break;
      case `scale(2.6, 2.6)`:
        this.zoomer.style.transform = `scale(5.2, 5.2)`
        this.zoom = 4
        this.zoomStatus.innerText = `Current Zoom: x4`
        break;
      case `scale(5.2, 5.2)`:
        this.zoomer.style.transform = `scale(1.3, 1.3)`
        this.zoom = 1
        this.zoomStatus.innerText = `Current Zoom: x1`
        break;
      default:
      this.zoomer.style.transform = `scale(1.3, 1.3)`
      this.zoom = 1
      this.zoomStatus.innerText = `Current Zoom: x1`
    }
  }


}
