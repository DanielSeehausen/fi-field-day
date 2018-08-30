const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT, canvas)
const canvasManager = new CanvasManager(config.dimension)
const dragger = new Dragger


/********************* Keyboard Input Handler ***************************************/
const keyCodes = [32, 37, 38, 39, 40, 65, 68, 83, 87]

document.body.onkeydown = (e) =>{
  if (keyCodes.includes(e.keyCode)) {
    canvasManager.handleMove(e)
  }
}

const reset = document.getElementById(`resetPosition`)
reset.addEventListener('click', () => {
  canvasManager.resetMove()
  dragger.resetMove()
})


/********************* Mouse Input Handler ***************************************/

const dragDiv = document.getElementById(`dragger`)
dragDiv.addEventListener('mousedown',  (e) => dragger.mouseDown(e))
document.addEventListener('mouseup',   (e) => dragger.mouseUp(e))
document.addEventListener('mousemove', (e) => dragger.mouseMove(e))


/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 100; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}

httpConn.getGroupInfo()
