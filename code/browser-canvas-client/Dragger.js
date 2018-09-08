class Dragger{

  constructor(){
    this.dragger = document.getElementById('dragger')
    this.Xtilter = document.getElementById('Xtilter')
    this.Ytilter = document.getElementById('Ytilter')
      this.startingX = 0
      this.startingY = 0
      this.lastTimeX = 0
      this.lastTimeY = 0
      this.xTilt = 0
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
    this.Xtilter.style.transform = "perspective(400px) rotateY(0deg)"
    this.Ytilter.style.transform = "perspective(400px) rotateY(0deg)"
  }

  mouseMove(e){
    if (this.dragEvent === true){
      this.xDiff = this.startingX - e.clientX
      this.yDiff = this.startingY - e.clientY
      this.newX = this.lastTimeX - this.xDiff
      this.newY = this.lastTimeY - this.yDiff
      const newPos = `translate(${this.newX}px, ${this.newY}px)`
      this.dragger.style.transform = newPos
      this.handleTilt(e)
    }
  }

  resetMove(){
    this.lastTimeX = 0
    this.lastTimeY = 0
  }

  handleTilt(e){
    if (e.movementX < -150) {
      this.Ytilter.style.transform = "perspective(800px) rotateY(-360deg)"
    }else if(e.movementX < -20){
     this.Ytilter.style.transform = "perspective(800px) rotateY(-7deg)"
    }else if (e.movementX < -5) {
      this.Ytilter.style.transform = "perspective(800px) rotateY(-3deg)"
    }else if (e.movementX > 150) {
      this.Ytilter.style.transform = "perspective(800px) rotateY(360deg)"
    }else if (e.movementX > 20) {
      this.Ytilter.style.transform = "perspective(800px) rotateY(7deg)"
    }
    else if (e.movementX > 5) {
      this.Ytilter.style.transform = "perspective(800px) rotateY(3deg)"
    } else {
      this.Ytilter.style.transform = "perspective(800px) rotateY(0deg)"
    }


    if (e.movementY < -10){
     this.Xtilter.style.transform = "perspective(800px) rotateX(2deg)"
    }
    else if (e.movementY < -5) {
      this.Xtilter.style.transform = "perspective(800px) rotateX(5deg)"
    }
    else if (e.movementY > 5) {
      this.Xtilter.style.transform = "perspective(800px) rotateX(-2deg)"
    } else if (e.movementY > 10) {
      this.Xtilter.style.transform = "perspective(800px) rotateX(-5deg)"
    }
    else {
      // console.log("sup")
      this.Xtilter.style.transform = "perspective(800px) rotateX(0deg)"

    }
  }

}
