class Snake {
  constructor(){
    this.snakeLength = 20
    this.snakeColor = "8CE533"
    this.eraserColor = "222222"
    this.appleColor = "FF0000"
    this.coordToRemove = [0,0]
    this.yWidth = 5
    this.lastX = 0
    this.appleX = 270
    this.yRow = 100
    this.drawApple(this.appleX, this.yRow)
    this.drawSnakeHorizontal()
  }

  setNewPath() {
    this.coordToRemove = [this.lastX, this.yRow]
    this.lastX = this.lastX + 1
    this.lastX <= (this.appleX - this.snakeLength) ? this.drawAppleAndSnake() : this.eatApple()

  }

  eatApple() {
    this.drawApple(this.appleX, this.yRow, this.eraserColor)
    this.snakeLength = this.snakeLength * 2
    this.drawSnakeHorizontal()

  }

  drawAppleAndSnake() {
    this.drawApple(this.appleX, this.yRow)
    this.drawSnakeHorizontal()
  }

  drawApple(appleX, yRow, color=this.appleColor) {
    for (let x = appleX; x < (appleX + this.yWidth); x++){
      for (let y = yRow; y < (yRow + 5); y++){
        httpConn.setTile(x,y,color)
      }
    }
  }

  drawSnakeHorizontal() {
    for (let y = 0; y < this.yWidth; y++){
      httpConn.setTile(this.coordToRemove[0], (this.coordToRemove[1] + y), this.eraserColor)
    }

    for (let x = this.lastX; x < (this.lastX + this.snakeLength); x++){
      for (let y = 0; y < this.yWidth; y++){
          httpConn.setTile(x, (this.yRow + y), this.snakeColor)
      }
    }
    setTimeout(() => this.setNewPath(), 500)
  }
}
// new Snake
