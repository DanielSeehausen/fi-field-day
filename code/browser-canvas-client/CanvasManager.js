class CanvasManager{

  constructor(){
    this.zoomer = document.getElementById(`zoomer`)
    this.zoomStatus = document.getElementById(`zoomStatus`)
    this.mover = document.getElementById('mover')
    this.x = 0
    this.y = 0
    this.zoom = 1
    this.mover.style.transform = `translate(0px, 0px)`
    this.zoomer.style.transform = `scale(7, 7)`
    this.dragger = document.getElementById('dragger')
  }

  resetMove(e){
    this.x = 0
    this.y = 0
    this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
    this.dragger.style.transform = `translate(${this.x}px, ${this.y}px)`
  }

  handleMove(e){
    e.preventDefault()
    switch(e.keyCode){
      case 37:
        this.x -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 65:
        this.x -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 38:
        this.y -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 87:
        this.y -= (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 39:
        this.x += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 68:
        this.x += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 40:
        this.y += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 83:
        this.y += (20 * this.zoom)
        this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
      break;
      case 32:
        this.cycleZoom(e)
      default:
      this.mover.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
  }

  cycleZoom(e){
    console.log(this.zoomer.style.transform)
    e.preventDefault()
    switch (this.zoomer.style.transform) {
      case `scale(7, 7)`:
        this.zoomer.style.transform = `scale(14, 14)`
        this.zoom = 2
        this.zoomStatus.innerText = `Current Zoom: x2`
        break;
      case `scale(14, 14)`:
        this.zoomer.style.transform = `scale(28, 28)`
        this.zoom = 4
        this.zoomStatus.innerText = `Current Zoom: x4`
        break;
      case `scale(28, 28)`:
        this.zoomer.style.transform = `scale(7, 7)`
        this.zoom = 1
        this.zoomStatus.innerText = `Current Zoom: x1`
        break;
      default:
      this.zoomer.style.transform = `scale(7, 7)`
      this.zoom = 1
      this.zoomStatus.innerText = `Current Zoom: x1`
    }
  }


}
