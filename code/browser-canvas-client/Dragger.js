class Dragger{

  constructor(){
    this.dragger = document.getElementById('dragger')
      this.startingX = 0
      this.startingY = 0
      this.lastTimeX = 0
      this.lastTimeY = 0
    this.dragEvent = false
  }

  mouseDown(e){
    this.dragEvent = true
    this.startingX = e.clientX
    this.startingY = e.clientY
  }

  mouseUp(e){
    if (this.newX && this.newY){
      this.dragEvent = false
      this.lastTimeX = this.newX
      this.lastTimeY = this.newY
    } else {
      this.dragEvent = false
    }
  }

  mouseMove(e){
    if (this.dragEvent === true){
      this.xDiff = this.startingX - e.clientX
      this.yDiff = this.startingY - e.clientY
      this.newX = this.lastTimeX - this.xDiff
      this.newY = this.lastTimeY - this.yDiff
      const newPos = `translate(${this.newX}px, ${this.newY}px)`
      this.dragger.style.transform = newPos
    }
  }

  resetMove(){
    this.lastTimeX = 0
    this.lastTimeY = 0
  }

}
