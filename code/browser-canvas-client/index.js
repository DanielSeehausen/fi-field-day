const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT)
const canvasManager = new CanvasManager
const dragger = new Dragger


/********************* Keyboard Input Handler ***************************************/

document.body.onkeydown = (e) =>{
  if (e.keyCode === 32) {
    canvasManager.cycleZoom(e)
  }
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    canvasManager.handleMove(e)
  }
}

const reset = document.getElementById(`resetPosition`)
reset.addEventListener('click', () => canvasManager.resetMove())


/********************* Mouse Input Handler ***************************************/


const dragDiv = document.getElementById(`dragger`)
dragDiv.addEventListener('mousedown', (e) =>   dragger.mouseDown(e))
document.addEventListener('mouseup', (e) =>   dragger.mouseUp(e))
document.addEventListener('mousemove', (e) =>   dragger.mouseMove(e))

/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 100; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}

httpConn.getGroupInfo()
