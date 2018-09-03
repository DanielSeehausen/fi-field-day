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
    this.zoomer.style.transform = `scale(${window.screen.height * .00165}, ${window.screen.height * .00165})`
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

  zoomMultiplier(zoomLevel){
    return window.screen.height * .00165 * this.zoom
  }

  cycleZoom(e) {
    e.preventDefault()
    switch (this.zoom) {
      case 1:
        this.zoom = 2
        this.zoomer.style.transform = `scale(${this.zoomMultiplier(this.zoom)}, ${this.zoomMultiplier(this.zoom)})`
        this.zoomStatus.innerText = `Zoom x2`
        break;
      case 2:
        this.zoom = 4
        this.zoomer.style.transform = `scale(${this.zoomMultiplier(this.zoom)}, ${this.zoomMultiplier(this.zoom)})`
        this.zoomStatus.innerText = `Zoom x4`
        break;
      case 4:
        this.zoom = 1
        this.zoomer.style.transform = `scale(${this.zoomMultiplier(this.zoom)}, ${this.zoomMultiplier(this.zoom)})`
        this.zoomStatus.innerText = `Zoom x1`
        break;
      default:
        this.zoom = 1
        this.zoomer.style.transform = `scale(${this.zoomMultiplier(this.zoom)}, ${this.zoomMultiplier(this.zoom)})`
        this.zoomStatus.innerText = `Zoom x1`
    }
  }


}
